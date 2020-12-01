import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//componentes

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
