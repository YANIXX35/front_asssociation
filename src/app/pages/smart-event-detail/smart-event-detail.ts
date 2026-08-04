import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-smart-event-detail',
  imports: [DatePipe],
  templateUrl: './smart-event-detail.html',
  styleUrl: './smart-event-detail.scss',
})
export class SmartEventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  public auth = inject(AuthService);

  event: Event | null = null;
  registering = false;
  registered = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvent(id).subscribe((event) => (this.event = event));
  }

  register(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return;
    }
    if (!this.event) return;
    this.registering = true;
    this.errorMessage = '';
    this.eventService.register(this.event.id).subscribe({
      next: () => {
        this.registering = false;
        this.registered = true;
      },
      error: (err) => {
        this.registering = false;
        this.errorMessage = err?.error?.detail || 'Inscription impossible.';
      },
    });
  }
}
