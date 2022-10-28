import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User_Incomming } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user!: User_Incomming
  passwordForm:any
  
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group({
      oldPass: ['', [Validators.required]],
      newPass: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    },
    {
    validator: this.matchValidator.bind(this)
  })
  }

  matchValidator(formGroup:FormGroup) {
    const password = formGroup.get('newPass')?.value;
    const confirmPassword  = formGroup.get('confirmPass')?.value;
    password == confirmPassword ?
      formGroup.controls['confirmPass'].setErrors(null) 
      :
      formGroup.controls['confirmPass'].setErrors( { passwordNotMatch: true })   
  }


  onUserEdit(){
    if(this.passwordForm.invalid) return

    const values = this.passwordForm.value

    console.log(values)
    const data = {
      newPass: values.newPass || '',
      oldPass: values.oldPass || ''
    }
    this.userService.editPass(data)
  }


}
