export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(readonly props: ProductProps) {}

  public static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
    });
  }

  public static with(
    id: string,
    name: string,
    price: number,
    quantity: number
  ) {
    return new Product({
      id,
      name,
      price,
      quantity,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.id;
  }

  public get price() {
    return this.props.id;
  }

  public get quantity() {
    return this.props.id;
  }

  public buy(amount: number) {
    this.props.quantity += amount;
  }

  public sell(amount: number) {
    if (this.props.quantity < amount) {
      throw new Error("O saldo do produto é insuficiente para a venda");
    }
    this.props.quantity -= amount;
  }
}
