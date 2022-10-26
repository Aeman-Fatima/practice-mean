import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post_Create, Post_Incomming } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  postSub = new Subscription
  posts:Post_Incomming[] = [] 

  constructor(private postService:PostService, private router: Router) { }


  ngOnInit(): void {
  }

  onPostCreate(form: NgForm){

    if(form.invalid) return

    const data:Post_Create = {
      title: form.value.title,
      content: form.value.content
    }

    this.postService.createPost(data)
    this.postSub = this.postService.getUpdatedPosts()
    .subscribe((posts:Post_Incomming[])=>{
      this.posts = posts
    })
    form.resetForm()
    this.router.navigate(['/'])
    
  }


  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }

}
