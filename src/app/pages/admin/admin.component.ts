import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/services/blog.service';

/** Admin page component. */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

  protected readonly blogs$: Observable<readonly Blog[]>;

  protected readonly selectedBlog$ = new BehaviorSubject<Blog | null>(null);

  public constructor(
    private readonly blogService: BlogService,
  ) {
    this.blogs$ = blogService.getBlogs();
  }
}
