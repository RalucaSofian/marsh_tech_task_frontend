import { Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-row',
  imports: [],
  templateUrl: './detail-row.html',
  styleUrl: './detail-row.css',
})
export class DetailRow {
  detailLabel = input.required<string>();
  detailValue = input.required<string>();
}
