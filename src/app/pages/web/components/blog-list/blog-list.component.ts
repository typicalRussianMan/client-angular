import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, tap, map } from 'rxjs';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { BlogService } from 'src/app/services/blog.service';
import { RubricService } from 'src/app/services/rubric.service';
import { TagService } from 'src/app/services/tag.service';

interface FormFields {
  offset: number;
  limit: number;
  rubric: string | null;
  tag: string | null;
}

@Destroyable()
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {

  protected readonly form = this.fb.group<FlatControlsOf<FormFields>>({
    limit: this.fb.control(0),
    offset: this.fb.control(0),
    rubric: this.fb.control(null),
    tag: this.fb.control(null),
  })

  protected readonly reload$ = new BehaviorSubject(void 0);

  protected readonly tags$ = this.tagService.getTags();

  protected readonly rubrics$ = this.rubricService.getRubrics();

  protected readonly length$ = this.reload$.pipe(
    switchMap(() => this.blogService.getBlogs((() => {
      let obj: Record<any, any> = {limit: 1000};
      if (this.form.getRawValue().rubric) {
        obj['rubric'] = this.form.getRawValue().rubric
      }
      if (this.form.getRawValue().tag) {
        obj['tag'] = this.form.getRawValue().tag
      }
      return obj
    })())),
    map(q => q.length),
  );

  protected readonly fromTo$ = this.length$.pipe(
    map(len => {
      let { limit, offset } = this.form.getRawValue();
      const to = Math.min(offset + limit, len);
      return `${offset} - ${to}`;
    })
  )

  protected readonly isDisabled$ = this.length$.pipe(
    map(num => {
      let { limit, offset } = this.form.getRawValue();
      return num <= limit + offset
    })
  )

  protected readonly blogs$ = this.reload$.pipe(
    switchMap(() => {
      const form = this.form.getRawValue();
      let query: Record<any, any> = {
        limit: 10,
        offset: form.offset,
      }

      if (form.rubric) {
        query['rubric'] = form.rubric;
      }

      if (form.tag) {
        query['tag'] = form.tag;
      }

      return this.blogService.getBlogs(query);
    }),
  )

  public constructor(
    private readonly blogService: BlogService,
    private readonly fb: NonNullableFormBuilder,
    private readonly tagService: TagService,
    private readonly rubricService: RubricService,
  ) {
    this.form.valueChanges.pipe(
      tap(() => this.reload$.next(void 0)),
      takeUntilDestroy(this),
    )
      .subscribe()
  }

  ngOnInit(): void {
    this.form.patchValue({ limit: 10 })
  }

  protected handlePrev(): void {
    this.form.patchValue({
      offset: this.form.getRawValue().offset - this.form.getRawValue().limit
    })
    this.reload$.next(void 0)
  }

  protected handleNext(): void {
    this.form.patchValue({
      offset: this.form.getRawValue().offset + this.form.getRawValue().limit
    })
    this.reload$.next(void 0)
  }

  protected updateTag(tag: string): void {
    this.form.patchValue({ tag, offset: 0 })
  }

  protected updateRubric(rubric: string): void {
    this.form.patchValue({ rubric, offset: 0 })
  }
}
