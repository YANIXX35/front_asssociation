import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SmartGammeService } from '../../core/services/smart-gamme.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';
import { Order } from '../../core/models/smart-gamme.model';

@Component({
  selector: 'app-my-smart-gamme',
  imports: [DatePipe, DashboardNav],
  templateUrl: './my-smart-gamme.html',
  styleUrl: './my-smart-gamme.scss',
})
export class MySmartGamme implements OnInit {
  orders: Order[] = [];

  constructor(private smartGammeService: SmartGammeService) {}

  ngOnInit(): void {
    this.smartGammeService.getMyOrders().subscribe((res) => (this.orders = res.results));
  }
}
