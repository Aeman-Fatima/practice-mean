import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User_Create, User_Incomming, User_Login } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedIn: boolean = false
  private timer!:NodeJS.Timer
  private userId!: string
  private UserStatus = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  signUp(data:User_Create){
    this.http.post<{message: string, response: User_Incomming}>('http://localhost:3000/user/signup', data)
    .subscribe()
  }

  login(data: User_Login){
    this.http.post<{message: string, response: {token:string, userId:string, expiresIn: number}}>('http://localhost:3000/user/login', data)
    .subscribe((data)=>{
      const requiredData = data.response
      if(!!requiredData.token){
        this.isLoggedIn = true
        console.log(requiredData)
        this.userId = requiredData.userId
        this.UserStatus.next(true)
        const expiresIn = new Date(new Date().getTime() + requiredData.expiresIn*1000)
        this.setLogoutTime(expiresIn.getTime()-new Date().getTime())
        this.saveData(requiredData.userId, requiredData.token, expiresIn)
      }
    })
  }

  logout(){
    clearTimeout(this.timer)
    this.UserStatus.next(false)
    this.clearData()
  }

  getIfLoggedIn(){
    return this.isLoggedIn
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUser(){
    return this.userId
  }

  loggedInRefresh(){
    const userAuthData = this.getData()
    console.log(userAuthData)
    if(!!userAuthData){
      const expiresIn = userAuthData.expiresIn.getTime() - new Date().getTime()
      if(expiresIn>0){
        this.setLogoutTime(expiresIn)
        this.isLoggedIn = true
        this.userId = userAuthData.userId || ''
        this.UserStatus.next(true)
      }
    }
  }

  private getData(){
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expirationDate = localStorage.getItem('expiresIn') || ''
    const expiresIn = new Date(expirationDate)
    const data = {
      token,
      userId,
      expiresIn
    }
    if(!!data.expiresIn && !!data.token && !!data.userId) return data
    return null
  }

  private saveData(id: string, token: string, expiresIn: Date){
    localStorage.setItem('userId', id)
    localStorage.setItem('token', token)
    localStorage.setItem('expiresIn', expiresIn.toISOString())
  }

  private clearData(){
    localStorage.clear()
  }

  private setLogoutTime(time:number){
    this.timer = setTimeout(()=>{
      this.logout()
    }, time)
  }

  getUserStatus(){
    return this.UserStatus.asObservable()
  }
}
