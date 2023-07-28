import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  flag: any;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    this.shoppingCartService.successMessage$.subscribe((resp) => {
      this.flag = resp;
    });
  }

  ngOnInit(): void {}

  close() {
    this.router.navigate(['/home']);
  }
}
