import { Injectable } from '@angular/core';

//importamos los modulos para BD con firebase
import {AngularFirestore} from '@angular/fire/compat/firestore';

//importamos el modelo
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) { }
  //metodos para el CRUD
  getPosts(){
    return this.angularFirestore
    .collection("posts")
    .snapshotChanges()
  }
  getPostById(id)
  {
    return this.angularFirestore
    .collection("posts")
    .doc(id)
    .valueChanges()
  }
  createPost(post: Post)
  { 
    //return new Promise<any> (resolve, reject)
    return new Promise<void>((resolve, reject) => {
      this.angularFirestore
      .collection("posts")
      .add(post)
      .then((response)=>{
        console.log(response)
      },
      (error)=>{
        reject(error)
      })
    })
  }
  updatePost(post: Post, id)
  {
    return this.angularFirestore
    .collection("posts")
    .doc(id)
    .update({
      title: post.title,
      content: post.content,
      author: post.author
    });

  }
  deletePost(post: Post)
  {
    return this.angularFirestore
    .collection("posts")
    .doc(post.id)
    .delete();
  }
}
