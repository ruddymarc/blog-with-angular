import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './blog/post-list/post-list.component';
import { PostListItemComponent } from './blog/post-list-item/post-list-item.component';
import { PostViewComponent } from './blog/post-view/post-view.component';
import { PostNewComponent } from './blog/post-new/post-new.component';
import { PostService } from './services/post.service';
import { NewLineToBreakPipe } from './pipes/new-line-to-break.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    PostListComponent,
    PostListItemComponent,
    PostViewComponent,
    PostNewComponent,
    NewLineToBreakPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
