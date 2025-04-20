import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../../core/services/employé/employe.service';
import { User } from '../../../core/models/user';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-employe-update',
  imports: [BreadcrumbComponent, NgClass, NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: './employe-update.component.html',
  styleUrl: './employe-update.component.css'
})
export class EmployeUpdateComponent implements OnInit {
    updateUSerForm!: FormGroup;
    isModalVisible: boolean = false;
    errorMessage: string = '';
    userId: number | null = null;
    user!: User;
    loading$ = new BehaviorSubject<boolean>(false);

    constructor(
      private readonly employeService: EmployeService,
      private readonly router: Router,
      private readonly route: ActivatedRoute,
      private readonly formeBuilder: FormBuilder,
    ){
      this.updateUSerForm = this.formeBuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        role: [null, [Validators.required]],
      }); 
    }

    ngOnInit(): void {
      
      this.userId = parseInt(this.route.snapshot.params['id']);
      console.log(this.userId);
      if (this.userId) {
        this.loadUser(this.userId);
      }
      
    }

    loadUser(id: number){
      this.employeService.getEmployeById(id).subscribe({
        next: (data) => {
          this.user = data;
          this.updateUSerForm.patchValue(data);
        },
        error: (error) => {
          console.error('Erreur :', error);
        }
      });
    }

    get nomCtrl(): FormControl {
      return <FormControl> this.updateUSerForm.get('name');
    }

    get emailCtrl(): FormControl {
      return <FormControl> this.updateUSerForm.get('email');
    }

    get roleCtrl(): FormControl {
      return <FormControl> this.updateUSerForm.get('role');
    }

    handleSubmit = () =>{
      const updatedEmploye: User = this.updateUSerForm.value;
      // Vérification des champs requis
      if (!updatedEmploye.name || !updatedEmploye.email || !updatedEmploye.role) {
        this.errorMessage = 'Veuillez remplir tous les champs.';
        return;
      }
      console.log('Données envoyées:', updatedEmploye);
      this.loading$.next(true); 
      this.employeService.updateEmploye(this.userId!, updatedEmploye).subscribe({
        next: (data) => {
          console.log('Utilisateur mis à jour avec succès:', data);
          this.updateUSerForm.reset();
          this.isModalVisible = true;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          this.loading$.next(false); 
        },
        complete: () => {
          this.loading$.next(false); 
        }
      });

    }


    closeModal = () => {
      this.isModalVisible = false;
      this.router.navigate(['/admin/employes']);
    }

}
