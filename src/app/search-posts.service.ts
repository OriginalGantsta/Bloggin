import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchPostsService {

blogPosts=null;

findUserPosts(user){

    var userPosts =[];
    for (var timestamp in this.blogPosts){
      for (var key in this.blogPosts.timestamp){
          if (this.blogPosts.timestamp.key.uid === user){
            userPosts.push(
              `${this.blogPosts}.${timestamp}.${key}`
            )
          }
        }
    }
  return userPosts
}

  constructor() { }
}
