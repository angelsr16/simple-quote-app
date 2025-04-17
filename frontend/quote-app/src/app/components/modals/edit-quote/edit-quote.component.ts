import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { QuotesService } from '../../../services/quotes.service';
import { Quote } from '../../../models/Quote';

@Component({
  selector: 'app-edit-quote',
  imports: [DialogModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-quote.component.html',
  styleUrl: './edit-quote.component.scss',
})
export class EditQuoteComponent {
  @Input() currentQuote!: Quote;
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  quoteFormGroup!: FormGroup;

  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    if (this.currentQuote) {
      this.quoteFormGroup = this.formBuilder.group({
        title: [this.currentQuote.title, Validators.required],
        content: [this.currentQuote.content, Validators.required],
      });
    } else {
      this.onDismiss.emit();
    }
  }

  handleEditQuote() {
    const quoteData = {
      ...this.currentQuote,
      ...this.quoteFormGroup.getRawValue(),
    };

    this.isLoading = true;
    this.quotesService.updateQuote(quoteData).subscribe((data) => {
      this.isLoading = false;
      this.onDismiss.emit();
    });
  }
}
