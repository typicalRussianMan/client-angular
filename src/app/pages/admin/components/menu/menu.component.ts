import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {

  public constructor(
    private readonly userService: UserService,
  ) {}

  protected onLogoutClick(): void {
    this.userService.logout();
  }
}
