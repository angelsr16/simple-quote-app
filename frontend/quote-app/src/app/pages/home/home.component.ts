import { Component, HostListener } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ButtonModule } from 'primeng/button';
import { CreateQuoteComponent } from '../../components/modals/create-quote/create-quote.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Quote } from '../../models/Quote';
import { EditQuoteComponent } from '../../components/modals/edit-quote/edit-quote.component';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    QuotesComponent,
    ButtonModule,
    CreateQuoteComponent,
    AsyncPipe,
    EditQuoteComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  username$;

  activateFloatingButton: boolean = false;

  displayQuoteDialog: boolean = false;
  displayEditQuoteDialog: boolean = false;
  currentQuoteToEdit!: Quote;

  constructor(private authService: AuthService) {
    this.username$ = this.authService.username$;
  }

  handleDisplayEditQuoteDialog(quote: Quote) {
    this.displayEditQuoteDialog = true;
    this.currentQuoteToEdit = quote;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.activateFloatingButton = window.scrollY > 200;
  }
}
