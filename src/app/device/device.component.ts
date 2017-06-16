import { Component, Directive, OnInit, Input, OnChanges, ElementRef, Renderer } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IModule, PikaModule } from '../models/PikaModule';
import { IModuleSchema, INameMap, ProductRowSchema } from '../models/productSchema';
import { PikaModuleService, ProductMetadataService } from '../services/db.service';
//import { ParseScanCode } from './scanParser'


@Directive({ // need to figure out how to set this up
    selector: '[focus]'
})

@Component({
    //moduleId: module.id,
    selector: 'device',
    templateUrl: 'device.component.html'
})
export class DeviceComponent implements OnInit {

    public myForm: FormGroup;

    title: string
    productNames: INameMap[]; // list of products for add product select box with list of modules
    productDefinition: INameMap;  // name of product to be added
    moduleList: String;  // list of components comprising productName
    product: ProductRowSchema; // description of individual component sent to subproduct ng-component
    productRows: ProductRowSchema[]; // metadata for each module pulled from db
    errorMessage: string;
    observedModules: IModule[];  // values of all inputs on the form
    
   // private selectListSubscription = null;

    get modules(): FormArray {
        return <FormArray>this.myForm.get('modules');
    }

    constructor(private _fb: FormBuilder, private _productMetadataSerice: ProductMetadataService, private _pikaModuleSerice: PikaModuleService) {
    }

    ngOnInit() {
        this.title='';
        this.myForm = this._fb.group({
            selectProductName: [''],
            modules: this._fb.array([]),
        });

            this.setDropdown();   
    }


    setDropdown() {
            // populate drop down list
            this._productMetadataSerice.getProductNames()
                .subscribe(
                names =>
                    this.productNames = names,
                error =>
                    this.errorMessage = <any>error
                )         
            // watch for changes to Product to Add  dropdown list
            this.myForm.get('selectProductName').valueChanges
                .subscribe(selectedValue => {                  
                   this.removeModules(); 
                    if (selectedValue != 'Select device to add...') {
                        this.productDefinition = selectedValue
                        this.getProductStructure(this.productDefinition.ModuleList)
                    }
                })
    }

    removeModules() {
        // removes modules before new ones are added when product selection is changed
         while(this.modules.length>0) this.modules.removeAt(this.modules.length-1);                    
    }

    reInitialize(){
        // used by reset()
        //console.log('reInitialize called');
        this.productDefinition = null;
        this.productRows = null;
        this.observedModules = null;

    }

    

    setModules(data: ProductRowSchema[]): void {
       // data.reverse() // make parent device first in the list
        for (let i in data) {
            this.modules.push(this.initModule(data[i]))
            this.disableFields(data[i], i)     
        }
        // gets a list of Scan fields that have been generated to be observed for Changes
        var arraySize = this.modules.length
        var scanFieldControl: AbstractControl[] = []
        for (var _i = 0; _i < arraySize; _i++) {
            scanFieldControl.push(this.modules.get(_i + '.Scan'))
        }

       
        // register scan code fields to be observed for changes
        var value: string;
        scanFieldControl.forEach((item, index)  => {
            item.valueChanges.subscribe(
                value => {
                        //console.log(`value: ${value}`);
                        this.parseScanCode(value, index);
                    },
                error => { this.title = 'Error Parsing Scanned Code';},
            )
        })

        // watch for changes on all fields
        this.modules.valueChanges
        .subscribe(allValues => {
            this.observedModules = allValues
        })
    }



    initModule(d: ProductRowSchema): FormGroup {
        var fg = this._fb.group({
            ItemNo: d.ItemNo,
            Sn: d.Sn,
            MacImei0: d.MacImei0,
            MacImei1: d.MacImei1,
            MacImei2: d.MacImei2,
            MacImei3: d.MacImei3,
            MacImei4: d.MacImei4,
            Uuid0: d.Uuid0,
            Uuid1: d.Uuid1,
            License: d.License,
            Scan: ''
        })
        return fg
    }

    // there must be a better way to remove those elements from DOM tree, this is an ugly fix just so I can move on 
    disableFields(d: ProductRowSchema, n: string) {
        if (!d.ShowSn) this.modules.get(n + '.Sn').disable()
        if (!(d.ShowMac0 || d.ShowImei0)) { 
            var myModule = this.modules.get(n + '.MacImei0');
            //myModule.patchValue()
            myModule.disable();
        }
        if (!(d.ShowMac1 || d.ShowImei1)) this.modules.get(n + '.MacImei1').disable()
        if (!(d.ShowMac2 || d.ShowImei2)) this.modules.get(n + '.MacImei2').disable()
        if (!(d.ShowMac3 || d.ShowImei3)) this.modules.get(n + '.MacImei3').disable()
        if (!d.ShowMac4) this.modules.get(n + '.MacImei4').disable()
        if (!d.ShowUuid0) this.modules.get(n + '.Uuid0').disable()
        if (!d.ShowUuid1) this.modules.get(n + '.Uuid1').disable()
        if (!d.ShowLicense) this.modules.get(n + '.License').disable()
        this.modules.get(n + '.ItemNo').disable()
    }


   parseScanCode(value: string, index: number): void {
     //  this code waits for entire code to appear by looking at length
     
            var ItemNo = this.modules.at(index).get('ItemNo').value;
            console.log(ItemNo);
            var fields: string[];

            if (ItemNo == 'PIK-APP-00800') {
                // miniWarp
                // c1e7e926-1139-4704-b674-486c717b52ed 00:1E:84:00:23:D1 00:1E:84:00:23:D0 00:1E:84:00:23:CF 00:1E:84:00:23:CE 00:1E:84:00:23:CD
                fields = value.split(' ');
                this.modules.at(index).get('Uuid0').patchValue(fields[0]);
                this.modules.at(index).get('Sn').patchValue(fields[1].replace(/:/g,''));
                this.modules.at(index).get('MacImei0').patchValue(fields[1]);
                this.modules.at(index).get('MacImei1').patchValue(fields[2]);
                this.modules.at(index).get('MacImei2').patchValue(fields[3]);
                this.modules.at(index).get('MacImei3').patchValue(fields[4]);
                this.modules.at(index).get('MacImei4').patchValue(fields[5]);

            } else if (ItemNo == 'PIK-99-00921') {
                //  866771027106227 866771027109221 866771027109429 866771027106458 PIK-515-SU00082
                fields = value.split(' '); 
                this.modules.at(index).get('MacImei0').patchValue(fields[0]);
                this.modules.at(index).get('MacImei1').patchValue(fields[1]);
                this.modules.at(index).get('MacImei2').patchValue(fields[2]);
                this.modules.at(index).get('MacImei3').patchValue(fields[3]);
                this.modules.at(index).get('Sn').patchValue(fields[4]);

            } else if (ItemNo == 'PIK-99-00922') {
                //  013949007420428 013949007420535 PIK-314-SU00163
                fields = value.split(' ');
                this.modules.at(index).get('MacImei0').patchValue(fields[0]);
                this.modules.at(index).get('MacImei1').patchValue(fields[1]);
                this.modules.at(index).get('Sn').patchValue(fields[2]);

            } else if (value.length == 59) { // what's the item(s) number(s)?
                // WARP 3 label
                // LabeljoyPIK-233-ZY00660;00:1E:84:00:16:EA;00:1E:84:00:12:CC
                fields = value.substr(8).split(';')
                this.modules.get(index + '.Sn').patchValue(fields[0])
                this.modules.get(index + '.MacImei0').patchValue(fields[1]);
                this.modules.get(index + '.MacImei1').patchValue(fields[2]);

            } else if (value.length == 131 && value.indexOf('BEGIN:PIKA VER:1.0') >= 0) {
                //uWARP
                //BEGIN:PIKA VER:1.0 PN:PIK-99-00993 UUID:4feddd28-2b0d-4964-80e3-41da2c0ed26c MAC0:00:1E:84:00:22:3D MAC1:00:1E:84:00:22:3C END:PIKA
                fields = value.split(' ')
                this.modules.get(index + '.Sn').patchValue(fields[4].substr(5).replace(/:/g,''));
                this.modules.get(index + '.Uuid0').patchValue(fields[3].substr(5));
                this.modules.get(index + '.MacImei0').patchValue(fields[4].substr(5));
                this.modules.get(index + '.MacImei1').patchValue(fields[5].substr(5));
            }
}

    // pulls row descriptions from db
    getProductStructure(moduleList: string) {
        if (moduleList.length > 0)

            this._productMetadataSerice.getProductStructure(moduleList)
                .subscribe(
                data => {
                    this.setTitle(this.productDefinition.ProductName)
                    this.productRows = setupRows(data, moduleList) // product rows contains metadata only 
                    this.setModules(this.productRows); // this creates rows containing metadata and initialized data fields 
                },
                err => console.log('error: ', err)
                )
    }

    setTitle(s: string) {
        this._pikaModuleSerice.describe(s)
            .subscribe(
            data => {
                this.title = s + ' - ' + data
            })
    }

    saveAndNew(){
        this.writeToDB();
        setTimeout(this.wipeModulesData, 1000);
    }

    save() {
        this.writeToDB();
        setTimeout(this.reset, 1000); 
    }

    writeToDB = () => {
        // ItemNo is not part of observable, must be copied over from template
        if (this.observedModules.length === this.productRows.length) {
            for (var _i = 0; _i < this.observedModules.length; _i++) {
                this.observedModules[_i].ItemNo = this.productRows[_i].ItemNo.trim()
            }
        }

        var parentSn = '';
        for (let p of this.observedModules) {
            if (p.ItemNo.trim() == this.productDefinition.ProductName.trim()) {
                p.IsParent = true;
                p.ParentSn = p.Sn;
                parentSn = p.Sn;
            }
        }

        for (let p of this.observedModules) {
            p.ParentSn = parentSn
            if (p.ItemNo.trim() == this.productDefinition.ProductName.trim()) {
                p.IsParent = true;
            } else p.IsParent = false;
        }
        console.log("from Save updated:", JSON.stringify(this.observedModules))
        this._pikaModuleSerice.save(this.observedModules)
            .subscribe(
            data => this.title = ' ...Saved',
            err => console.log('error: ', err)
            )
    }

    reset = () => {
        this.reInitialize();
        this.ngOnInit();
    }

    wipeModulesData = () => {   
        
        // this.modules.reset() sets everything to null inculding ItemNo
        // setting field values individually
        for (var _i = 0; _i < this.modules.length; _i++) {
        this.modules.at(_i).get('Scan').setValue('');
        this.modules.at(_i).get('Sn').setValue('');
        this.modules.at(_i).get('MacImei0').setValue('');
        this.modules.at(_i).get('MacImei1').setValue('');
        this.modules.at(_i).get('MacImei2').setValue('');
        this.modules.at(_i).get('MacImei3').setValue('');
        this.modules.at(_i).get('MacImei4').setValue('');
        this.modules.at(_i).get('Uuid0').setValue('');
        this.modules.at(_i).get('Uuid1').setValue('');
        this.modules.at(_i).get('License').setValue('');
        }
    
        this.title = this.productDefinition.ProductName;
    } 
}

function setupRows(data: ProductRowSchema[], list: string): ProductRowSchema[] {
    //
    let newData: ProductRowSchema[] = new Array();
    var nameArray = list.split(',');
    let index = 0;

    for (let i of nameArray) {
        for (let j of data) {
            if (i.indexOf(j.ItemNo.trim()) >= 0) {
                //    console.log("---")
                j.Index = index;
                index++;
                newData.push(JSON.parse(JSON.stringify(j))); // cloning                 
                break;
            }
        }
    }
    //newData.reverse() // parent component first in the list
    console.log('list:',JSON.stringify(newData))
    if (nameArray.length > newData.length) {
        console.log("ERROR: Incomplete set - schema doesn't match list of modules")
    }
    return newData
}
