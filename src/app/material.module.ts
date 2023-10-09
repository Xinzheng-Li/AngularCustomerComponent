import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
const MaterialComponents = [
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatSidenavModule,
  MatTreeModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatTabsModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSortModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatOptionModule,
  MatStepperModule,
  FormsModule,
  ReactiveFormsModule,
  MatChipsModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
