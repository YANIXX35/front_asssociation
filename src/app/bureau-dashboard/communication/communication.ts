import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommunicationService } from '../../core/services/communication.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { Announcement } from '../../core/models/communication.model';
import { DIRECTION_LABELS, Direction } from '../../core/models/user.model';

@Component({
  selector: 'app-communication',
  imports: [ReactiveFormsModule, BureauNav, DatePipe],
  templateUrl: './communication.html',
  styleUrl: './communication.scss',
})
export class Communication implements OnInit {
  private fb = inject(FormBuilder);
  private communicationService = inject(CommunicationService);

  announcements: Announcement[] = [];
  directionLabels = DIRECTION_LABELS;
  directions = Object.keys(DIRECTION_LABELS) as Direction[];

  form = this.fb.group({
    titre: ['', Validators.required],
    contenu: ['', Validators.required],
    direction_cible: [null as string | null],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.communicationService.getAnnouncements().subscribe((res) => (this.announcements = res.results));
  }

  submit(): void {
    if (this.form.invalid) return;
    this.communicationService.createAnnouncement(this.form.getRawValue() as any).subscribe(() => {
      this.form.reset();
      this.load();
    });
  }

  remove(announcement: Announcement): void {
    this.communicationService.deleteAnnouncement(announcement.id).subscribe(() => this.load());
  }
}
