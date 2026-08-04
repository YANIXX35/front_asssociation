import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuOpen = false;
  servicesOpen = false;

  constructor(
    public auth: AuthService,
    private elementRef: ElementRef,
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.servicesOpen = false;
  }

  toggleServices(): void {
    this.servicesOpen = !this.servicesOpen;
  }

  logout(): void {
    this.auth.logout();
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.servicesOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.servicesOpen = false;
    }
  }
}
