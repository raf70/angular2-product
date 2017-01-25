import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {IModule} from './pikaModule' 

@Injectable()
export class PikaModuleService {
    private _pikaModuleUrl = 'http://grafana.pikatech.com:3001';

    constructor(private _http: Http) {}

    getAll(): Observable<IModule[]> {
        let modules$ = this._http.get(`${this._pikaModuleUrl}/devices`,{headers: this.getHeaders()})
        .map((response: Response) => <IModule[]> response.json().result)
        //.do(data => console.log('getAll: ' + JSON.stringify(data)))
        .catch(this.handleError);
        return modules$;
    }

    getBySn(sn: string): Observable<IModule[]>{
         let modules$ = this._http.get(`${this._pikaModuleUrl}/deviceBySn/${sn}`,{headers: this.getHeaders()})
        .map((response: Response) => <IModule[]> response.json().result)
        //.do(data => console.log('getBySn: ' + JSON.stringify(data)))
        .catch(this.handleError);
        return modules$;
    }

    get(id: number): Observable<IModule>{
         let module$ = this._http.get(`${this._pikaModuleUrl}/device/${id}`,{headers: this.getHeaders()})
        .map((response: Response) => <IModule[]> response.json().result)
        //.do(data => console.log('Get: ' + JSON.stringify(data)))
        .catch(this.handleError);
        return module$;
    }

    save(modules: IModule[]): Observable<number> {
        // console.log("to post: " + JSON.stringify(modules));
        return this._http.post(`${this._pikaModuleUrl}/device`,JSON.stringify(modules),{headers: this.getHeaders()})
        .map((response: Response) => <number> response.json().result)
        .do(data => console.log('Save: ' + JSON.stringify(data)))
        .catch(this.handleError);
        
        
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error')
    }
   
    private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}