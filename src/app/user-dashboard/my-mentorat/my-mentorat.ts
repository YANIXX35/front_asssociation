import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../core/services/communication.service';
import { DashboardNav } from '../dashboard-nav/dashboard-nav';
import { MentorAssignment } from '../../core/models/communication.model';

@Component({
  selector: 'app-my-mentorat',
  imports: [DashboardNav],
  templateUrl: './my-mentorat.html',
  styleUrl: './my-mentorat.scss',
})
export class MyMentorat implements OnInit {
  mentor: MentorAssignment | null = null;
  loading = true;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.communicationService.getMyMentor().subscribe({
      next: (res) => {
        this.mentor = res.results[0] ?? null;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
