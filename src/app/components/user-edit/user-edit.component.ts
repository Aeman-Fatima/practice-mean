import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { User_Incomming } from 'src/app/models/user';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UserService } from 'src/app/services/user.service';
import { matchPass } from './match-pass.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  loading: boolean = false
  imageObj!: File | null | undefined;
  imageUrl!: string;
  enableUpload: boolean = false
  passwordForm!: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    },
      {
        validator: matchPass('newPass', 'confirmPass')
      }
    )


    this.getImage()
  }

  getImage() {
    this.loading = true
    this.imageUploadService.getImage().subscribe(data => {
      console.log(data)
      this.imageUrl = data.response
      this.loading = false
    })
  }

  onImagePicked(event: Event): void {
    const target = event?.target as HTMLInputElement
    this.imageObj = target.files?.item(0);
    this.enableUpload = true
    console.log(this.imageObj)
  }

  onImageDelete() {
    this.imageUploadService.deleteImage().subscribe(data => {
      this.loading = false
      this.imageUrl = ''
    })
  }

  onImageUpload() {
    this.loading = true
    this.imageUrl = ''
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj || '');
    this.imageUploadService.imageUpload(imageForm).subscribe((data) => {
      console.log(data)
      this.imageUrl = data.response.image;
      this.loading = false
      this.enableUpload = false
    }, err => console.log(err));
  }

  onUserEdit() {

    if (this.passwordForm.invalid) return

    const values = this.passwordForm.value

    const data = {
      newPass: values.newPass.trim() || '',
      oldPass: values.oldPass.trim() || ''
    }
    this.userService.editPass(data)
      .subscribe(
        (res) => {
          this.router.navigate(['/'])
        },
        (err) => {
          if (err.error.message === "Incorrect old password")
            this.passwordForm.controls['oldPass'].setErrors({ "incorrectOldPass": true })
        })
  }


}
