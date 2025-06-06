import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CongerService } from '../../../../core/services/conge/conger.service';
import { Conger } from '../../../../core/models/conge.model';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conge-add',
  templateUrl: './conge-add.component.html',
  styleUrls: ['./conge-add.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent]  
})
export class CongeAddComponent {
  congeForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private congerService: CongerService) {
    this.congeForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  handleSubmit() {
    if (this.congeForm.valid) {
      this.loading = true;
      const congerData: Conger = this.congeForm.value;

      this.congerService.addConger(congerData).subscribe({
        next: () => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Ajout réussi',
            text: 'Le congé a été ajouté avec succès !',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true
          });

          this.congeForm.reset();
        },
        error: (err) => {
          console.error('Erreur backend :', err);
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l\'ajout du congé.',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs';
    }
  }
}
