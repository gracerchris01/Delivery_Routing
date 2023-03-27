import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  // for changing the icon of hide and show password
   type : string = "password" ;
   isText : boolean = false;
   eyeIcon : string ="fa-eye-slash";
   loginForm!: FormGroup;
   constructor(private fb: FormBuilder, private auth : AuthService, private router: Router) { }
   ngOnInit(): void{
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  // for hide and show password logic
   hideShowPass(){
      this.isText=!this.isText;
      this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
      this.isText ? this.type="text" : this.type = "password";
   }

   onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //send object to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message);

        }
      })
    }else{
      //throw error
      this.validateAllFormFileds(this.loginForm);
      alert("Your form is invalid");
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
