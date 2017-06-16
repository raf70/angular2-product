import {Component, OnInit}from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {IModule} from '../models/pikaModule';
import {PikaModuleService} from '../services/db.service';


@Component ({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['../css/dataTables.bootstrap.min.css']
    
})
export class ProductListComponent {

    title: string ="Module List";
    modules: IModule[];
    errorMessage: string;
    sortByDateOrder: string = "";
    sortByPnOrder: string = "";
    constructor(private _pikaModuleService: PikaModuleService) {

    }
    

    ngOnInit(): void {
       this._pikaModuleService.getAll()
       .subscribe(
          modules => this.modules = modules,
          error => this.errorMessage = <any>error);
    }

    ngOnChanges(): void {

    }

    sortListClick(sortColumn: string): void{
        if(sortColumn=='byDate') {
        this.sortByPnOrder = ""
        if(this.sortByDateOrder == "glyphicon glyphicon-sort-by-attributes-alt") {
            this.sortByDateOrder = "glyphicon glyphicon-sort-by-attributes";
            this.sortList(sortColumn, 'asc');

        } else {
            this.sortByDateOrder = "glyphicon glyphicon-sort-by-attributes-alt";
            this.sortList(sortColumn, 'desc');
        }
        
        } else if(sortColumn =='byPn') {
            this.sortByDateOrder="";
            if(this.sortByPnOrder == "glyphicon glyphicon-sort-by-attributes-alt") {
            this.sortByPnOrder = "glyphicon glyphicon-sort-by-attributes";
            this.sortList(sortColumn, 'asc');

        } else {
            this.sortByPnOrder = "glyphicon glyphicon-sort-by-attributes-alt";
            this.sortList(sortColumn, 'desc');
        }
        
        }
    }

   sortList(sortColumn: string, sortOrder: string ): void
    {
        // PN is ItemNo
        var asc = [-1,0,1];
        var desc = [1,0,-1];
        var sort;

       sort = ( sortOrder == 'asc')? asc: desc;
        
        if (sortColumn == 'byPn'){
            this.modules.sort((l,r) => {            
                if (l.ItemNo < r.ItemNo) return sort[0];
                if (l.ItemNo > r.ItemNo) return sort[2];
                return sort[1];
            });
        } else if (sortColumn == 'byDate') {
            this.modules.sort((l,r) => {            
                if (l.CreateDt < r.CreateDt) return sort[0];
                if (l.CreateDt > r.CreateDt) return sort[2];
                return sort[1];
            });
        }
    }
}