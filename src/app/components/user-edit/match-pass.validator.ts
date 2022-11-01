import { FormGroup } from '@angular/forms';

export const matchPass = (password: string, confirmPass: string) => {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[password]
        const confirmPassControl = formGroup.controls[confirmPass]
        passwordControl.value.trim() === confirmPassControl.value.trim() ?
            confirmPassControl.setErrors(null) : confirmPassControl.setErrors({ misMatch: "Passwords donot match" })
    }
}