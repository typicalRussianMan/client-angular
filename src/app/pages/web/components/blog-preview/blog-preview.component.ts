import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { Blog } from 'src/app/core/models/blog/blog';

const MAX_BLOG_CONTENT_LENGTH = 200;

@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPreviewComponent {

  @Input()
  public blog!: Blog;

  public get content(): string {
    return this.blog.content.slice(MAX_BLOG_CONTENT_LENGTH);
  }

  protected createdAt(dateTime: DateTime): string {
    return dateTime.toFormat('DD \' at \' T');
  }
}
