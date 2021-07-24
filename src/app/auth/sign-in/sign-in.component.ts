import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  title: string = "S'identifier";
  loginForm?: FormGroup;
  errorMessage?: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  loggedAs = (): string | undefined => {
    return this.authServ.getCurrentUser()?.toString();
  }
  initForm = (): void => {
    const regexPassword = /[0-9a-zA-Z]{6,}/;
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(regexPassword)]],
    });
  }
  onSubmit = () => {
    const email = this.loginForm?.get('identifier')?.value;
    const password = this.loginForm?.get('password')?.value;
    
    this.authServ.signIn(email, password).then(
      () => { this.router.navigate(['/']); },
      (error) => { this.errorMessage = error; }
    );
  }

}
