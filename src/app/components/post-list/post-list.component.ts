import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post_Incomming } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  postSub = new Subscription

  posts:Post_Incomming[] = []

  constructor(private postService: PostService, private userService: UserService) { }

  userSub = new Subscription
  isLoggedIn:boolean= false
  userId:string = ''

  ngOnInit(): void {
    this.postService.getPosts()
    this.postSub = this.postService.getUpdatedPosts().subscribe(posts=>{
      this.posts=posts
    })
    this.userId = this.userService.getUser() || ''
    this.isLoggedIn = this.userService.getIfLoggedIn()

    this.userSub = this.userService.getUserStatus().subscribe(loggedIn=>{
      this.isLoggedIn=loggedIn
      this.userId = this.userService.getUser() || ''
    })
  }

  onDeletePost(id:string){
    this.postService.deletePosts(id)
    this.postSub = this.postService.getUpdatedPosts().subscribe(posts=>{
      this.posts=posts
    })
  }

  ngOnDestroy(): void {
      this.postSub.unsubscribe()
      this.userSub.unsubscribe()
  }

}
