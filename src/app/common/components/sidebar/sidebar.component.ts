import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  fixedSidebarVisible = false;

  constructor() {}

  ngOnInit(): void {}

  toggle(visible: boolean): void {
    this.fixedSidebarVisible = visible;
  }
}
