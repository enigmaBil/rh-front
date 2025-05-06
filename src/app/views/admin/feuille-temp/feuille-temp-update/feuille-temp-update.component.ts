import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../../components/breadcrumb/breadcrumb.component";
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimeSheet } from '../../../../core/models/timesheet';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FeuilleTempsService } from '../../../../core/services/feuille-temps/feuille-temps.service';

@Component({
  selector: 'app-feuille-temp-update',
  imports: [BreadcrumbComponent, NgClass, NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: './feuille-temp-update.component.html',
  styleUrl: './feuille-temp-update.component.css'
})
export class FeuilleTempUpdateComponent {
  validationForm!: FormGroup;
  isModalVisible: boolean = false;
  errorMessage: string = '';
  timesheetId: number | null = null;
  timeSheet!: TimeSheet;
  loading$ = new BehaviorSubject<boolean>(false); 
  
  constructor(
    private readonly feuilleTempsService: FeuilleTempsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formeBuilder: FormBuilder,
  ){
    this.validationForm = this.formeBuilder.group({
      status: [null, [Validators.required]],
      comment: [null]
    }); 
  }

  ngOnInit(): void {
    
    this.timesheetId = parseInt(this.route.snapshot.params['id']);
    console.log(this.timesheetId);
    if (this.timesheetId) {
      this.loadTimeSheet(this.timesheetId);
    }
    
  }

  loadTimeSheet(id: number){
    this.feuilleTempsService.getFeuilleTempsById(id).subscribe({
      next: (data) => {
        this.timeSheet = data;
        this.validationForm.patchValue(data);
      },
      error: (error) => {
        console.error('Erreur :', error);
      }
    });
  }

  get statusCtrl(): FormControl {
    return <FormControl> this.validationForm.get('status');
  }

  get commentCtrl(): FormControl {
    return <FormControl> this.validationForm.get('comment');
  }

  handleSubmit = () => {
    const validatedTimeSheet: TimeSheet = this.validationForm.value;
    if(!validatedTimeSheet.status){
      this.errorMessage = 'Veuillez remplir le champ obligatoire.';
      return;
    }
    console.log("Donnees envoyées", validatedTimeSheet);
    this.loading$.next(true);
    this.feuilleTempsService.validateFeuilleTemps(this.timesheetId!, validatedTimeSheet.status, validatedTimeSheet.comment??'').subscribe({
      next: (data) => {
        console.log("Feuille de temps validée avec succès", data);
        this.loading$.next(false);
        this.isModalVisible = true;
      },
      error: (error) => {
        console.error('Erreur :', error);
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false); 
      }
    });
  }

  closeModal = () => {
    this.isModalVisible = false;
    this.router.navigate(['/admin/feuille-temp']);
  }
}
