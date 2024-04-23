import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  menuIcon: HTMLElement | null = null;
  mobileMenu: HTMLElement | null = null;

  ngOnInit() {
    this.menuIcon = document.querySelector('.mobile-bars');
    this.mobileMenu = document.querySelector('.mobile-menu');

    if (this.menuIcon && this.mobileMenu) {
      this.menuIcon.addEventListener('click', () => {
        (this.mobileMenu as HTMLElement).classList.toggle('show-menu');
      });
    }
  }
}
