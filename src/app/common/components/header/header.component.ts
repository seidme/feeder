import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onHamburgerToggled = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onHamburgerToggle(open: boolean): void {
    this.onHamburgerToggled.emit(open);
  }
}
