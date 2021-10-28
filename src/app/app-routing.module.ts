import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './students/students.component';
import { StudentsAddComponent } from './students-add/students-add.component';
import { StudentsEditComponent } from './students-edit/students-edit.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    data: { title: 'List of Students' },
  },
  {
    path: 'students-add',
    component: StudentsAddComponent,
    data: { title: 'Add Student' },
  },
  {
    path: 'students-edit/:id',
    component: StudentsEditComponent,
    data: { title: 'Edit Student' },
  },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
