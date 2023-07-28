import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: any[] = [];
  public successMessage$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get('assets/products.json');
  }

  getProduct() {
    return this.products;
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  loadCart(): any {
    return (this.products =
      JSON.parse(localStorage.getItem('cart_items') as any) || []);
  }

  clearProducts() {
    localStorage.clear();
  }
}
