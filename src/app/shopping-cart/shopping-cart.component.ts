import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  products!: any[];
  product = [];
  totalPrice: any;
  totalItems: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
    this.shoppingCartService.clearProducts();
  }

  ngOnInit(): void {
    this.shoppingCartService.getProducts().subscribe((res: any) => {
      this.products = res;
      this.products.map((x) => {
        x.quantity;
      });
    });
  }

  add(item: any) {
    item.quantity = 1;
    this.addToCart(item);
  }

  increaseItem(item: any) {
    item.quantity = item.quantity + 1;
    this.addToCart(item);
  }

  decreaseItem(item: any) {
    if (item.quantity === 0) {
      item.quantity = item.quantity = 0;
    }
    item.quantity = item.quantity - 1;
    this.removeFromCart(item);
  }

  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: any) {
    this.shoppingCartService.removeProduct(product);
  }

  getTotal() {
    const key = 'id';
    const arrayUniqueByKey = [
      ...new Map(
        this.shoppingCartService
          .loadCart()
          .map((item: any) => [item[key], item])
      ).values(),
    ];

    this.totalPrice = arrayUniqueByKey
      .map((item: any) => {
        item.price * item.quantity;
        return item.price * item.quantity;
      })
      .reduce((acc: any, curr: any) => {
        return acc + curr;
      }, null);

    this.totalItems = arrayUniqueByKey
      .map((item: any) => {
        return item.quantity;
      })
      .reduce((acc: any, curr: any) => {
        return acc + curr;
      }, null);

    console.log(this.totalPrice);
  }

  confirmationPopup() {
    this.shoppingCartService.successMessage$.next(true);
    this.shoppingCartService.clearProducts();
    this.router.navigate(['/success']);
  }

  back(){
    this.router.navigate(['/home']);
  }
}
