import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SidebarRightComponent} from "../sidebar-right/sidebar-right.component";

@Component({
  selector: 'app-base-employe',
    imports: [
        FooterComponent,
        HeaderComponent,
        RouterOutlet,
        SidebarComponent,
        SidebarRightComponent
    ],
  templateUrl: './base-employe.component.html',
  styleUrl: './base-employe.component.css'
})
export class BaseEmployeComponent {

}
