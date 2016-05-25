/**
 * Created by waqar on 25/5/16.
 */
export class Product  {
  productId: string;
  qty: number;

  constructor(productId: string, qty: number){
    this.productId = productId;
    this.qty = qty;
  }
}
