import { Injectable } from "@angular/core";
import { IMapper } from "../mapper/mapper";
import { RubricBaseDto, RubricDto } from "./rubric.dto";
import { Rubric } from "./rubric";

/** Rubric mapper. */
@Injectable({ providedIn: 'root' })
export class RubricMapper implements IMapper<RubricDto, Rubric> {

  /** @inheritdoc */
  public fromDto(dto: RubricDto): Rubric {
    return new Rubric({
      name: dto.name,
      id: dto.id,
    });
  }

  /** @inheritdoc */
  public toDto(model: Rubric): RubricDto {
    return {
      name: model.name,
      id: model.id,
    };
  }

  /**
   * Maps rubric to base DTO.
   * @param model Rubric.
   */
  public toBaseDto(model: Rubric): RubricBaseDto {
    return {
      name: model.name,
    };
  }
}
