import { Component, ChangeDetectionStrategy } from '@angular/core';
import { filter } from 'rxjs';
import { Blog } from 'src/app/core/models/blog/blog';
import { User } from 'src/app/core/models/user/user';
import { trackById } from 'src/app/core/utils/angular/track-by';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  protected readonly user$ = this.userService.currentUser$.pipe(
    filter((user): user is User => user !== null),
  );

  protected trackByBlog = trackById<Blog>();

  public constructor(
    private readonly userService: UserService
  ) {}
}
