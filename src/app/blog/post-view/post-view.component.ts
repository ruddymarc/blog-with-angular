import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  post: Post = new Post('','','');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postServ: PostService
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];
    this.postServ.getOneById(+ id).then(
      (post: Post|undefined) => {
        this.post = post ?? this.post;
      }
    );
  }

  onLoveIts = (): void => {
    this.postServ.increaseLoveIts(this.post);
  }
  onHateIts = (): void => {
    this.postServ.decreaseLoveIts(this.post);
  }
  onBackToList = () => {
    this.router.navigate(['/blog']);
  }
}
