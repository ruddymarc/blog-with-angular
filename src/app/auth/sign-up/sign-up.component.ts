import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  title: string = "Créer un compte";
  registerForm?: FormGroup;
  errorMessage?: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm = (): void => {
    const regexPassword = /[0-9a-zA-Z]{6,}/;
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(regexPassword)]],
    });
  }
  onSubmit = () => {
    const email = this.registerForm?.get('identifier')?.value;
    const password = this.registerForm?.get('password')?.value;
    const firstName = this.registerForm?.get('firstName')?.value;
    const lastName = this.registerForm?.get('lastName')?.value;

    this.authServ.signUp(email, password).then(
      () => { 
        this.authServ.updateProfile(firstName, lastName).then(
          () => { 
            this.authServ.signOut(); 
            this.router.navigate(['/login']);
          },
          (error) => { this.errorMessage = error; }
        )
      },
      (error) => { this.errorMessage = error; }
    );
  }
}
