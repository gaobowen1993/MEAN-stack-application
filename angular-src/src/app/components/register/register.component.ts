import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateSerivce: ValidateService,
              private flashMessage: FlashMessagesService,
              private authSerivce: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Validate user required fields
    if(!this.validateSerivce.validateRegister(user)) {
      this.flashMessage.show('Please fill all the fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate email
    if(!this.validateSerivce.validateEmail(user.email)) {
      this.flashMessage.show('Please fill the validate email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authSerivce.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    }, error => {
        this.flashMessage.show(error, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);         
    });
  }
}
