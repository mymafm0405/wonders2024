import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class Order {
  constructor(public id: string, public customer: Customer, public items: Product[], public status: string, public total: number) {}
}
