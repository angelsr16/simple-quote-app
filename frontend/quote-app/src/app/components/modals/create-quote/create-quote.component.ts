import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-create-quote',
  imports: [DialogModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.scss',
})
export class CreateQuoteComponent implements OnInit {
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  quoteFormGroup!: FormGroup;

  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private quotesService: QuotesService
  ) {
    this.quoteFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  handleRegisterQuote() {
    const quoteData = this.quoteFormGroup.getRawValue();

    this.isLoading = true;
    this.quotesService.createQuote(quoteData).subscribe((data) => {
      this.isLoading = false;
      this.onDismiss.emit();
    });
  }
}
