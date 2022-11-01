import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User_Create } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm) {
    console.log(form)
    form.form.controls['email'].setErrors({ "incorrectEmail": true })
    if (form.invalid) return

    const data: User_Create = {
      name: form.value.name,
      email: form.value.email.trim(),
      password: form.value.password.trim()
    }

    this.userService.signUp(data)

    form.resetForm()
  }

}
