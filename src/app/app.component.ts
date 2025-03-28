import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { HeaderComponent } from "./layouts/header/header.component";
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { SidebarRightComponent } from "./layouts/sidebar-right/sidebar-right.component";
import {LoginComponent} from './views/auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, SidebarRightComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rh-front';
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private flowbite: FlowbiteService,
  ) {
  }

  ngOnInit(): void {
    this.flowbite.loadFlowbite(fb => {
      fb.initDropdowns()
    });

    this.switchTheme();
  }

  private switchTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themeSession = localStorage.getItem("theme");
      const domTokenList = document.documentElement.classList;
      if (themeSession) {
        domTokenList.toggle(themeSession, true);
      } else {
        domTokenList.toggle(isDarkMode ? "dark" : 'light');
      }
    }
  }
}
