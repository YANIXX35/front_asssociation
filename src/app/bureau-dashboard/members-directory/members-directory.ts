import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BureauNav } from '../bureau-nav/bureau-nav';
import { AdminUserService } from '../../core/services/admin-user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-members-directory',
  imports: [BureauNav, FormsModule],
  templateUrl: './members-directory.html',
  styleUrl: './members-directory.scss',
})
export class MembersDirectory implements OnInit {
  users: User[] = [];
  loading = true;
  search = '';

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.adminUserService.list(this.search).subscribe((res) => {
      this.users = Array.isArray(res) ? res : res.results;
      this.loading = false;
    });
  }

  toggleActive(user: User): void {
    this.adminUserService.update(user.id, { is_active: !user.is_active }).subscribe(() => this.load());
  }

  toggleRole(user: User): void {
    const newRole = user.role === 'membre_bureau' ? 'etudiant_membre' : 'membre_bureau';
    if (!confirm(`Changer le rôle de ${user.email} en "${newRole}" ?`)) return;
    this.adminUserService.update(user.id, { role: newRole }).subscribe(() => this.load());
  }

  remove(user: User): void {
    if (!confirm(`Supprimer le compte de ${user.email} ?`)) return;
    this.adminUserService.delete(user.id).subscribe(() => this.load());
  }
}
