import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';

const declarations = [LoadingComponent]

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule
  ],
  exports: [...declarations],
})
export class CoreModule { }
