import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable()
export class B3Service {
    constructor(private http: HttpClient) {
    }

    findPapel(papel: string): Observable<any[]> {
        return this.http.get<any[]>(`${environment.alphavantageUrl}&symbol=${papel}.SAO&apikey=${environment.alphavantageKEY}`);
    }
}
