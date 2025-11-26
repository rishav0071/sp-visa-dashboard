import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { pagination } from '../../../typings/app.typings';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input() pagination?: pagination;
  @Output() paginationSend: EventEmitter<pagination> = new EventEmitter();

  constructor() { }

  onClick(event: any) {
    this.paginationSend.emit(event);
  }

  resetPage() {
    this.paginator.pageIndex = 0;
  }
}
