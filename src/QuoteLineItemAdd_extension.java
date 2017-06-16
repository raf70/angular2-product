public with sharing class QuoteLineItemAdd_extension {
//Nash & Rafal 2014 April 1st

    public Product2 product {get;set;}
    public PricebookEntry pbe {get;set;}
    private list<Product2> prods;
    public String accountName { get; set; }
    public static Product2 product { get; set; }       
    public Decimal unitPrice {get; set;}  // list price
    public Decimal unitCost {get; set;}
    public Integer quantity {get; set;}
    public Decimal salesPrice {get; set;}
    public Decimal GM {get; set;}
    public Decimal vendorDiscount {get; set;}
    public Decimal clientDiscount {get; set;}
    public Decimal extendedPrice {get; set;}
    public String quoteID {get;set;}
    public Quote quo {get;set;}
    public Id pricebookId {get;set;}
    public boolean addProductToOpp;
//// added by Raf April 17, 2017 trying to fix it
    public String venProdCodeSeachStr {get; set;}
    public String productCode {get; set;}
   
    
    
//Nash start

   public List<SelectOption> getItems() {
            List<SelectOption> options = new List<SelectOption>();
            options.add(new SelectOption('CAD','CAD'));
            options.add(new SelectOption('USD','USD'));
            return options;
        }

    public list<Account> VendorAccounts {get;set;}
    public Account vendorAccount {get;set;}  //locked for Update becous of counter  
    public string vendorSelected {get;set;}
    public string distributorSelected {get;set;} 
    public list<AccountPartner> DistributorAccounts {get;set;}
    public list<SelectOption> myVendors {get; set;}
    public list<SelectOption> myDistributors {get; set;}
    public string currencySelected {get;set;}
    public string typeSelected {get;set;}
    public string serviceProviderSelected {get;set;}
    
    public list<Product2> VendorPN_list {get;set;} 
    public Product2 VendorPN_selected {get;set;}
    
    public Map<String, String> delivery_Map = new Map<String, String>();
    public Map<String, String> provider_serialized_Map = new Map<String, String>();
    public Map<String, String> new_renewal_Map = new Map<String, String>();
    public Map<String, String> currency_Map = new Map<String, String>();
    public Map<String, String> delivery_Map_reverse = new Map<String, String>();
    public Map<String, String> provider_serialized_Map_reverse = new Map<String, String>();
    public Map<String, String> new_renewal_Map_reverse = new Map<String, String>();
    public Map<String, String> currency_Map_reverse = new Map<String, String>();
    
//Nash End    

// VF components display logic start

    public boolean getshowProvider() 
        { if(product.Delivery__c=='Product' || product.Delivery__c=='Rebate' || product.Delivery__c=='Freight') 
                return false; 
          else return true;
         }      
         
    public boolean getShowRenewal() 
        { if(product.Delivery__c=='Rebate' || product.Delivery__c=='Product' || product.Delivery__c=='Freight') 
                return false; 
          else return true;
         }   
         
    public boolean getShowSerialized() 
        { if(product.Delivery__c=='Product')
                return true; 
          else return false;
         } 
         
        public boolean getshowRebateType() 
        { 
          if(product.Delivery__c=='Rebate') 
                return true; 
          else return false;
        }           
    
// VF components display logic end

    public QuoteLineItemAdd_extension(ApexPages.StandardController controller) {
        System.debug('Entered Constructor');
        if (product==null){ //execute just on first load not on page refresh
            System.debug('Initializing product');
            QuoteId = System.currentPageReference().getParameters().get('quoteId');
            try {
                quo = [SELECT Opportunity.opportunity_currency__c,
                          Opportunity.exchange_rate__c,
                          CurrencyIsoCode, 
                          Name,
                          id 
                    FROM Quote 
                    WHERE Id =: quoteId];
                addProductToOpp = true;
            }
            catch( System.QueryException ex) {
                //this catch can cause not creating product line item because of flag addProductToOpp
                addProductToOpp = false;
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 
                'Sorry, Exception error catch, report to Rafal please.'));
            }
            this.product = (Product2)controller.getRecord();
            pbe = new PricebookEntry(); 
            
            if (myVendors==null){
                    //this.product.type__c='Product';  //not in use 2014 02 08  replaced with Delivery__c
                    codeGeneratorMaps();
                    this.product.Delivery__c='Product';
                    this.product.Vendor_Product_Code__c='';
                    getVendors();
                    getDistributors();
                    VendorPN_list=new list<Product2>();
            }
            quantity = 1;
        }
    }
    
   public void insertPbetoOpp(Id pbeid)
    {
        QuoteLineItem Qli = new QuoteLineItem();
        qli.quoteID = quoteID;
        qli.PricebookEntryId = pbeid;
        qli.Quantity = quantity;
        qli.UnitPrice = salesPrice;
        qli.Cost__c = unitCost;
        qli.List_Price__c = pbe.UnitPrice;
        qli.Category__c=product.Category__c;  //Nash new field
        qli.GM__c = GM;

        
        try {insert qli;}
        catch (DmlException ex) {ApexPages.addMessages(ex);}
    }
      
    public boolean checkPN(){
    
    boolean check;
    if(product.Type__c == 'Product'){
        prods = [SELECT id from Product2 where productCode =: product.productCode and isActive =: true];
    } 
    else {// if(product.Type__c == 'Service')
        prods = [SELECT id from Product2  where productCode =: product.productCode and vendor_product_Code__c =: product.vendor_product_Code__c and isActive =: true];
    }
    if(prods.size()> 0) { check = true;}
    else {check = false;} 
    
    return check;
    
    }

  //Nash
  public void getVendors(){
        currencySelected='C'; //CAD (default value)
        typeSelected='';     //New (default value)
        serviceProviderSelected=''; //Direct (default value)
        myVendors=new list<SelectOption>(); 
        List<Account> VendorAccounts =[Select a.Quote_Prefix__c,
                                                                                  a.Id,
                                                                                  a.Distributor_Code__c,
                                                                                  a.Vendor_Counter__c,
                                                                                  a.Name        
                                                                        From Account a 
                                                                        where a.Type='Partner' 
                                                                          and a.Quote_Prefix__c !=null
                                                                          and a.Distributor_Code__c!=null
                                                                          and a.IsDeleted=false  
                                                                        order by a.Name
                                                                ];
        for (Account acc: VendorAccounts){
                myVendors.add(new SelectOption(acc.Id,acc.Name));
        }
        //set defailt value
        vendorSelected=myVendors[0].getValue();
        return;
  }
  public void getDistributors(){
        myDistributors=new list<SelectOption>(); 
        //Direct Sale No Distributor is default value
        //Find Selected Accountand his Distributor Code
        
        
        vendorAccount=[Select a.Quote_Prefix__c,
                              a.Id,
                              a.Distributor_Code__c,
                              a.Vendor_Counter__c,
                              a.Name        
                       From Account a 
                       where a.Id=:vendorSelected
                       LIMIT 1
                       FOR UPDATE 
                       ];

        DistributorAccounts =[Select a.Role, 
                                                                                                          a.IsPrimary, 
                                                                                                          a.Id, 
                                                                                                          a.AccountToId,
                                                                                                          AccountTo.Distributor_Code__c,
                                                                                                          AccountTo.Name 
                                                                                                From AccountPartner a 
                                                                                                where a.AccountFromId=:vendorSelected
                                                                                                and  AccountTo.Distributor_Code__c!=null 
                                                                                                and a.IsDeleted=false    
                                                                                                and a.Role='Distributor' 
                                                                                                order by AccountTo.Name
                                                                ];
        for (AccountPartner acc: DistributorAccounts){
                myDistributors.add(new SelectOption(acc.AccountTo.Distributor_Code__c,acc.AccountTo.Name));
        }
        if(vendorAccount.Distributor_code__c != '-')
        {
            if (myDistributors.isEmpty())
            {
            myDistributors.add(new SelectOption(vendorAccount.Distributor_Code__c,'Direct (No Distributor)'));
            }
            else
            {
            myDistributors.add(0,new SelectOption(vendorAccount.Distributor_Code__c,'Direct (No Distributor)'));
            }
        
        } 
        distributorSelected=myDistributors[0].getValue();
        getProductCode();
        return;
  }  
  public void DeliverableChanged(){
        serviceProviderSelected='';
        getProductCode();
  }
  
  public void getProductCode(){
        //this method is called on change of any relevant parameter for code generator and will cause generation of new code
        
        Integer vendorCounter = 0;
        try // added by Raf to handle case where counter has not been initialized
        {
            vendorCounter=integer.valueOf(vendorAccount.Vendor_Counter__c) + 1;
        }
        catch(NullPointerException ex)
         {// keep initialized value
             System.debug(ex);
         }   
        
        if(getShowRebateType()  || product.Delivery__c=='Freight') 
            { 
                typeSelected='X';
            } 
        else if(getShowSerialized()) 
            { 
                typeSelected='N';
            } 

          if(product.Delivery__c=='Freight') 
            { 
                serviceProviderSelected='X';
            }    
            
       
        product.ProductCode=delivery_Map.get(product.Delivery__c)+                          //Deliverable
                            vendorAccount.Quote_Prefix__c+                                  //Vendore code
                            distributorSelected+                                            //Distributor Code
                            currencySelected+                                               //Currency selected
                            string.valueOf(vendorCounter).leftPad(7).replace(' ','0')+      //vendor counter
                            typeSelected+                                                   //New/Renewal
                            serviceProviderSelected;                                        //Provider/Serialized
       System.debug(' product.ProductCode: ' + product.ProductCode);                     
  
  }
 
  public void searchVendorPN_list(){
        // product.Vendor_Product_Code__c=string.valueOf(product.Vendor_Product_Code__c).trim();
        VendorPN_list =[Select p.Vendor_Product_Code__c, 
                                              p.Vendor_Account__c,
                                              Vendor_Account__r.Quote_Prefix__c, 
                                              Vendor_Account__r.Vendor_Counter__c, 
                                              Vendor_Account__r.Distributor_Code__c,
                                              p.Purchase_Currency__c, 
                                              p.Provider_Serialized__c, 
                                              p.ProductCode, 
                                              p.New_Renewal__c, 
                                              p.Name, 
                                              p.Description,
                                              p.Id, 
                                              p.Distributor_Account__c,
                                              Distributor_Account__r.Distributor_Code__c,  
                                              p.Delivery__c, 
                                              p.Category__c,
                                              p.Selected__c  
                                        From Product2 p
                                       where p.IsDeleted=false  
                                         and p.Vendor_Product_Code__c=:venProdCodeSeachStr 
                                         and p.Vendor_Account__c!='' 
                                         and p.Distributor_Account__c!='' 
                                    order by p.Vendor_Product_Code__c 
                                   ];
        //ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.INFO, 'Vendor List size: '+ VendorPN_list.size().format()));
                                           
        return;
  }
  public pageReference selectVendorPN(){
        //check on unique selection
        integer counter=0;
        for (Product2 obj: VendorPN_list){
            if (obj.Selected__c) {
                counter++;
                VendorPN_selected=obj;
            }
        }
        if (counter>1) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Sorry, you can not select two Vendors. Correct your selection to one, please.'));
            return null;
        }
        if (VendorPN_selected!=null){
         ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.INFO, VendorPN_selected.Delivery__c + ' ' + VendorPN_selected.Category__c);
            ApexPages.addMessage(msg);
            //prepopulate values of selection 
            //TBD discussed with Rafal: what I am parsing (old codes or relay just to new one created with new product code generator and stored in Product 2 object)
            this.product.Delivery__c=VendorPN_selected.Delivery__c;
            this.product.Category__c=VendorPN_selected.Category__c;
            vendorSelected=VendorPN_selected.Vendor_Account__c;
            //find all distributors for vendor
            vendorAccount=[Select a.Quote_Prefix__c,
                                                                                  a.Id,
                                                                                  a.Distributor_Code__c,
                                                                                   a.Vendor_Counter__c,
                                                                                  a.Name        
                                                                        From Account a 
                                                                        where a.Id=:vendorSelected
                                                                        LIMIT 1
                                                                        FOR UPDATE 
                                                                ];
            myDistributors=new list<SelectOption>();

            DistributorAccounts =[Select a.Role, 
                                                                                                          a.IsPrimary, 
                                                                                                          a.Id, 
                                                                                                          a.AccountToId,
                                                                                                          AccountTo.Distributor_Code__c,
                                                                                                          AccountTo.Name 
                                                                                                From AccountPartner a 
                                                                                                where a.AccountFromId=:vendorSelected
                                                                                                and a.IsDeleted=false    
                                                                                                and a.Role='Distributor' 
                                                                                                order by AccountTo.Name
                                                                ];
                       
            for (AccountPartner acc: DistributorAccounts){
                myDistributors.add(new SelectOption(acc.AccountTo.Distributor_Code__c,acc.AccountTo.Name));
            }
            if (vendorAccount.Distributor_Code__c != '-') 
                {
                    if (myDistributors.isEmpty()) {
                        myDistributors.add(new SelectOption(vendorAccount.Distributor_Code__c,'Direct (No Distributor)'));
                    }
                    else
                    {
                        myDistributors.add(0,new SelectOption(vendorAccount.Distributor_Code__c,'Direct (No Distributor)'));
                    }
                } 
            distributorSelected=VendorPN_selected.Distributor_Account__r.Distributor_Code__c;
            if (VendorPN_selected.Vendor_Account__c==VendorPN_selected.Distributor_Account__c){
                //'Direct (No Distributor)' option
                distributorSelected=VendorPN_selected.Vendor_Account__r.Distributor_Code__c;
            }
            
            
            currencySelected=currency_Map.get(VendorPN_selected.Purchase_Currency__c);
            
            typeSelected=new_renewal_Map.get(VendorPN_selected.New_Renewal__c);
            
            serviceProviderSelected=provider_serialized_Map.get(VendorPN_selected.Provider_Serialized__c);
            
            
            this.product.ProductCode=(VendorPN_selected.ProductCode);
            this.product.Name=VendorPN_selected.Name;
            this.product.Description=VendorPN_Selected.Description;
            
        }else{
            //generate new product code
            Integer vendorCounter=0;
            if (vendorAccount.Vendor_Counter__c!=null){
                vendorCounter=integer.valueOf(vendorAccount.Vendor_Counter__c) + 1;
            }
            product.ProductCode=delivery_Map.get(product.Delivery__c)+                      //Deliverable
                            vendorAccount.Quote_Prefix__c+                                  //Vendore code
                            distributorSelected+                                            //Distributor Code
                            currencySelected+                                               //Currency selected
                            string.valueOf(vendorCounter).leftPad(7).replace(' ','0')+      //vendor counter
                            typeSelected+                                                   //New/Renewal
                            serviceProviderSelected;                                        //Provider/Serialized
        }
        return null;        
  }
  public void codeGeneratorMaps(){
        //Any addition to product2.Delivery__c field as option need to update this code in order to be supported in Code generator 
        //Map<String, String> delivery_Map = new Map<String, String>();
        delivery_Map.put('Product','P');    
        delivery_Map.put('KCS','C');        
        delivery_Map.put('PS','S');      
        delivery_Map.put('KMS','M');        
        delivery_Map.put('Rebate','R');
        delivery_Map.put('Freight','F');
        delivery_Map.put('Residency','E');
        delivery_Map.put('NuAge','N');
            
        //Map<String, String> provider_serialized_Map = new Map<String, String>();
        provider_serialized_Map.put('Direct','D');  //not product
        provider_serialized_Map.put('KTI','K');     //not product
        provider_serialized_Map.put('Yes','Y');     //product 
        provider_serialized_Map.put('No','N');      //product
        provider_serialized_Map.put('N/A','X');
            
            
        //Map<String, String> new_renewal_Map = new Map<String, String>();
        new_renewal_Map.put('New','N');
        new_renewal_Map.put('Renewal/Refurbished','R');
        new_renewal_Map.put('N/A','X');
        new_renewal_Map.put('H/W','H');
        new_renewal_Map.put('Service','S');
            
        //Map<String, String> currency_Map = new Map<String, String>();
        currency_Map.put('CAD','C');
        currency_Map.put('USD','U');
        
        //reverse maps
        Set <String> mapkeySet = new Set<String>();
        
        //Map<String, String> delivery_Map_reverse = new Map<String, String>();
        mapkeySet=delivery_Map.keySet();
        for (string key: mapkeySet){
            delivery_Map_reverse.put(delivery_Map.get(key),key);
        }
                    
        //Map<String, String> provider_serialized_Map_reverse = new Map<String, String>();
        mapkeySet=provider_serialized_Map.keySet();
        for (string key: mapkeySet){
            provider_serialized_Map_reverse.put(provider_serialized_Map.get(key),key);
        }
            
        //Map<String, String> new_renewal_Map_reverse = new Map<String, String>();
        mapkeySet=new_renewal_Map.keySet();
        for (string key: mapkeySet){
            new_renewal_Map_reverse.put(new_renewal_Map.get(key),key);
        }
            
        //Map<String, String> currency_Map_reverse = new Map<String, String>();
        mapkeySet=currency_Map.keySet();
        for (string key: mapkeySet){
            currency_Map_reverse.put(currency_Map.get(key),key);
        }
        
        return;
  }
  
   public void validateProduct(){
       //just Product for testing code generator
       ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, 
               'Required fields, please.');
        
       product.isActive = true;
       if (product.Delivery__c==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Deliverable is required field. Select value, please.');
            ApexPages.addMessage(msg);
       }
       if (product.Category__c==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Category is required field. Select value, please.');
            ApexPages.addMessage(msg);
       }
       if (typeSelected==null || typeSelected.length()==0 ){
                msg = new ApexPages.Message(ApexPages.Severity.ERROR,
                   'New/Renewal is required field. Select value, please.');
                ApexPages.addMessage(msg);
       }
       if (product.Delivery__c=='Product'){
            product.Provider_Serialized__c=provider_serialized_Map_reverse.get(serviceProviderSelected);
            if (serviceProviderSelected==null || serviceProviderSelected.length()==0 || 
                product.Provider_Serialized__c=='Direct' || product.Provider_Serialized__c=='KTI' ){
                msg = new ApexPages.Message(ApexPages.Severity.ERROR,
                   'Serialized is required field. Select value, please.'+product.Provider_Serialized__c);
                ApexPages.addMessage(msg);
            }
       }else{
            product.Provider_Serialized__c=provider_serialized_Map_reverse.get(serviceProviderSelected);
            if (serviceProviderSelected==null || serviceProviderSelected.length()==0 || 
                product.Provider_Serialized__c=='Yes' || product.Provider_Serialized__c=='No'){
                msg = new ApexPages.Message(ApexPages.Severity.ERROR,
                   'Provider is required field. Select value, please.'+product.Provider_Serialized__c);
                ApexPages.addMessage(msg);
            }
       }
       product.Purchase_Currency__c=currency_Map_reverse.get(currencySelected);
       product.Vendor_Account__c=vendorSelected;  //account id
       product.serialized__c=serviceProviderSelected;
       if (distributorSelected==vendorAccount.Distributor_Code__c ) { //'Direct (No distributor)'
            product.Distributor_Account__c=product.Vendor_Account__c;
       }else{
           //find distributor using distributor code value in {!distributorSelected}
           for (AccountPartner distr :DistributorAccounts){
                if (distr.AccountTo.Distributor_Code__c==distributorSelected){
                    product.Distributor_Account__c=distr.AccountToId;
                    break;
                }
           }
       }
       
       if (product.Name==null || string.valueOf(product.Name).trim().length()==0) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Product Name is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }
       if (product.Description==null || string.valueOf(product.Description).trim().length()==0) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Description is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       } 
       
       product.Provider_Serialized__c=provider_serialized_Map_reverse.get(serviceProviderSelected);
       product.New_Renewal__c=new_renewal_Map_reverse.get(typeSelected);
       
       //Validate quote line item fields
       if (quantity==null || quantity==0) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Qty is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }
       
       if (vendorDiscount==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Vendor Discount is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }    
       if (clientDiscount==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Client Discount is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }
       if (GM==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'GM is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }     
       if (unitPrice==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'List Price is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }        
       if (unitCost==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Unit Cost is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }     
       if (salesPrice==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Sale Price is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }    
       if (extendedPrice==null) {
            msg = new ApexPages.Message(ApexPages.Severity.ERROR,
               'Extended Price is required field. Enter value, please.');
            ApexPages.addMessage(msg);
       }    
             
       return; 
    
    }

public PageReference saveProduct(){
      saveAndAddtoQuote();           
      return new PageReference('/'+quoteId);
     }
     
  public PageReference saveProductAndNew(){
        saveAndAddtoQuote();
        
        //re-initialize;
        product.id=null;
        product.Vendor_Product_Code__c='';
        product.Name='';
        product.Description='';
        pbe = new PricebookEntry(); 
        product.Delivery__c='Product';
        product.Vendor_Product_Code__c='';
        getVendors();
        getDistributors();
        VendorPN_list=new list<Product2>();
        VendorPN_selected=null;
       return null;
     }

  public void saveAndAddtoQuote(){
    //validated record is ok proced with save in DB
    validateProduct();
        if (ApexPages.hasMessages()){
            //return to user to fix required fields
            if (test.isRunningTest()==false){
                return;
            }
        }
    if(delivery_Map.get(product.Delivery__c) == 'C') getProductCode();  //This will generate new part number for any Service Vendor Part number, might now always be desirable.
    pricebookId = (String)[SELECT id FROM Pricebook2 WHERE isStandard=true].id;
    pbe.Pricebook2Id= pricebookId;
    pbe.IsActive= true;
    pbe.UnitPrice = unitPrice;
    pbe.useStandardPrice = false;
        
    if (VendorPN_selected!=null && product.ProductCode==VendorPN_selected.ProductCode){
            //just update category for existing and used vendor PN and use existing product and price book
        VendorPN_selected.Selected__c=false;
        VendorPN_selected.Category__c=product.Category__c;
        update VendorPN_selected; 
            //find existing price book entry for line item insert        
        pbe=[Select p.Product2Id, 
                    p.Pricebook2Id, 
                    p.Name,
                    p.UnitPrice, 
                    p.useStandardPrice,
                    p.IsActive,
                    p.CurrencyIsoCode,
                    p.Id 
                 From PricebookEntry p 
                 where p.Pricebook2Id=:pricebookId 
                   and p.Product2Id=:VendorPN_selected.Id 
                   and p.IsDeleted=false
                   and p.IsActive=true 
                   LIMIT 1];
        
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.INFO,
                'Existing Vendor is used (updated) succesfuly, you can close this window now.');
            ApexPages.addMessage(msg);
        } else {
            // Add new product to Product2
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.INFO,
               'Product is succesfuly generated, you can close this window now. ProductCOde='+product.ProductCode);
            ApexPages.addMessage(msg);
            insert product;
            //update counter on Vendor account
            Integer vendorCounter = 0;
            try // added by Raf to handle case where counter has not been initialized
            {
                vendorCounter=integer.valueOf(vendorAccount.Vendor_Counter__c) + 1;
            }
            catch (NullPointerException ex) {
            // keep initialized value
            }
            
            vendorAccount.Vendor_Counter__c=vendorCounter;
            update vendorAccount;
            
            //insert product price item
            pbe.Product2Id= product.Id;
            try { 
           
                try { 
                    pbe.CurrencyIsoCode = quo.CurrencyIsoCode; 
                } catch (System.NullPointerException ex) {
                    pbe.CurrencyIsoCode = 'CAD';
                    msg = new ApexPages.Message(ApexPages.Severity.ERROR,
                        'Could not determine Opportunity Currency adding Product List Price in Canadian Dollars.');
                    ApexPages.addMessage(msg);
                }
           
                insert pbe;
                
            }catch (System.QueryException ex){
                msg = new ApexPages.Message(ApexPages.Severity.ERROR,
                    'Pricebook Could not be located, Part could not be added, contact Admin');
                ApexPages.addMessage(msg);
            }
        }
        //insert quote line item
        if (addProductToOpp && quantity > 0) {  // originally, removed unitPrice condition. Raf (addProductToOpp && quantity > 0 && unitPrice > 0)
            insertPbetoOpp(pbe.id);
        }

  }
  
      

}//end of class