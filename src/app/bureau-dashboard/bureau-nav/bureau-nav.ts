import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-bureau-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bureau-nav.html',
  styleUrl: './bureau-nav.scss',
})
export class BureauNav {
  constructor(public auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}
