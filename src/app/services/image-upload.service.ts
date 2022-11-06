import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture_Upload } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  imageUpload(imageForm: FormData) {
    console.log('image uploading');
    return this.http.post<{ message: string, response: Picture_Upload }>('http://localhost:3000/user/upload',
      imageForm);
  }

  getImage() {
    return this.http.get<{ message: string, response: string }>('http://localhost:3000/user/image');
  }

  deleteImage() {
    return this.http.delete<{ message: string, response: string }>('http://localhost:3000/user/delete');
  }
}
