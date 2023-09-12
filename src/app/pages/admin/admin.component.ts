import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  protected user$ = this.userService.currentUser$

  public constructor(
    private readonly userService: UserService,
  ) {}
}
