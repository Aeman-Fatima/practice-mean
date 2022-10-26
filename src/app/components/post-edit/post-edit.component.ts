import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post_Create, Post_Edit, Post_Incomming } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {

  // postSub = new Subscription
  post!: Post_Incomming
  postId: string
  // posts: Post_Incomming[] = []

  constructor(private postService:PostService, private route: ActivatedRoute, private router: Router) {
    this.postId = this.route.snapshot.paramMap.get('id')||'';
  }

  ngOnInit(): void {
   this.postService.getPost(this.postId).subscribe((data)=>{
    this.post = data.response
   })
  }

  onPostEdit(form: NgForm){

    if(form.invalid) return

    const data:Post_Edit = {
      _id: this.postId,
      title: form.value.title,
      content: form.value.content,
    }

    this.postService.updatePost(data)
    this.router.navigate(['/'])
    // this.postSub = this.postService.getUpdatedPosts()
    // .subscribe((posts:Post_Incomming[])=>{
    //   this.posts = posts
    // })
  }


  ngOnDestroy(): void {
    // this.postSub.unsubscribe()
  }
}
