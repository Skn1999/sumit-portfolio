export type BotAvatarType = 'clover' | 'star' | 'ghost' | 'mech' | 'flower' | 'circle';

export const BOT_AVATAR_TYPES: BotAvatarType[] = [
  'clover',
  'star',
  'mech',
  'ghost',
  'flower',
  'circle',
];

export const BOT_AVATAR_DETAILS: Record<BotAvatarType, { name: string; role: string }> = {
  clover: { name: 'Clover', role: 'Research & Synthesis' },
  star: { name: 'Star', role: 'Strategy & Priorities' },
  mech: { name: 'Mech', role: 'Technical & Architecture' },
  ghost: { name: 'Ghost', role: 'Comms & Outreach' },
  flower: { name: 'Bloom', role: 'Design & Interaction' },
  circle: { name: 'Orb', role: 'Rapid Fact-Checking' },
};

/**
 * Deterministically assigns a distinct Bot Avatar character to each task
 * so that different concurrent tasks visually represent different agents.
 */
export function getAgentAvatarForTask(
  taskIdOrTitle: string,
  explicitAvatar?: BotAvatarType
): BotAvatarType {
  if (explicitAvatar && BOT_AVATAR_TYPES.includes(explicitAvatar)) {
    return explicitAvatar;
  }
  let hash = 0;
  for (let i = 0; i < taskIdOrTitle.length; i++) {
    hash = (hash << 5) - hash + taskIdOrTitle.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % BOT_AVATAR_TYPES.length;
  return BOT_AVATAR_TYPES[index];
}
