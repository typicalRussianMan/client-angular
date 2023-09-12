/** Mapper to dto from model. */
export interface IMapperToDto<TDto, TModel> {

  /**
   * Maps model to dto.
   * @param model Model.
   */
  toDto(model: TModel): TDto;
}
