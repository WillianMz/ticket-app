import { Observable } from 'rxjs';
import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ENDERECO_API: string = `${environment.api}/upload`;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public imagem(file: FormData) {
    return this.http.post(`${ENDERECO_API}/image`, file);
  }

  public arquivo(file: FormData) {
    return this.http.post(`${ENDERECO_API}/file`, file);
  }
}
