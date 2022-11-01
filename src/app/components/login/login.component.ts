import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User_Login } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error!: string

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (form.invalid) return

    const data: User_Login = {
      email: form.value.email,
      password: form.value.password
    }

    this.userService.login(data)
      .subscribe((data) => {
        const requiredData = data.response
        if (!!requiredData.token) {
          this.userService.isLoggedIn = true
          this.userService.userId = requiredData.userId
          this.userService.UserStatus.next(true)
          const expiresIn = new Date(new Date().getTime() + requiredData.expiresIn * 1000)
          this.userService.setLogoutTime(expiresIn.getTime() - new Date().getTime())
          this.userService.saveData(requiredData.userId, requiredData.token, expiresIn)
        }
        this.router.navigate(['/'])
      }, (err) => {
        if (err.error.message === "Email doesn't exist")
          this.error = "Email doesn't exist"
        else if (err.error.message === "Unauthorized")
          this.error = "Incorrect password"
      })
  }



}



