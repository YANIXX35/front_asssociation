import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-events-manage',
  imports: [ReactiveFormsModule, BureauNav, DatePipe],
  templateUrl: './events-manage.html',
  styleUrl: './events-manage.scss',
})
export class EventsManage implements OnInit {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);

  events: Event[] = [];
  imageFile: File | null = null;

  form = this.fb.group({
    titre: ['', Validators.required],
    date: ['', Validators.required],
    lieu: [''],
    description: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.eventService.getEvents().subscribe((res) => (this.events = res.results));
  }

  onImageSelected(event: globalThis.Event): void {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files?.[0] ?? null;
  }

  submit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const formData = new FormData();
    Object.entries(raw).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (this.imageFile) formData.append('affiche', this.imageFile);

    this.eventService.createEventForm(formData).subscribe(() => {
      this.form.reset();
      this.imageFile = null;
      this.load();
    });
  }

  remove(event: Event): void {
    if (!confirm(`Supprimer l'événement "${event.titre}" ?`)) return;
    this.eventService.deleteEvent(event.id).subscribe(() => this.load());
  }
}
