import {
    IPortfolioProjectRepository,
    PortfolioProject,
} from "@/src/application/repositories/IPortfolioProjectRepository";
import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";

export interface SearchViewModel {
  query: string;
  products: ProductCategory[];
  projects: PortfolioProject[];
}

export class SearchPresenter {
  constructor(
    private readonly productCategoryRepo: IProductCategoryRepository,
    private readonly portfolioProjectRepo: IPortfolioProjectRepository
  ) {}

  async search(query: string): Promise<SearchViewModel> {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (!trimmedQuery) {
      return { query: trimmedQuery, products: [], projects: [] };
    }

    // Since we're using static repos (which are fast) and not writing a custom `search` method on the repo,
    // we fetch active items and filter them in the presenter for the search functionality.
    
    const allProducts = await this.productCategoryRepo.getActive();
    const allProjects = await this.portfolioProjectRepo.getAll();

    const matchedProducts = allProducts.filter((p) => 
      p.name.toLowerCase().includes(trimmedQuery) || p.description.toLowerCase().includes(trimmedQuery)
    );

    const matchedProjects = allProjects.filter((p) => 
      p.title.toLowerCase().includes(trimmedQuery) || 
      p.description.toLowerCase().includes(trimmedQuery) || 
      p.client.toLowerCase().includes(trimmedQuery) ||
      p.category.toLowerCase().includes(trimmedQuery)
    );

    return {
      query: trimmedQuery,
      products: matchedProducts,
      projects: matchedProjects,
    };
  }
}
