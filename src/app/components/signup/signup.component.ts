import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  type : string = "password" ;
  isText : boolean = false;
  signUpForm!: FormGroup;
  eyeIcon : string ="fa-eye-slash";
  constructor(private fb : FormBuilder, private auth :AuthService, private router : Router) { }
  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    })
 }

 hideShowPass(){
  this.isText=!this.isText;
  this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
  this.isText ? this.type="text" : this.type = "password";
}

  onSignup(){
    if(this.signUpForm.valid){
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.signUpForm.reset();

          //navigate to login page if sign up is success
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
      console.log(this.signUpForm.value);
    }
    else{
      //throw error
      this.validateAllFormFileds(this.signUpForm);
    }
  }
  private validateAllFormFileds(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup)
         this.validateAllFormFileds(control);
    })
   }
}
