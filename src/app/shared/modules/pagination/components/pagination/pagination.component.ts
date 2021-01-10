import { UtilsService } from './../../../../services/utils.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps!: number;
  @Input('limit') limitProps!: number;
  @Input('currentPage') currentPageProps!: number;
  @Input('url') urlProps!: string;

  pagesCount = 0;
  pages: number[] = [];

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utils.range(1, this.pagesCount);
  }
}
