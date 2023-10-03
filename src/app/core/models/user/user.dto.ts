import { BlogDto } from '../blog/blog.dto';

/** User DTO. */
export interface UserDto {

  /** Id. */
  readonly id: string;

  /** Name. */
  readonly userName: string;

  /** Email. */
  readonly email: string;

  /** Blogs. */
  readonly blogs: readonly BlogDto[];
}
