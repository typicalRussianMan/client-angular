import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DateTime } from 'luxon';
import { Blog } from 'src/app/core/models/blog/blog';

const MAX_BLOG_CONTENT_WORDS = 25;

@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPreviewComponent {

  @Input()
  public blog!: Blog;

  @Output()
  public tagClick = new EventEmitter<string>();

  @Output()
  public rubricClick = new EventEmitter<string>();

  public get content(): string {
    return this.blog.content.split(' ').slice(0, MAX_BLOG_CONTENT_WORDS).join(' ') + '...';
  }

  protected createdAt(dateTime: DateTime): string {
    return dateTime.toFormat('DD \' at \' T');
  }

  protected onRubricClick(name: string): void {
    this.rubricClick.emit(name);
  }

  protected onTagClick(name: string): void {
    this.tagClick.emit(name);
  }
}
