import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private router: Router,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {}
  isLogged = (): boolean => {
    return this.authServ.isAuth();
  }
  onLogout = (): void => {
    this.authServ.signOut();
    this.router.navigate(['/']);
  }
}
