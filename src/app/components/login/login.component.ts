import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  User_Login } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    if(form.invalid) return

    const data:User_Login = {
      email: form.value.email,
      password: form.value.password
    }

    this.userService.login(data)

    this.router.navigate(['/'])
    
  }


}
