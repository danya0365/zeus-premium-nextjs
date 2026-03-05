export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  quantity: string;
  icon: string;
}

export interface IPortfolioProjectRepository {
  /**
   * Get all portfolio projects
   */
  getAll(): Promise<PortfolioProject[]>;

  /**
   * Get project by ID
   */
  getById(id: string): Promise<PortfolioProject | null>;

  /**
   * Get projects by category
   */
  getByCategory(category: string): Promise<PortfolioProject[]>;
}
