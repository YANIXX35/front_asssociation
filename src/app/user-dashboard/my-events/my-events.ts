import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';
import { Event, EventRegistration } from '../../core/models/event.model';

@Component({
  selector: 'app-my-events',
  imports: [RouterLink, DatePipe, DashboardNav],
  templateUrl: './my-events.html',
  styleUrl: './my-events.scss',
})
export class MyEvents implements OnInit {
  events: Event[] = [];
  registrations: EventRegistration[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((res) => (this.events = res.results));
    this.eventService.getMyRegistrations().subscribe((res) => (this.registrations = res.results));
  }

  isRegistered(eventId: number): boolean {
    return this.registrations.some((r) => r.event === eventId);
  }
}
