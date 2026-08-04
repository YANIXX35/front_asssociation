import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-nav.html',
  styleUrl: './dashboard-nav.scss',
})
export class DashboardNav {
  constructor(public auth: AuthService) {}
}
