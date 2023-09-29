import { Injectable } from "@angular/core";
import { IMapper } from "../mapper/mapper";
import { RubricDto } from "./rubric.dto";
import { Rubric } from "./rubric";

/** Rubric mapper. */
@Injectable({ providedIn: 'root' })
export class RubricMapper implements IMapper<RubricDto, Rubric> {

  /** @inheritdoc */
  public fromDto(dto: RubricDto): Rubric {
    return new Rubric({
      name: dto.name,
    });
  }

  /** @inheritdoc */
  public toDto(model: Rubric): RubricDto {
    return {
      name: model.name,
    };
  }
}
