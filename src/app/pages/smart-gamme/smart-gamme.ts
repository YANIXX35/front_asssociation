import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmartGammeService } from '../../core/services/smart-gamme.service';
import { AuthService } from '../../core/services/auth.service';
import { Product } from '../../core/models/smart-gamme.model';

@Component({
  selector: 'app-smart-gamme',
  imports: [],
  templateUrl: './smart-gamme.html',
  styleUrl: './smart-gamme.scss',
})
export class SmartGamme implements OnInit {
  products: Product[] = [];
  orderingId: number | null = null;
  message = '';

  constructor(
    private smartGammeService: SmartGammeService,
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.smartGammeService.getProducts().subscribe((res) => (this.products = res.results));
  }

  demander(product: Product, mode: string): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return;
    }
    this.orderingId = product.id;
    this.smartGammeService.order(product.id, mode).subscribe({
      next: () => {
        this.orderingId = null;
        this.message = `Votre demande pour "${product.nom}" a bien été enregistrée.`;
      },
      error: () => {
        this.orderingId = null;
        this.message = "Une erreur est survenue.";
      },
    });
  }
}
