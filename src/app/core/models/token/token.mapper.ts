import { Injectable } from "@angular/core";
import { IMapperFromDto } from "../mapper/mapper-from-dto";
import { TokenDto } from "./token.dto";
import { Token } from "./token";

@Injectable({ providedIn: 'root' })
export class TokenMapper implements IMapperFromDto<TokenDto, Token> {

  /** @inheritdoc */
  public fromDto(dto: TokenDto): Token {
    return new Token({ access: dto.accessToken });
  }
}
