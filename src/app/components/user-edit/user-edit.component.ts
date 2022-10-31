import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators, ValidatorFn } from '@angular/forms';
import { User_Incomming } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { matchPass } from './match-pass.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user!: User_Incomming
  passwordForm!: FormGroup
  
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group({
      oldPass: ['', [Validators.required]],
      newPass: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    },
    {
    validator: matchPass('newPass', 'confirmPass')
    }
  )
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
