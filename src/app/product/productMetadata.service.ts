// this module is responsible for CRUD operations on data
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {IModuleMetadata} from './productMetadata' 

@Injectable()
export class PikaModuleService {
   // private _pikaModuleUrl = 'http://grafana.pikatech.com:3001';
    private _pikaModuleUrl = 'http://localhost:3001';
    constructor(private _http: Http) {}

    // this returns names to populate product drop down menu on Add Product page
    getProductNames(): Observable<String[]> {
        let modules$ = this._http.get(`${this._pikaModuleUrl}/productNames`,{headers: this.getHeaders()})
        .map((response: Response) => <String[]> response.json().result)
        .catch(this.handleError);
        return modules$;
    }
    // returns list of modules and fields to be populated for product names
    getProductMetadata(name: string): Observable<IModuleMetadata[]>{
         let modules$ = this._http.get(`${this._pikaModuleUrl}/productMetadata/${name}`,{headers: this.getHeaders()})
        .map((response: Response) => <IModuleMetadata[]> response.json().result)
        //.do(data => console.log('getBySn: ' + JSON.stringify(data)))
        .catch(this.handleError);
        return modules$;
    }

    get(id: number): Observable<IModuleMetadata>{
         let module$ = this._http.get(`${this._pikaModuleUrl}/device/${id}`,{headers: this.getHeaders()})
        .map((response: Response) => <IModuleMetadata[]> response.json().result)
        //.do(data => console.log('Get: ' + JSON.stringify(data)))
        .catch(this.handleError);
        return module$;
    }

// should add addNewProduct
// should add remove and update Product and some type of module maintenance
 
 // incomplete
    saveProduct(modules: IModuleMetadata[]): Observable<number> {
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