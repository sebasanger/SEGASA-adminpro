import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrubsComponent } from './breadcrubs/breadcrubs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [BreadcrubsComponent, SidebarComponent, HeaderComponent],
  exports: [BreadcrubsComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule],
})
export class SharedModule {}
