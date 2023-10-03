import { HttpClient } from "@angular/common/http";
import { NEVER, Observable, catchError, throwError } from "rxjs";
import { AppConfigService } from "src/app/services/app-config.service";
import { AppErrorMapper } from "../models/app-error/app-error.mapper";
import { isAppErrorDto } from "../models/app-error/app-error.dto";

export function CrudService<
  TDtoFromHttp extends {},
  TDtoToHttp extends {},
>(route: string) {

  return class {

    private readonly routeUrl: URL;

    private readonly routeUrlWithId = (id: any) => `${this.routeUrl}/${id}`;

    public constructor(
      private readonly http: HttpClient,
      private readonly errorMapper: AppErrorMapper,
      appConfig: AppConfigService
    ) {
      this.routeUrl = new URL(route, appConfig.apiUrl);
    }

    private handleError(error: unknown): Observable<never> {
      if (isAppErrorDto(error)) {
        return throwError(this.errorMapper.fromDto(error));
      }

      return NEVER;
    }

    protected create(data: TDtoToHttp): Observable<void> {
      return this.http.post<void>(
        this.routeUrl.toString(),
        data,
      ).pipe(
        catchError(this.handleError)
      );
    }

    protected getAll(): Observable<readonly TDtoFromHttp[]> {
      return this.http.get<readonly TDtoFromHttp[]>(this.routeUrl.toString()).pipe(
        catchError(this.handleError),
      )
    }

    protected getById(id: string | number): Observable<TDtoFromHttp> {
      return this.http.get<TDtoFromHttp>(this.routeUrlWithId(id)).pipe(
        catchError(this.handleError),
      )
    }

    protected update(id: string | number, data: TDtoToHttp): Observable<void> {
      return this.http.patch<void>(
        this.routeUrlWithId(id),
        data,
      ).pipe(
        catchError(this.handleError),
      )
    }

    protected delete(id: string | number): Observable<void> {
      return this.http.delete<void>(this.routeUrlWithId(id)).pipe(
        catchError(this.handleError),
      )
    }
  }
}
