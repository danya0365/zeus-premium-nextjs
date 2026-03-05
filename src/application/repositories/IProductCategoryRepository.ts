/**
 * IProductCategoryRepository
 * Repository interface for Product Category data access
 * Following Clean Architecture - Application layer
 */

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  minOrder: number;
  isActive: boolean;
}

export interface IProductCategoryRepository {
  /**
   * Get all product categories
   */
  getAll(): Promise<ProductCategory[]>;

  /**
   * Get active product categories only
   */
  getActive(): Promise<ProductCategory[]>;

  /**
   * Get a product category by slug
   */
  getBySlug(slug: string): Promise<ProductCategory | null>;

  /**
   * Get a product category by ID
   */
  getById(id: string): Promise<ProductCategory | null>;
}
