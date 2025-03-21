import { Component } from '@angular/core';
import {FooterComponent} from "../../../layouts/footer/footer.component";
import {HeaderComponent} from "../../../layouts/header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../../layouts/sidebar/sidebar.component";
import {SidebarRightComponent} from "../../../layouts/sidebar-right/sidebar-right.component";

@Component({
  selector: 'app-admin-dashboard',
    imports: [
        FooterComponent,
        HeaderComponent,
        RouterOutlet,
        SidebarComponent,
        SidebarRightComponent
    ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
