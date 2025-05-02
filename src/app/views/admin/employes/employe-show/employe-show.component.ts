import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { User } from '../../../../core/models/user';
import { EmployeService } from '../../../../core/services/employé/employe.service';

@Component({
  selector: 'app-employe-show',
  imports: [BreadcrumbComponent],
  templateUrl: './employe-show.component.html',
  styleUrl: './employe-show.component.css'
})
export class EmployeShowComponent implements OnInit {
  user!:User;
  userId!: number;

  constructor(
    private readonly employeService: EmployeService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.params['id']);
      console.log(this.userId);
      if (this.userId) {
        this.loadUser(this.userId);
      }
  }

  loadUser(id: number) {
    this.employeService.getEmployeById(id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Erreur :', error);
      }
    });
  }
}
