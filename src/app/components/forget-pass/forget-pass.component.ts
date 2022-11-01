import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {

  emailForm!: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    }
    )
  }

  onUserEdit() {

    if (this.emailForm.invalid) return

    const values = this.emailForm.value

    const data = {
      email: values.email.trim() || '',
    }
    this.userService.forgetPass(data)
      .subscribe(
        (res) => {
          this.router.navigate(['/'])
        },
        (err) => {
          if (err.error.message === "Incorrect Email")
            this.emailForm.controls['email'].setErrors({ "incorrectEmail": true })
        })
  }


}
