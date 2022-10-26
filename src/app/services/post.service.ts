import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, map, Observable, pipe, Subject } from 'rxjs';
import { Post_Create, Post_Edit, Post_Incomming } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private updatePosts = new Subject<Post_Incomming[]>()
  private posts:Post_Incomming[] = []

  constructor(private http:HttpClient) { }

  createPost(data:Post_Create){
    this.http.post<{message: string, response: Post_Incomming}>('http://localhost:3000/post', data)

    .subscribe((res)=>{
      const {title, content, _id, creater} = res.response
      this.posts.push({title, content, _id, creater})
      this.updatePosts.next([...this.posts])
    })
  }

  getPosts(){
    this.http.get<{message: string, response: Post_Incomming[]}>('http://localhost:3000/post')
    .pipe(map((data)=>{
      const posts = data.response
      return posts.map((post:Post_Incomming)=>{
        return ({
          title: post.title, 
          content: post.content,
          _id: post._id,
          creater: post.creater
          })
      })
    }
    ))
    .subscribe((posts)=>{
      this.posts=posts
      this.updatePosts.next([...this.posts])
    })
  }

  getPost(id:string):Observable<{message: string, response: Post_Incomming}>{
    return this.http
    .get<{message: string, response: Post_Incomming}>
    (`http://localhost:3000/post/${id}`)    
  }

  deletePosts(id:string){
    this.http.delete<{message: string, response: any[]}>(`http://localhost:3000/post/delete/${id}`)
    .subscribe((response)=>{
      this.posts = this.posts.filter(filteredPosts => 
          filteredPosts._id!==id
      )
      this.updatePosts.next([...this.posts])
    })
  }

  updatePost(data:Post_Edit){
    this.http.put<{message: string, response: Post_Incomming}>(`http://localhost:3000/post/${data._id}`, data)
    .subscribe((response)=>{
      this.getPosts()
    })
  }

  getUpdatedPosts(){
    return this.updatePosts.asObservable()
  }
}
