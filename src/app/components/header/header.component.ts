import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub = new Subscription
  isLoggedIn: boolean = false

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.isLoggedIn = this.userService.getIfLoggedIn()
    this.userSub = this.userService.getUserStatus().subscribe((loggedIn)=>{
      this.isLoggedIn = loggedIn
     })
  }

  onLogout(){
    this.userService.logout()

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }


}
