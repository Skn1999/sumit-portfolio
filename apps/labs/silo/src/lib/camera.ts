/**
 * Camera transform calculation for "The Spiral" portfolio.
 * Reference: research/silo.md section 7.2
 */

export const WORLD_ASPECT_RATIO = 0.5581395;

export interface CameraState {
  cx: number;
  cy: number;
  zoom: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface WorldTransformResult {
  transform: string;
  anchorX: number;
  anchorY: number;
  translateX: number;
  translateY: number;
  scale: number;
}

/**
 * Computes world transform matching section 7.2:
 * - H0 = viewport.height, W0 = H0 * 0.5581395 (aspect ratio from manifest)
 * - anchorY = viewport.height * 0.5
 * - Desktop: anchorX = leftColWidth + (viewport.width - leftColWidth) / 2
 * - Mobile: anchorX = viewport.width / 2
 * - translateX = anchorX - camera.cx * W0 * camera.zoom
 * - translateY = anchorY - camera.cy * H0 * camera.zoom
 * - returns transform: `translate3d(${translateX}px, ${translateY}px, 0px) scale(${camera.zoom})`
 */
export function computeWorldTransform(
  camera: CameraState,
  viewport: ViewportSize,
  leftColWidth: number,
  isMobile: boolean,
  aspectRatio = WORLD_ASPECT_RATIO,
  inStage = false
): WorldTransformResult {
  const H0 = viewport.height;
  const W0 = H0 * aspectRatio;
  const anchorY = viewport.height * 0.5;
  const stageWidth = isMobile ? viewport.width : viewport.width - leftColWidth;
  const anchorX = inStage
    ? stageWidth / 2
    : (isMobile ? viewport.width / 2 : leftColWidth + stageWidth / 2);

  const translateX = anchorX - camera.cx * W0 * camera.zoom;
  const translateY = anchorY - camera.cy * H0 * camera.zoom;

  const transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${camera.zoom})`;

  return {
    transform,
    anchorX,
    anchorY,
    translateX,
    translateY,
    scale: camera.zoom,
  };
}
