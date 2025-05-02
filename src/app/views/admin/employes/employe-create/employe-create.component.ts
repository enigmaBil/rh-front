import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { EmployeService } from '../../../../core/services/employé/employe.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-employe-create',
  imports: [BreadcrumbComponent, ReactiveFormsModule, NgClass, NgIf, AsyncPipe],
  templateUrl: './employe-create.component.html',
  styleUrl: './employe-create.component.css'
})
export class EmployeCreateComponent {
    createUSerForm!: FormGroup;
    isModalVisible: boolean = false;
    errorMessage: string = '';
    loading$ = new BehaviorSubject<boolean>(false);
    
    constructor(
      private readonly employeService: EmployeService,
      private readonly router: Router,
      private readonly route: ActivatedRoute,
      private readonly formeBuilder: FormBuilder,
    ){
      this.createUSerForm = this.formeBuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        // passwordConfirmation: [null, [Validators.required, Validators.minLength(6)]],
        role: [null, [Validators.required]],
      });
    }

    get nomCtrl(): FormControl {
      return <FormControl> this.createUSerForm.get('name');
    }

    get emailCtrl(): FormControl {
      return <FormControl> this.createUSerForm.get('email');
    }

    get passwordCtrl(): FormControl {
      return <FormControl> this.createUSerForm.get('password');
    }

    // get passwordConfirmationCtrl(): FormControl {
    //   return <FormControl> this.createUSerForm.get('passwordConfirmation');
    // }

    get roleCtrl(): FormControl {
      return <FormControl> this.createUSerForm.get('role');
    }

    handleSubmit = () =>{

      const newEmploye: User = this.createUSerForm.value;
      // Vérification des champs requis
      if (!newEmploye.name || !newEmploye.email || !newEmploye.password || !newEmploye.role) {
        this.errorMessage = 'Veuillez remplir tous les champs.';
        return;
      }
      console.log('Données envoyées:', newEmploye);
      this.loading$.next(true); 
      this.employeService.createEmploye(newEmploye).subscribe({
        next: (response) => {
          console.log('Employé créé avec succès', response);
          this.createUSerForm.reset();
          this.isModalVisible = true;
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Erreur de validation. Veuillez vérifier vos données.';
          } else if (error.status === 409) {
            this.errorMessage = 'Un utilisateur avec cet email existe déjà.';
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          }
          console.error("Erreur lors de la création: ", error);
          this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false); 
      }
    });
    
    }
    closeModal() {
      this.isModalVisible = false;
      this.router.navigate(['/admin/employes']); // Redirige vers la liste des employés
    }
}
