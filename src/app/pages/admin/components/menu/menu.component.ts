import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {

  /** Current user. */
  protected readonly user$ = this.userService.currentUser$;

  public constructor(
    private readonly userService: UserService,
  ) {}

  /** Logouts current user. */
  protected onLogoutClick(): void {
    this.userService.logout();
  }
}
