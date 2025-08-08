import { ProductRepository } from "../../../repositories/product/product.repository";

export class ProductController {
  private constructor(readonly productRepository: ProductRepository) {}

  public static build(productRepository: ProductRepository) {
    return new ProductController(productRepository);
  }
}
