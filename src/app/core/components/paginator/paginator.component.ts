import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
interface PageData {
  pageSize: number;
  totalRows: number | undefined;
}
@Component({
  selector: 'app-paginator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-paginator [length]="length"
                   [pageSize]="pageSize"
                   [pageSizeOptions]="pageSizeOptions"
                   (page)="onPageChange($event)"

    >
    </mat-paginator>
  `,
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent  {
  @Input() length!: number;
  @Input() pageSize: number = 2;
  @Input() pageSizeOptions: number[] = [1, 5, 10];
  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
     this.pageChange.emit(event);
  }
}
