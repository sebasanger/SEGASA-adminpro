import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrubsComponent } from './breadcrubs/breadcrubs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrubsComponent, SidebarComponent, HeaderComponent],
  exports: [BreadcrubsComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
