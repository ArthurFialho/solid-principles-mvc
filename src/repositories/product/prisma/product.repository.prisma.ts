import { ProductRepository } from "../product.repository";
import { Product } from "../../../entities/product";
import { PrismaClient } from "@prisma/client";

export class ProductRepositoryPrisma implements ProductRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public build(prisma: PrismaClient) {
    return new ProductRepositoryPrisma(prisma as any); // ❗️temporário, pois ProductServiceImplementation espera ProductRepository, não Prisma
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prisma.product.create({ data });
  }

  public async update(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data,
    });
  }

  public async list(): Promise<Product[]> {
    const aProducts = await this.prisma.product.findMany();

    const products: Product[] = aProducts.map((aProduct) => {
      const { id, name, price, quantity } = aProduct;
      return Product.with(id, name, price, quantity);
    });

    return products;
  }

  public async find(id: string): Promise<Product | null> {
    const aProduct = await this.prisma.product.findUnique({ where: { id } });

    if (!aProduct) {
      throw new Error("Product not found");
    }

    const { name, price, quantity } = aProduct;

    const product = Product.with(id, name, price, quantity);

    return product;
  }
}
