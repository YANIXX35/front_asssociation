import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmartGammeService } from '../../core/services/smart-gamme.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { Order, Product } from '../../core/models/smart-gamme.model';

@Component({
  selector: 'app-smart-gamme-manage',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './smart-gamme-manage.html',
  styleUrl: './smart-gamme-manage.scss',
})
export class SmartGammeManage implements OnInit {
  private fb = inject(FormBuilder);
  private smartGammeService = inject(SmartGammeService);

  products: Product[] = [];
  orders: Order[] = [];
  imageFile: File | null = null;

  form = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    type: ['produit_physique', Validators.required],
    prix: [null as number | null],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.smartGammeService.getProducts().subscribe((res) => (this.products = res.results));
    this.smartGammeService.getOrders().subscribe((res) => (this.orders = res.results));
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files?.[0] ?? null;
  }

  submit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const formData = new FormData();
    Object.entries(raw).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, String(value));
    });
    if (this.imageFile) formData.append('image', this.imageFile);

    this.smartGammeService.createProductForm(formData).subscribe(() => {
      this.form.reset({ type: 'produit_physique' });
      this.imageFile = null;
      this.load();
    });
  }

  remove(product: Product): void {
    if (!confirm(`Supprimer le produit "${product.nom}" ?`)) return;
    this.smartGammeService.deleteProduct(product.id).subscribe(() => this.load());
  }

  updateOrderStatus(order: Order, statut: string): void {
    this.smartGammeService.updateOrderStatus(order.id, statut).subscribe(() => this.load());
  }
}
