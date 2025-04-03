import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
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
