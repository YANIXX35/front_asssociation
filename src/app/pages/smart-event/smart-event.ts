import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-smart-event',
  imports: [RouterLink, DatePipe],
  templateUrl: './smart-event.html',
  styleUrl: './smart-event.scss',
})
export class SmartEvent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((res) => (this.events = res.results));
  }
}
