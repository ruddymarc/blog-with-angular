import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isObject } from 'rxjs/internal-compatibility';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post: Post = new Post('','','');
  @Input() postIndex?: number;

  constructor(
    private router: Router,
    private postServ: PostService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {}

  isAuthor = (): boolean | null => {
    return this.authServ.isCurrentUser(this.post.author);
  }
  isAppreciated = (): boolean => {
    return isObject(this.post) && this.post.loveIts > 0;
  }
  isDepreciating = (): boolean => {
    return isObject(this.post) && this.post.loveIts < 0;
  }

  onViewPost = () => {
    this.router.navigate(['/blog','post',this.postIndex]);
  }
  onDeletePost = (): void => {
    if (this.post && confirm(`Etre vous sure de vouloir suppriemr cet articel?
    
    ${this.post.title}
    
    Cette action est définitive.`)) {
      this.postServ.removePost(this.post);
    }
  }
}
