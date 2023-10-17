import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent {

  protected readonly blogs$ = this.blogService.getBlogs();

  public constructor(
    private readonly blogService: BlogService,
  ) {}
}
