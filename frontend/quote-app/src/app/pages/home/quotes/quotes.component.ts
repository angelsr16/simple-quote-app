import { Component, EventEmitter, Output } from '@angular/core';
import { QuotesService } from '../../../services/quotes.service';
import { Quote } from '../../../models/Quote';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [
    ButtonModule,
    AsyncPipe,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent {
  @Output() onAddQuoteClick: EventEmitter<any> = new EventEmitter();
  @Output() onEditQuoteClick: EventEmitter<Quote> = new EventEmitter();

  search: string = '';

  quotesList: Quote[] = [];
  quotesListToShow: Quote[] = [];

  quoteIdDeleting: string = '';

  username$;

  constructor(
    private quotesService: QuotesService,
    private authService: AuthService
  ) {
    this.username$ = this.authService.username$;

    this.quotesService.quotes$.subscribe((data) => {
      this.quotesList = data as Quote[];
      this.quotesListToShow = data as Quote[];
    });
  }

  handleDeleteQuote(quote: Quote) {
    this.quoteIdDeleting = quote.id;
    this.quotesService.deleteQuote(quote).subscribe((res) => {
      this.quoteIdDeleting = '';
    });
  }

  handleSearchChange() {
    this.quotesListToShow = this.quotesList.filter((quote) => {
      return (
        quote.title.toUpperCase().includes(this.search.toUpperCase()) ||
        quote.content.toUpperCase().includes(this.search.toUpperCase())
      );
    });
  }
}
