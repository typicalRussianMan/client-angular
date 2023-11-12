import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** Whether is user logged in. */
  protected readonly isLoggedIn$ = this.userService.currentUser$.pipe(
    map(user => user !== null),
  );

  public constructor(
    private readonly userService: UserService,
  ) {}

  protected logout(): void {
    this.userService.logout();
  }
}
