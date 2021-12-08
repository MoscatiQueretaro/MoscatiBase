import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileModel } from './file.model';
import { concat, forkJoin, Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { SERVER_API_URL } from '../../app.constants';

type EntityResponseType = HttpResponse<FileModel>;
type ArrayResponseType = HttpResponse<FileModel[]>;

@Injectable()
export class SyncFilesService {
  public resourceOpenUrl = SERVER_API_URL + 'public/';
  private resourceUrl = SERVER_API_URL + 'api/';
  private scannerUrl = 'http://localhost:45000';

  constructor(private http: HttpClient) {}

  create(url: string, file: FileModel): Observable<EntityResponseType> {
    const copy = this.convert(file);
    return this.http
      .post<FileModel>(`${this.resourceUrl}${url}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  createMultipart(url: string, file: File, nombre: string): Observable<EntityResponseType> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', nombre);
    return this.http
      .post<FileModel>(`${this.resourceUrl}${url}/multipart`, formData, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  updateName(url: string, file: FileModel): Observable<EntityResponseType> {
    const copy = this.convert(file);
    return this.http
      .put<FileModel>(this.resourceUrl + url + '-name', copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  find(url: string, id: string): Observable<EntityResponseType> {
    return this.http
      .get<FileModel>(this.resourceUrl + url + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  findFull(url: string, id: string): Observable<EntityResponseType> {
    return this.http
      .get<FileModel>(this.resourceUrl + url + '/full/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  findFullExternal(url: string, id: string): Observable<EntityResponseType> {
    return this.http
      .get<FileModel>(this.resourceOpenUrl + url + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  findAll(url: string, ids: string[]): Observable<ArrayResponseType> {
    const requests: Observable<EntityResponseType>[] = ids.map(id => this.find(url, id));
    return forkJoin(requests).pipe(map(this.convertJoinResponse.bind(this)));
  }

  delete(url: string, id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}${url}/${id}`, { observe: 'response' });
  }

  deleteAll(url: string, ids: string[]): Observable<HttpResponse<any>> {
    const requests: Observable<HttpResponse<any>>[] = ids.map(id => this.delete(url, id));
    return concat(...requests).pipe(last()); // solo emite el termino del proceso
  }

  openScanner(): Observable<HttpResponse<FileModel[]>> {
    return this.http.get<FileModel[]>(this.scannerUrl + '/escaner', { observe: 'response' });
  }

  connect(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.scannerUrl + '/connect', { observe: 'response' });
  }

  private convert(file: FileModel): FileModel {
    const copy: FileModel = Object.assign({}, file);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: FileModel = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }
  /* eslint-disable */
  private convertJoinResponse(res: EntityResponseType[]): ArrayResponseType {
    const body: ArrayResponseType = res.reduce((acum, curr) => {
      const a = acum.body || [];
      const b = curr.body ? [...a, curr.body] : a;
      return acum.clone({ body: b });
    }, new HttpResponse<FileModel[]>());
    return this.convertArrayResponse(body);
  }

  private convertArrayResponse(res: ArrayResponseType): ArrayResponseType {
    const body: FileModel[] = res.body ? res.body.map(this.convertItemFromServer.bind(this)) : [];
    return res.clone({ body });
  }

  private convertItemFromServer(file: FileModel | null): FileModel {
    const copy: FileModel = Object.assign({}, file);
    return copy;
  }
}
