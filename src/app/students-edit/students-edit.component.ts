import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
})
export class StudentsEditComponent implements OnInit {
  studentForm: FormGroup;
  showError: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit() {
    this.appService.getStudent(this.route.snapshot.params['id']).subscribe(
      (data) => {
        console.log(this.studentForm, data);
        this.studentForm.setValue({
          f_name: data.f_name,
          l_name: data.l_name,
          id_num: data.id_num,
          address: data.address,
          phone: data.phone,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onFormSubmit() {
    this.appService
      .saveStudent(this.route.snapshot.params['id'], this.studentForm.value)
      .subscribe(
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
