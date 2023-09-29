import { Injectable } from "@angular/core";
import { TokenDto } from "./token.dto";
import { Token } from "./token";
import { IMapper } from "../mapper/mapper";

@Injectable({ providedIn: 'root' })
export class TokenMapper implements IMapper<TokenDto, Token> {

  /** @inheritdoc */
  public fromDto(dto: TokenDto): Token {
    return new Token({ access: dto.accessToken });
  }

  /** @inheritdoc */
  public toDto(model: Token): TokenDto {
    return {
      accessToken: model.access,
    }
  }
}
