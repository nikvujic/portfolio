export type TechCategory = 'frontend' | 'backend' | 'devops' | 'other';

export type TechItem = {
  name: string;
  category: TechCategory;
  iconId?: string;
};

export type ProjectStatus = 'in-progress' | 'planned' | 'completed';
export type ProjectType = 'production' | 'sandbox' | 'productivity';

export type Project = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  type: ProjectType;
  technologies: TechItem[];
  detailedOverview: string;
  images?: string[];
  imageFit?: 'cover' | 'contain';
  link?: string;
  defaultExpanded?: boolean;
};
