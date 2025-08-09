import { Product } from "../../entities/product";
import type { ProductRepository } from "../../repositories/product/product.repository";
import type {
  BuyOutputDto,
  ListOutputDto,
  ProductService,
  SellOutputDto,
  CreateOutputDto,
} from "../product/product.service";

export class ProductServiceImplementation implements ProductService {
  constructor(readonly repository: ProductRepository) {}

  public static build(repository: ProductRepository) {
    return new ProductServiceImplementation(repository);
  }

  public async create(name: string, price: number): Promise<CreateOutputDto> {
    const aProduct = Product.create(name, price);

    await this.repository.save(aProduct);

    const outPut: CreateOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return outPut;
  }

  public async sell(id: string, amount: number): Promise<SellOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error("O produto " + id + " não foi encontrado");
    }

    aProduct.sell(amount);

    await this.repository.update(aProduct);

    const outPut: SellOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return outPut;
  }

  public async buy(id: string, amount: number): Promise<BuyOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error("O produto " + id + " não foi encontrado");
    }

    aProduct.buy(amount);

    await this.repository.update(aProduct);

    const outPut: BuyOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return outPut;
  }

  public async list(): Promise<ListOutputDto> {
    const aProducts = await this.repository.list();

    const products = aProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        balance: product.quantity,
      };
    });

    const outPut: ListOutputDto = {
      products,
    };

    return outPut;
  }
}
