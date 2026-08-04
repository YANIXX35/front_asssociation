import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommunicationService } from '../../core/services/communication.service';
import { AdminUserService } from '../../core/services/admin-user.service';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { MentorAssignment } from '../../core/models/communication.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-mentorat-manage',
  imports: [ReactiveFormsModule, BureauNav],
  templateUrl: './mentorat-manage.html',
  styleUrl: './mentorat-manage.scss',
})
export class MentoratManage implements OnInit {
  private fb = inject(FormBuilder);
  private communicationService = inject(CommunicationService);
  private adminUserService = inject(AdminUserService);

  assignments: MentorAssignment[] = [];
  students: User[] = [];

  form = this.fb.group({
    etudiant: [null as number | null, Validators.required],
    mentor_nom: ['', Validators.required],
    mentor_contact: [''],
    notes: [''],
  });

  ngOnInit(): void {
    this.load();
    this.adminUserService.list().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.results;
      this.students = list.filter((u) => u.role === 'etudiant_membre');
    });
  }

  load(): void {
    this.communicationService.getMentorAssignments().subscribe((res) => (this.assignments = res.results));
  }

  submit(): void {
    if (this.form.invalid) return;
    this.communicationService.createMentorAssignment(this.form.getRawValue() as any).subscribe(() => {
      this.form.reset();
      this.load();
    });
  }
}
