import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  constructor(private appService: AppService, private fb: FormBuilder) {
    this.initForm();
  }
  students: Student[] = [];
  studentForm: FormGroup;
  showDropDown = false;
  isLoadingResults = false;

  delete(id) {
    this.appService.deleteStudent(id).subscribe(
      (res) => {
        this.students = res.students;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  initForm(): FormGroup {
    return (this.studentForm = this.fb.group({
      search: [null],
    }));
  }
  getStudents() {
    this.isLoadingResults = true;
    this.appService.getStudents(this.studentForm.value.search).subscribe(
      (res) => {
        console.log(this.studentForm.value.search);
        this.students = res;
        console.log(res);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  ngOnInit() {
    this.getStudents();
    this.select();
  }
  select() {
    console.log('dsas', this.studentForm);
  }
  selectValue(value: Number) {
    console.log('sasas');

    console.log(value);
    this.showDropDown = false;
  }
  closeDropDown() {
    console.log('sasas');
    this.showDropDown = !this.showDropDown;
  }

  openDropDown() {
    this.showDropDown = true;
    this.getStudents();
  }

  getSearchValue() {
    return this.studentForm.value.search;
  }
}

export class Student {
  constructor(
    public id: number,
    public f_name: string,
    public l_name: string,
    public id_num: Number,
    public phone: string,
    public address: string
  ) {}
}
