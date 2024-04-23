import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,

    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: AppModule },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        },
        display: {
          dateInput: 'input',
          monthYearLabel: 'YYYY-MM-DD',
          dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
          monthYearA11yLabel: 'YYYY-MM-DD',
        },
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    } else {
      return super.format(date, displayFormat);
    }
  }
}
