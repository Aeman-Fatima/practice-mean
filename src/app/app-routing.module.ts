import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { ImageComponent } from './components/image/image.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: PostEditComponent, canActivate: [AuthGuard] },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-password', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgetPassComponent },
  { path: 'image-upload', component: ImageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
