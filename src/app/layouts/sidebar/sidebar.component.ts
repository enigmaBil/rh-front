import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // menuItems = routesAdmin
  currentTheme = "";
  activeItem: string | null = null;
  openSubmenus: { [key: string]: boolean } = {};

  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) {
  }

  ngOnInit(): void {
    const theme = localStorage.getItem("theme");
    if (theme && ["dark", "light"].includes(theme)) {
      this.currentTheme = theme;
      document.documentElement.firstElementChild?.classList?.toggle(theme, true);
    }

  }

  toggleTheme() {
    console.log(this.currentTheme);

    if (this.currentTheme === "dark") {
      this.doc.documentElement.classList.remove("dark");
      this.currentTheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      this.doc.documentElement.classList?.add("dark");
      this.currentTheme = "dark";
      localStorage.setItem("theme", "dark");
    }
  }

  setActiveItem(path: string) {
    this.activeItem = path;
  }

  toggleSubmenu(itemName: string) {
    this.openSubmenus[itemName] = !this.openSubmenus[itemName];
  }
}
