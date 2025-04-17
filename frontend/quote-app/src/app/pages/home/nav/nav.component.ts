import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [PopoverModule, RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  username$;

  constructor(private authService: AuthService) {
    this.username$ = this.authService.username$;
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
