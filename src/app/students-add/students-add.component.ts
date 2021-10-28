import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
})
export class StudentsAddComponent {
  studentForm: FormGroup;
  showError: boolean = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group({
      f_name: [null, Validators.required],
      l_name: [null, Validators.required],
      id_num: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(9),
        ],
      ],
      address: [null, Validators.required],
      phone: [null, Validators.required],
    });
  }
  onFormSubmit() {
    this.appService.addStudent(this.studentForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/students']);
      },
      (err) => {
        this.showError = true;
        console.log(err);
      }
    );
  }
}
