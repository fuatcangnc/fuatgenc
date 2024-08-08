export interface Project {
    id: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date | null;
    image: string | null;
  }