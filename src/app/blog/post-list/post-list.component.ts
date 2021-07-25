import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  title: string = "Mon blog avec Angular";
  posts: Post[] = [];
  postSubscrition?: Subscription;

  constructor(
    private postServ: PostService
  ) {}

  ngOnInit(): void {
    this.postSubscrition = this.postServ.subject.subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.postServ.emitPosts();
  }

  ngOnDestroy(): void {
    this.postSubscrition? this.postSubscrition.unsubscribe() : this.postSubscrition;
  }

}
