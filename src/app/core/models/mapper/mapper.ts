import { IMapperFromDto } from './mapper-from-dto';
import { IMapperToDto } from './mapper-to-dto';

export interface IMapper<TDto, TModel> extends IMapperFromDto<TDto, TModel>, IMapperToDto<TDto, TModel> {}
