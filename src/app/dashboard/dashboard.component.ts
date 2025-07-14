import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 Necessário para *ngIf funcionar

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // 👈 Adicione aqui
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    console.log('Sidebar aberta?', this.sidebarOpen); // Debug visual
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
