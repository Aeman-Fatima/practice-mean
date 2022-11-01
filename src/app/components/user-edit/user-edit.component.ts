import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { User_Incomming } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { matchPass } from './match-pass.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  passwordForm!: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

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
