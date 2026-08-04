import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';

@Component({
  selector: 'app-membership-card',
  imports: [DashboardNav],
  templateUrl: './membership-card.html',
  styleUrl: './membership-card.scss',
})
export class MembershipCard {
  constructor(public auth: AuthService) {}
}
