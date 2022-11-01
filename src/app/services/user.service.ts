import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User_Create, User_Incomming, User_Login } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false
  timer!: NodeJS.Timer
  userId!: string
  UserStatus = new Subject<boolean>()

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: User_Create) {
    this.http.post<{ message: string, response: User_Incomming }>('http://localhost:3000/user/signup', data)
      .subscribe()
  }

  login(data: User_Login) {
    return this.http.post<{ message: string, response: { token: string, userId: string, expiresIn: number } }>('http://localhost:3000/user/login', data)
  }

  logout() {
    clearTimeout(this.timer)
    this.isLoggedIn = false
    this.UserStatus.next(false)
    this.clearData()
    this.router.navigate(['/'])
  }

  editPass(data: { newPass: string, oldPass: string }) {
    return this.http.post<{ message: string, response: any }>('http://localhost:3000/user/editPass', data)
  }

  forgetPass(data: { email: string }) {
    return this.http.post<{ message: string, response: any }>('http://localhost:3000/user/forgetPass', data)
  }

  getIfLoggedIn() {
    return this.isLoggedIn
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUser() {
    return this.userId
  }

  loggedInRefresh() {
    const userAuthData = this.getData()
    if (!!userAuthData) {
      const expiresIn = userAuthData.expiresIn.getTime() - new Date().getTime()
      if (expiresIn > 0) {
        this.setLogoutTime(expiresIn)
        this.isLoggedIn = true
        this.userId = userAuthData.userId || ''
        this.UserStatus.next(true)
      }
    }
  }

  getData() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expirationDate = localStorage.getItem('expiresIn') || ''
    const expiresIn = new Date(expirationDate)
    const data = {
      token,
      userId,
      expiresIn
    }
    if (!!data.expiresIn && !!data.token && !!data.userId) return data
    return null
  }

  saveData(id: string, token: string, expiresIn: Date) {
    localStorage.setItem('userId', id)
    localStorage.setItem('token', token)
    localStorage.setItem('expiresIn', expiresIn.toISOString())
  }

  clearData() {
    localStorage.clear()
  }

  setLogoutTime(time: number) {
    this.timer = setTimeout(() => {
      this.logout()
    }, time)
  }

  getUserStatus() {
    return this.UserStatus.asObservable()
  }
}
