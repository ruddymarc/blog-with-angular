import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PostListComponent } from './blog/post-list/post-list.component';
import { PostNewComponent } from './blog/post-new/post-new.component';
import { PostViewComponent } from './blog/post-view/post-view.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'blog', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'blog/post/new', component: PostNewComponent, canActivate: [AuthGuard] },
  { path: 'blog/post/:id', component: PostViewComponent, canActivate: [AuthGuard] },
  { path: '', component: PostListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
