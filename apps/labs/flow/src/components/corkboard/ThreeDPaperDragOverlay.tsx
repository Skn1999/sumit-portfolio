import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import pushpinGold from '../../assets/pushpin_gold.png';
import pushpinSilver from '../../assets/pushpin_silver.png';
import pushpinRed from '../../assets/pushpin_red.png';

interface ThreeDPaperDragOverlayProps {
  isDragging: boolean;
  color?: string;
  initialPointer: { x: number; y: number };
  onDropOnBoard: (position: { x: number; y: number }, color: string) => void;
  onDropInBin?: () => void;
  onCancel: () => void;
  isOverBin?: boolean;
  onPointerMove?: (point: { x: number; y: number }) => void;
}

export const ThreeDPaperDragOverlay: React.FC<ThreeDPaperDragOverlayProps> = ({
  isDragging,
  color = '#fde99b',
  initialPointer,
  onDropOnBoard,
  onDropInBin,
  onCancel,
  isOverBin = false,
  onPointerMove,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerPosRef = useRef({ x: initialPointer.x, y: initialPointer.y });
  const isOverBinRef = useRef(isOverBin);
  const onPointerMoveRef = useRef(onPointerMove);

  useEffect(() => {
    isOverBinRef.current = isOverBin;
  }, [isOverBin]);

  useEffect(() => {
    onPointerMoveRef.current = onPointerMove;
  }, [onPointerMove]);

  useEffect(() => {
    if (!isDragging || !containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const fov = 45;
    // Set camera distance so 1 Three.js unit equals 1 screen pixel!
    const cameraDist = height / 2 / Math.tan(((fov / 2) * Math.PI) / 180);
    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 5000);
    camera.position.set(0, 0, cameraDist);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const domElement = renderer.domElement;
    domElement.style.position = 'absolute';
    domElement.style.top = '0';
    domElement.style.left = '0';
    domElement.style.width = '100%';
    domElement.style.height = '100%';
    domElement.style.pointerEvents = 'none';
    containerRef.current.appendChild(domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight.position.set(-180, 260, 400);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xedf4ff, 0.6);
    fillLight.position.set(220, -180, 200);
    scene.add(fillLight);

    // 3. High-Resolution Texture for 3D Post-It Face (1024x1024)
    // Matches the exact visual layout in user reference: pushpin, adhesive strip, title, subtitle, grid, box, circle
    const getTheme = (colorHex: string) => {
      const raw = colorHex.toLowerCase();
      if (raw.includes('9bd8a9') || raw.includes('mint')) {
        return {
          bodyBg: '#eef8f0',
          adhesiveBg: '#9bd8a9',
          border: '#84c794',
          pinSrc: pushpinSilver,
        };
      }
      if (raw.includes('b8caf5') || raw.includes('blue')) {
        return {
          bodyBg: '#f0f4fd',
          adhesiveBg: '#b8caf5',
          border: '#9bb4ec',
          pinSrc: pushpinSilver,
        };
      }
      if (raw.includes('ffbe98') || raw.includes('peach')) {
        return {
          bodyBg: '#fff3ec',
          adhesiveBg: '#ffbe98',
          border: '#f2a679',
          pinSrc: pushpinRed,
        };
      }
      if (raw.includes('f4c0d1') || raw.includes('rose')) {
        return {
          bodyBg: '#fdf2f5',
          adhesiveBg: '#f4c0d1',
          border: '#e8a3ba',
          pinSrc: pushpinRed,
        };
      }
      // Default Yellow
      return {
        bodyBg: '#fffbe6',
        adhesiveBg: '#fae075',
        border: '#fde99b',
        pinSrc: pushpinGold,
      };
    };

    const theme = getTheme(color);

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    const paperTexture = new THREE.CanvasTexture(canvas);
    paperTexture.colorSpace = THREE.SRGBColorSpace;

    const renderPaperFace = (pinImage?: HTMLImageElement) => {
      ctx.clearRect(0, 0, 1024, 1024);

      // 1. Base paper fill (rounded corners radius 44px)
      ctx.fillStyle = theme.bodyBg;
      ctx.beginPath();
      ctx.roundRect(0, 0, 1024, 1024, 44);
      ctx.fill();

      // Subtle outer border
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(0, 0, 1024, 1024, 44);
      ctx.stroke();

      // 2. Top adhesive strip
      ctx.fillStyle = theme.adhesiveBg;
      ctx.beginPath();
      ctx.roundRect(0, 0, 1024, 134, [44, 44, 0, 0]);
      ctx.fill();

      // Thin separation border at bottom of adhesive strip
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 134);
      ctx.lineTo(1024, 134);
      ctx.stroke();

      // 3. Grid lines matching user screenshot exactly (horizontal + vertical lines)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.038)';
      ctx.lineWidth = 2.5;

      const stepX = 142;
      const stepY = 115;

      // Vertical lines
      for (let x = 70 + stepX; x < 970; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 134);
        ctx.lineTo(x, 960);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 134 + stepY; y < 960; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(984, y);
        ctx.stroke();
      }

      // 4. Note body placeholder text (no default heading)
      ctx.fillStyle = '#8e8e8e';
      ctx.font = 'italic 58px "Caveat", "Patrick Hand", cursive, sans-serif';
      ctx.fillText('Write notes here...', 86, 260);

      // 6. Bottom Left: Box outline icon (as in screenshot)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.lineWidth = 5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeRect(96, 868, 56, 46);
      ctx.strokeRect(90, 856, 68, 14);
      ctx.beginPath();
      ctx.moveTo(114, 882);
      ctx.lineTo(134, 882);
      ctx.stroke();

      // 7. Bottom Right: Circle toggle outline
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(880, 880, 40, 0, Math.PI * 2);
      ctx.stroke();

      // 8. Dog-eared folded corner at bottom right
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.beginPath();
      ctx.moveTo(945, 1024);
      ctx.lineTo(1024, 945);
      ctx.lineTo(1024, 1024);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#f5f3e9';
      ctx.beginPath();
      ctx.moveTo(945, 1024);
      ctx.lineTo(945, 945);
      ctx.lineTo(1024, 945);
      ctx.closePath();
      ctx.fill();

      // 9. Centered Pushpin on top adhesive strip
      if (pinImage && pinImage.complete && pinImage.naturalWidth > 0) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 16;
        ctx.drawImage(pinImage, 512 - 44, 8, 88, 126);
        ctx.restore();
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.arc(512, 72, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      paperTexture.needsUpdate = true;
    };

    renderPaperFace();

    // Asynchronously load the pushpin image onto the texture
    const pinImg = new Image();
    pinImg.crossOrigin = 'anonymous';
    pinImg.onload = () => {
      renderPaperFace(pinImg);
    };
    pinImg.src = theme.pinSrc;

    // 4. Subdivided 3D Paper Geometry (32x32 vertices for smooth bending)
    const paperWidth = 240;
    const paperHeight = 240;
    const segX = 28;
    const segY = 28;
    const paperGeo = new THREE.PlaneGeometry(paperWidth, paperHeight, segX, segY);

    // Cache original vertex positions for deformation calculations
    const posAttr = paperGeo.attributes.position;
    const vertexCount = posAttr.count;
    const origPositions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount * 3; i++) {
      origPositions[i] = posAttr.array[i];
    }

    // Material with double-sided paper feel
    const paperMat = new THREE.MeshPhysicalMaterial({
      map: paperTexture,
      roughness: 0.88,
      metalness: 0.02,
      clearcoat: 0.05,
      side: THREE.DoubleSide,
    });

    const paperMesh = new THREE.Mesh(paperGeo, paperMat);
    scene.add(paperMesh);

    // 5. Dynamic Shadow Mesh (Canvas texture with soft radial gradient)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
    grad.addColorStop(0, 'rgba(40, 20, 5, 0.42)');
    grad.addColorStop(0.5, 'rgba(40, 20, 5, 0.22)');
    grad.addColorStop(0.85, 'rgba(40, 20, 5, 0.06)');
    grad.addColorStop(1, 'rgba(40, 20, 5, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(280, 280);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.z = 2; // Flat on the virtual desk surface
    scene.add(shadowMesh);

    // 6. Physics Simulation State
    let animId: number;
    let prevPointerX = initialPointer.x;
    let prevPointerY = initialPointer.y;
    let smoothVx = 0;
    let smoothVy = 0;
    let current3DX = initialPointer.x - width / 2;
    let current3DY = height / 2 - initialPointer.y;
    let currentZ = 20;

    paperMesh.position.set(current3DX, current3DY, currentZ);
    shadowMesh.position.set(current3DX, current3DY, 2);

    // Pointer move listener across window
    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
      onPointerMoveRef.current?.({ x: e.clientX, y: e.clientY });
    };

    // Pointer release listener
    const handlePointerUp = (e: PointerEvent) => {
      const finalX = e.clientX;
      const finalY = e.clientY;

      if (isOverBinRef.current && onDropInBin) {
        onDropInBin();
      } else {
        // Place note onto the corkboard at drop coordinate (cursor point)
        onDropOnBoard(
          {
            x: finalX,
            y: finalY,
          },
          color
        );
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });

    // 7. Render & Physics Loop
    let startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      const pX = pointerPosRef.current.x;
      const pY = pointerPosRef.current.y;

      // Calculate cursor velocity
      const rawVx = pX - prevPointerX;
      const rawVy = pY - prevPointerY;
      prevPointerX = pX;
      prevPointerY = pY;

      // Exponential smoothing on velocity
      smoothVx += (rawVx - smoothVx) * 0.28;
      smoothVy += (rawVy - smoothVy) * 0.28;

      // Target 3D coordinates (1:1 with screen pixels)
      const target3DX = pX - width / 2;
      const target3DY = height / 2 - pY;

      // Smooth lag tracking
      current3DX += (target3DX - current3DX) * 0.38;
      current3DY += (target3DY - current3DY) * 0.38;
      currentZ += (42 - currentZ) * 0.15; // Lifts 42px above the desk

      paperMesh.position.set(current3DX, current3DY, currentZ);

      // Aerodynamic tilt (roll & pitch proportional to velocity)
      const targetRotZ = -smoothVx * 0.009;
      const targetRotX = smoothVy * 0.009 + 0.08; // Slight forward tilt towards user
      paperMesh.rotation.z += (targetRotZ - paperMesh.rotation.z) * 0.22;
      paperMesh.rotation.x += (targetRotX - paperMesh.rotation.x) * 0.22;

      // 8. VERTEX-LEVEL 3D PAPER PHYSICS SIMULATION
      // Mimics air resistance bending, curl, and subtle flight flutter
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < vertexCount; i++) {
        const idx = i * 3;
        const origX = origPositions[idx];
        const origY = origPositions[idx + 1];

        // Normalized coordinate: -1 (left/bottom) to +1 (right/top)
        const normX = origX / (paperWidth / 2);
        const normY = origY / (paperHeight / 2);

        // Flex weight: 0 at top adhesive strip, 1 at bottom edge
        const flexWeight = Math.max(0, (0.7 - normY) / 1.7);

        // a. Aerodynamic drag flex along Z
        const zDrag = -smoothVy * 0.55 * Math.pow(flexWeight, 1.8);

        // b. Left/Right velocity roll twist
        const zTwist = -smoothVx * 0.35 * normX * flexWeight;

        // c. Natural Post-It adhesive peel curl (curve along lower half)
        const zCurl = Math.sin(flexWeight * Math.PI * 0.9) * 11.0;

        // d. Flight flutter vibration when moving quickly
        const speed = Math.hypot(smoothVx, smoothVy);
        const zFlutter = Math.sin(elapsed * 16 + normY * 5) * Math.min(20, speed) * 0.1 * flexWeight;

        posArray[idx + 2] = zDrag + zTwist + zCurl + zFlutter;
      }

      posAttr.needsUpdate = true;
      paperGeo.computeVertexNormals();

      // 9. DYNAMIC DESK SHADOW PHYSICS
      // Shadow stays on desk (z=2), expands, blurs, and lags behind motion
      const shadowLagX = current3DX - 12 + smoothVx * 0.25;
      const shadowLagY = current3DY - 24 + smoothVy * 0.25;

      shadowMesh.position.set(shadowLagX, shadowLagY, 2);

      const speedFactor = Math.min(1.4, 1 + Math.hypot(smoothVx, smoothVy) * 0.008);
      shadowMesh.scale.set(speedFactor, speedFactor, 1);
      shadowMat.opacity = Math.max(0.18, 0.42 - (currentZ / 120));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
      renderer.dispose();
      paperGeo.dispose();
      paperMat.dispose();
      paperTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
    };
  }, [isDragging, color, initialPointer, onDropOnBoard, onDropInBin]);

  if (!isDragging) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
    />
  );
};
