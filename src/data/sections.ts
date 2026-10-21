export const SECTION_IDS = ['profile', 'projects', 'technologies', 'cv'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  profile: 'Profile',
  projects: 'Projects',
  technologies: 'Technologies',
  cv: 'CV',
};
