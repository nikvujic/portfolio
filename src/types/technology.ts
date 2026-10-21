export type TechLevel = 'work' | 'projects' | 'learning';

export type TechEntry = {
  name: string;
  level: TechLevel;
  note: string;
};

export type TechGroup = {
  title: string;
  items: TechEntry[];
};
