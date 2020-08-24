import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';

@NgModule({
  imports: [NgCommonModule, BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
  exports: [
    NgCommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SidebarComponent,
    HeaderComponent,
    HamburgerComponent,
  ],
  declarations: [SidebarComponent, HeaderComponent, HamburgerComponent],
})
export class CommonModule {}
