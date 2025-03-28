import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SidebarRightComponent} from "../sidebar-right/sidebar-right.component";

@Component({
  selector: 'app-base',
    imports: [
        FooterComponent,
        HeaderComponent,
        RouterOutlet,
        SidebarComponent,
        SidebarRightComponent
    ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {

}
