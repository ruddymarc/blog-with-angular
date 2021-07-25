import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import * as firebase from "firebase";

export class PostService {
  private posts: Post[]=[];
  public subject: Subject<Post[]> = new Subject<Post[]>();

  constructor() {
    this.getPosts();
  }

  getPosts = () => {
    firebase.default.database().ref('/posts').on('value', (data: firebase.default.database.DataSnapshot) => {
      this.posts = data.val() ? data.val() : [];
    });
  }

  savePosts = () => {
    firebase.default.database().ref('/posts').set(this.posts);
  }

  emitPosts = () => {
    this.subject.next(this.posts.slice());
  }

  getOneById = (id: number) : Promise<Post | undefined> => {
    return new Promise((resolve, reject) => {
      firebase.default.database().ref('/posts/' + id).once('value').then(
        (data: firebase.default.database.DataSnapshot) => { resolve(data.val()); },
        (error) => { reject(error); }
      );
    });
  }

  uploadFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.default.storage().ref().child('images/' + almostUniqueFileName + file.name).put(file);

      upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED, 
        snapshot => {
          var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          console.log(percent + "% done");
        },
        error => {
          console.log('Erreur de chargement ! :'+ error);
          reject(error);
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        },
      );
    });
  }

  addPost = (post: Post): void => {
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
  }

  removePost = (post: Post): void => {
    const index = this.posts.findIndex(search => JSON.stringify(search) === JSON.stringify(post));

    this.posts.splice(index, 1);
    this.savePosts();
    this.emitPosts();
  }

  increaseLoveIts = (post: Post): void => {
    const index = this.posts.findIndex(search => JSON.stringify(search) === JSON.stringify(post));

    this.posts[index].loveIts++;
    this.savePosts();
    this.emitPosts();
  }
  
  decreaseLoveIts = (post: Post): void => {
    const index = this.posts.findIndex(search => JSON.stringify(search) === JSON.stringify(post));

    this.posts[index].loveIts--;
    this.savePosts();
    this.emitPosts();
  }
}
