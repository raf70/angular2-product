// this module is responsible for CRUD operations on data
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {IModuleSchema} from '../models/productSchema' 
import {IModule} from '../models/PikaModule' 

////////////////////////////////////////////////////////////
///                                                      ///  
///            pikaModule manipulation calls             ///
///                                                      ///  
////////////////////////////////////////////////////////////

@Injectable()
export class PikaModuleService {
   // private _pikaModuleUrl = 'http://grafana.pikatech.com:3001';
    private _pikaModuleUrl = 'http://localhost:3001';
    constructor(private _http: Http) {}

    getAll(): Observable<IModule[]> {
        let modules$ = this._http.get(`${this._pikaModuleUrl}/devices`,{headers: getHeaders()})
        .map((response: Response) => <IModule[]> response.json().result)
        //.do(data => console.log('getAll: ' + JSON.stringify(data)))
        .catch(handleError);
        return modules$;
    }

    getBySn(sn: string): Observable<IModule[]>{
         let modules$ = this._http.get(`${this._pikaModuleUrl}/deviceBySn/${sn}`,{headers: getHeaders()})
        .map((response: Response) => <IModule[]> response.json().result)
        //.do(data => console.log('getBySn: ' + JSON.stringify(data)))
        .catch(handleError);
        return modules$;
    }

    get(id: number): Observable<IModule>{
         let module$ = this._http.get(`${this._pikaModuleUrl}/device/${id}`,{headers: getHeaders()})
        .map((response: Response) => <IModule[]> response.json().result)
        //.do(data => console.log('Get: ' + JSON.stringify(data)))
        .catch(handleError);
        return module$;
    }

    save(modules: IModule[]): Observable<number> {
        // console.log("to post: " + JSON.stringify(modules));
        return this._http.post(`${this._pikaModuleUrl}/device`,JSON.stringify(modules),{headers: getHeaders()})
        .map((response: Response) => <number> response.json().result)
        .do(data => console.log('Save: ' + JSON.stringify(data)))
        .catch(handleError);        
    }
}

////////////////////////////////////////////////////////////
///                                                      ///  
///              metadata manipulation calls             ///
///                                                      ///  
////////////////////////////////////////////////////////////


@Injectable()
export class ProductMetadataService {
   // private _pikaModuleUrl = 'http://grafana.pikatech.com:3001';
    private _pikaModuleUrl = 'http://localhost:3001';
    constructor(private _http: Http) {}

    // this returns names to populate product drop down menu on Add Product page
    getProductNames(): Observable<String[]> {
        let modules$ = this._http.get(`${this._pikaModuleUrl}/productNames`,{headers: getHeaders()})
        .map((response: Response) => <String[]> response.json().result)
        .catch(handleError);
        return modules$;
    }
    // returns list of modules and fields to be populated for product names
    getProductStructure(name: string): Observable<IModuleSchema[]>{
         let modules$ = this._http.get(`${this._pikaModuleUrl}/productStructure/${name}`,{headers: getHeaders()})
        .map((response: Response) => <IModuleSchema[]> response.json().result)
        .do(data => console.log('productStructure: ' + JSON.stringify(data)))
        .catch(handleError);
        return modules$;
    }

    get(id: number): Observable<IModuleSchema>{
         let module$ = this._http.get(`${this._pikaModuleUrl}/device/${id}`,{headers: getHeaders()})
        .map((response: Response) => <IModuleSchema[]> response.json().result)
        //.do(data => console.log('Get: ' + JSON.stringify(data)))
        .catch(handleError);
        return module$;
    }

// should add addNewProduct
// should add remove and update Product and some type of module maintenance
 
 // incomplete
    saveProduct(modules: IModuleSchema[]): Observable<number> {
        // console.log("to post: " + JSON.stringify(modules));
        return this._http.post(`${this._pikaModuleUrl}/device`,JSON.stringify(modules),{headers: getHeaders()})
        .map((response: Response) => <number> response.json().result)
        .do(data => console.log('Save: ' + JSON.stringify(data)))
        .catch(handleError);        
    }
}

////////////////////////////////////////////////////////////
///                                                      ///  
///                   helper funcitons                   ///
///                                                      ///  
////////////////////////////////////////////////////////////

    function handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error')
    }
   
    function getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }