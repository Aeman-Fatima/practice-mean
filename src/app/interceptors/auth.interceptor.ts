import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private userService: UserService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userService.getToken()

        const request = req.clone({
            headers: req.headers.set('autherization',"Bearer "+ token)
        })
        return next.handle(request)
   }
}