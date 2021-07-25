import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {
  title: string = "Publier un article";
  postForm?: FormGroup;
  fileState = {
    isUploading: false,
    uploaded: false,
    url: ''
  };
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authServ: AuthService,
    private postServ: PostService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm = (): void => {
    const urlPattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(180)]],
      summary: ['', [Validators.required, Validators.maxLength(512)]],
      content: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(100000)]]
    });
  }
  onSubmit = (): void => {
    const title = this.postForm?.get('title')?.value;
    const summary = this.postForm?.get('summary')?.value;
    const content = this.postForm?.get('content')?.value;

    const post = new Post(title, summary, content);
    post.author = this.authServ.getCurrentUser();

    if (this.fileState.uploaded) {
      post.imageUrl = this.fileState.url;
    }
    console.log(JSON.stringify(post));
    this.postServ.addPost(post);
    this.router.navigate(['/blog']);
  }
  onUploadFile = (file: File) => {
    this.fileState.isUploading = true;
    this.postServ.uploadFile(file).then(
      (url: string) => {
        this.fileState.url = url;
        this.fileState.isUploading = false;
        this.fileState.uploaded = true;
      }
    );
  }
  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.onUploadFile(fileList[0]);
    }
  }
}
