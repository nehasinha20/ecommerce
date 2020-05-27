import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	orders = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  	this.httpClient.get<any>('/api/orders').subscribe(data => this.orders = [...data]);
  }
  totalEarnings(orders) {
  	return orders.reduce((acc, curr) => acc + this.orderTotal(curr.items), 0);
  }
  totalItems(orders) {
  	return orders.reduce((acc, curr) => acc + curr.items.length, 0);
  }
  orderTotal(items) {
  	return items.reduce((acc, curr) => acc + curr.price, 0);
  }
}
