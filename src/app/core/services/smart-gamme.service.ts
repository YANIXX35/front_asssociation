import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order, Product } from '../models/smart-gamme.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class SmartGammeService {
  private base = `${environment.apiUrl}/smart-gamme`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Paginated<Product>> {
    return this.http.get<Paginated<Product>>(`${this.base}/`);
  }

  createProductForm(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.base}/`, formData);
  }

  updateProductForm(id: number, formData: FormData): Observable<Product> {
    return this.http.patch<Product>(`${this.base}/${id}/`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }

  order(productId: number, mode: string): Observable<Order> {
    return this.http.post<Order>(`${this.base}/${productId}/order/`, { mode });
  }

  getMyOrders(): Observable<Paginated<Order>> {
    return this.http.get<Paginated<Order>>(`${this.base}/mes-commandes/`);
  }

  getOrders(): Observable<Paginated<Order>> {
    return this.http.get<Paginated<Order>>(`${this.base}/commandes/`);
  }

  updateOrderStatus(id: number, statut: string): Observable<Order> {
    return this.http.patch<Order>(`${this.base}/commandes/${id}/`, { statut });
  }
}
