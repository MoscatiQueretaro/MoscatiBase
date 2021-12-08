import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRequestOption } from '../core/request/request-util';

export class DamnerService<X> {
  protected resourceUrl = SERVER_API_URL + 'api/';

  constructor(protected http: HttpClient, protected defaultEndpoint: string) {
    this.resourceUrl += defaultEndpoint;
  }

  create(entity: X): Observable<HttpResponse<X>> {
    const copy = this.convert(entity);
    return this.http
      .post<X>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<X>) => this.convertResponse(res)));
  }

  update(entity: X): Observable<HttpResponse<X>> {
    const copy = this.convert(entity);
    return this.http.put<X>(this.resourceUrl, copy, { observe: 'response' }).pipe(map((res: HttpResponse<X>) => this.convertResponse(res)));
  }

  /* eslint-disable */
  find(id: any): Observable<HttpResponse<X>> {
    return this.http
      .get<X>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<X>) => this.convertResponse(res)));
  }

  query(req?: any): Observable<HttpResponse<X[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<X[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<X[]>) => this.convertArrayResponse(res)));
  }

  queryActives(): Observable<HttpResponse<X[]>> {
    return this.http
      .get<X[]>(this.resourceUrl + '/active', { observe: 'response' })
      .pipe(map((res: HttpResponse<X[]>) => this.convertArrayResponse(res)));
  }

  delete(id: any): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  convert(entity: X): X {
    const copy: X = Object.assign({}, entity);
    return copy;
  }

  protected convertResponse(res: HttpResponse<X>): HttpResponse<X> {
    if (res.body) {
      const body: X = this.convertItemFromServer(res.body);
      return res.clone({ body });
    } else {
      return res.clone();
    }
  }

  protected convertArrayResponse(res: HttpResponse<X[]>): HttpResponse<X[]> {
    const body: X[] = [];
    if (res.body) {
      const jsonResponse: X[] = res.body;
      for (let i = 0; i < jsonResponse.length; i++) {
        body.push(this.convertItemFromServer(jsonResponse[i]));
      }
    }
    return res.clone({ body });
  }

  protected convertItemFromServer(entity: X): X {
    const copy: X = Object.assign({}, entity);
    return copy;
  }
}
