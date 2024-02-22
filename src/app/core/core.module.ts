import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorComponent} from "./components/paginator/paginator.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  imports: [CommonModule,MatPaginatorModule],
  declarations: [
    PaginatorComponent,
    FocusDirective,
     ],
  providers: [
   ],
  exports: [
    PaginatorComponent,
    FocusDirective,

  ]
})
export class CoreModule {
}
