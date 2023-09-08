/** Mapper from dto to model. */
export interface IMapperFromDto<TDto, TModel> {

  /**
   * Maps dto to model.
   * @param dto DTO.
   */
  fromDto(dto: TDto): TModel;
}
