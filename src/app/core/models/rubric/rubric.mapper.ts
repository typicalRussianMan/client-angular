import { Injectable } from "@angular/core";
import { RubricBaseDto, RubricDto } from "./rubric.dto";
import { Rubric, RubricBase } from "./rubric";
import { IMapperFromDto } from "../mapper/mapper-from-dto";
import { IMapperToDto } from "../mapper/mapper-to-dto";

/** Rubric mapper. */
@Injectable({ providedIn: 'root' })
export class RubricMapper implements
  IMapperFromDto<RubricDto, Rubric>,
  IMapperToDto<RubricBaseDto, RubricBase> {

  /** @inheritdoc */
  public fromDto(dto: RubricDto): Rubric {
    return new Rubric({
      name: dto.name,
      id: dto.id,
    });
  }

  /** @inheritdoc */
  public toDto(model: RubricBase): RubricBaseDto {
    return {
      name: model.name,
    };
  }
}
