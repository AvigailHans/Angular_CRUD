import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private titleService: Title, private server: HttpClient) {}
  //url = 'http://localhost/laravel-vue/public';
  url = 'put your server url';

  getStudents(query: String): Observable<any[]> {
    return this.server.get<any[]>(this.url + '/public/students?query=' + query);
  }
  getStudent(id: number) {
    return this.server.get<any>(this.url + '/public/students/' + id);
  }
  saveStudent(id: number, form: object) {
    console.log('sasasa', form);
    return this.server.put<any>(this.url + '/public/students/' + id, form);
  }
  deleteStudent(id: number) {
    console.log('sasasa');
    return this.server.delete<any>(this.url + '/public/students/' + id);
  }
  addStudent(form: object) {
    console.log('sasasa', form);
    return this.server.post<any>(this.url + '/public/students', form);
  }
}
