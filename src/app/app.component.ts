import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from './providers/dataelement.service';
import {OrganisationUnitService} from './providers/organisation-unit.service';
import {User} from './providers/user';
import {dhis2Instance} from './dhis2Instance';

import {Metadataservice} from './providers/MetadataService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private instances:dhis2Instance[];
  private gp: dhis2Instance;
  private mp: dhis2Instance;
  private fs: dhis2Instance;
  private lp: dhis2Instance;
  private wc: dhis2Instance;
  private kzn: dhis2Instance;
  private nw: dhis2Instance;
  private nc: dhis2Instance;
  private ec: dhis2Instance;
  private ndd: dhis2Instance;


  private provinces: string[];
  private dataElements: any[]
  private indicators: any[]
  private indicatorGroups: any[]
  private datelementGroups: any[]
  private Category: any[]
  private Dataset: any[]
  private Program: any[]
  private Validations: any[]

  dhis2hostname1url: string;
  dhis2hostname2url: string;


  dataelemtsurl: string ='/api/dataElements.json?'
  datelementGroupsurl: string = '/api/dataElementGroups.json?'
  indicatorsurl: string = '/api/indicators'
  indicatorGroupsurl: string = '/api/indicatorGroups'
  Categoryurl: string = '/api/categories'
  Dataseturl: string = '/api/dataSets'
  Programurl: string = '/api/programs'
  Validationsurl: string = '/api/validationRules'



  metadataTypes: string[];


  private organisationUnits : any[] = [];

	private organisationUnitsprovinstance1: any[] = [] ;
	private organisationUnitsprovinstance2: any[] = [] ;
	private provinstance1;
	private provinstance2;

  count: number=0;


  private   addressInstance1: string='';
  private   addressInstance2: string='';
  private metadataType: string ='';

  private metadataReturned1 : any;
  private metadataReturned2 : any;

  private usernameInstance1: string;
  private passwordInstance1: string;
  private address1: string;

  private usernameInstance2: string;
  private passwordInstance2: string;
  private address2: string;
private selectedMetadataType: string;

  searchTerm: string="";


  Selectedinstance1: string;
  SelectedInstance2: string;


   constructor(private metadataservice: Metadataservice, private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService) {

   this.metadataReturned1  = [];
   this.metadataReturned2  = [];


     this.metadataTypes =  [];
     this.metadataTypes.push("dataElements");
     this.metadataTypes.push("dataElementGroups");
     this.metadataTypes.push("indicators");
     this.metadataTypes.push("indicatorGroups");
     this.metadataTypes.push("dataSets");
     this.metadataTypes.push("programs");
     this.metadataTypes.push("validationRules");

     this.instances= [];
     this.provinces=[];
     this.indicators =[];
     this.indicatorGroups =[];
     this.datelementGroups = [];
     this.Category = [];
     this.Dataset =[];
     this.Program =[];
     this.Validations =[];



     this.gp = new dhis2Instance();
     this.ndd = new dhis2Instance();
     this.mp = new dhis2Instance();
     this.nw = new dhis2Instance();
     this.wc = new dhis2Instance();
     this.kzn = new dhis2Instance();
     this.ec = new dhis2Instance();
     this.lp = new dhis2Instance();
     this.fs = new dhis2Instance();
     this.nc = new dhis2Instance();

     this.gp.address = "https://elogbook.dhis.dhmis.org/staging/api/";
     this.gp.name = "Gauteng";
     this.gp.username = "admin";
     this.gp.password = "Terminal17";


     this.ndd.address = "https://fhwm.dhis.dhmis.org/staging/api/";
     this.ndd.name = "NDD";
     this.ndd.username = "Comfort_Mankga";
     this.ndd.password = "Mathematics315@";

     this.mp.address = "";
     this.mp.name = "Mpumalanga";
     this.mp.username = "";
     this.mp.password = "";

     this.nw.address = "";
     this.nw.name = "North West";
     this.nw.username = "";
     this.nw.password = "";

     this.kzn.address = "";
     this.kzn.name = "Kwazulu-Natal";
     this.kzn.username = "";
     this.kzn.password = "";

     this.ec.address = "";
     this.ec.name = "Eastern Cape";
     this.ec.username = "";
     this.ec.password = "";

     this.lp.address = "";
     this.lp.name = "Limpopo";
     this.lp.username = "";
     this.lp.password = "";

     this.fs.address = "";
     this.fs.name = "Free State";
     this.fs.username = "";
     this.fs.password = "";

     this.nc.address = "";
     this.nc.name = "Northern Cape";
     this.nc.username = "";
     this.nc.password = "";

     this.wc.address = "";
     this.wc.name = "Western Cape";
     this.wc.username = "";
     this.wc.password = "";

     this.instances[0]=this.gp;
     this.instances[1]=this.ndd;
     this.instances[2]=this.mp;
     this.instances[3]=this.kzn;
     this.instances[4]=this.fs;
     this.instances[5]=this.ec;
     this.instances[6]=this.nw;
     this.instances[7]=this.lp;
     this.instances[8]=this.wc;
     this.instances[9]=this.nc;

     this.instances.sort();


   }

  ngOnInit() {

    const dataelementUrl='https://fhwm.dhis.dhmis.org/staging/api/dataElements'+'.json?fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'

		const provincesurl = 'https://fhwm.dhis.dhmis.org/staging/api/organisationUnits?fields=:all&filter=level:eq:2';
   ;





/*
this.dataelemetservice.getDataelementsService(dataelementUrl)
.then(result =>{ this.dataElements =result.dataElements

    for (let dataelement of this.dataElements)
    {
      console.log("list of dataelements "+ dataelement.name )

    }
  })
.catch(error => console.log(error));


    */

this.organisationUnitService.getOrganisationUnits(provincesurl)
.then(result =>{ this.organisationUnits =result.organisationUnits

    this.organisationUnitsprovinstance1 = this.organisationUnits;
    this.organisationUnitsprovinstance2 = this.organisationUnits;

    for (let inst of this.instances)
    {
      this.provinces.push(inst.name);
      console.log("facility name :  "+ this.provinces[this.count] )
      this.count = this.count+1;   }

  })
.catch(error => console.log(error));
  }
  onCompare($event) {

    if ( this.addressInstance1=="" || this.addressInstance2=="" || this.metadataType ==""){
      alert("select an instance and metadataType before comparing")
    }
    else{
      this.dhis2hostname1url = this.addressInstance1+this.metadataType+".json?fields=*";
      this.dhis2hostname2url = this.addressInstance2+this.metadataType+".json?fields=*";

      console.log(this.dhis2hostname1url);
      console.log(this.dhis2hostname2url);

      console.log("username 1: "+this.usernameInstance1 + "password 1 :"+this.passwordInstance1);
      console.log("username 2: "+this.usernameInstance1 + "password 2 :"+this.passwordInstance2);


      this.metadataservice.getMetadata(this.dhis2hostname1url,this.usernameInstance1, this.passwordInstance1)
        .then(result =>{ this.metadataReturned1 =result
          console.log(result)
          this.metadataReturned1=[];
          switch(this.selectedMetadataType){
            case "dataElements":{
             this.metadataReturned1 = result.dataElements
            break;
            }
            case "dataElementGroups":{
              this.metadataReturned1 = result.dataElementGroups
             break;}
            case "indicators":{
              this.metadataReturned1 = result.indicators
              break;
            }
            case "indicatorGroups":{
              this.metadataReturned1 = result.indicatorGroups
              break;
            }
            case "dataSets":{
              this.metadataReturned1 = result.dataSets
              break;

            }
            case "programs":{
              this.metadataReturned1 = result.programs
              break;
            }
            case "validationRules":{
              this.metadataReturned1 = result.validationRules
              break;
            }

            default: {}
          }
        })
        .catch(error => console.log(error));


      this.metadataservice.getMetadata(this.dhis2hostname2url,this.usernameInstance2,this.passwordInstance2)
        .then(result =>{ this.metadataReturned2 =result
          console.log(result);
          this.metadataReturned2=[];
          switch(this.selectedMetadataType){
            case "dataElements":{
              this.metadataReturned2 = result.dataElements
              break;
            }
            case "dataElementGroups":{
              this.metadataReturned2 = result.dataElementGroups
              break;}
            case "indicators":{
              this.metadataReturned2 = result.indicators
              break;
            }
            case "indicatorGroups":{
              this.metadataReturned2 = result.indicatorGroups
              break;
            }
            case "dataSets":{
              this.metadataReturned2 = result.dataSets
              break;

            }
            case "programs":{
              this.metadataReturned2 = result.programs
              break;
            }
            case "validationRules":{
              this.metadataReturned2 = result.validationRules
              break;
            }

            default: {}
          }

        })
        .catch(error => console.log(error)); }
  }

  onselection($event) {
     if ($event.target.name == "InstanceName1" )
    {
      let nameaddressInstance1= $event.target.value;

      this.Selectedinstance1 = $event.target.value;
      //this.addressInstance1= $event.target.value;
      console.log("instance 1 :"+ nameaddressInstance1);

  switch(nameaddressInstance1) {
          case "Gauteng": {
            this.usernameInstance1 = "admin";
            this.passwordInstance1 = "Terminal17";
            this.addressInstance1 = "https://elogbook.dhis.dhmis.org/staging/api/";
            break;
          }
          case "Mpumalanga": {
            this.usernameInstance1 = "admin";
            this.passwordInstance1 = "district";
            this.addressInstance1 ="https://play.dhis2.org/demo/api/";
            break;
          }

          case "Limpopo": {
            this.usernameInstance1 = "";
            this.passwordInstance1 = "";
            this.addressInstance1 ="";
            break;
          }

          case "Free State": {
            this.usernameInstance1 = "";
            this.passwordInstance1 = "";
            this.addressInstance1 ="";
            break;
          }

          case "North West": {
            this.usernameInstance1 = "";
            this.passwordInstance1 ="";
            this.addressInstance1 ="";
            break;
          }

          case "Western Cape": {
            this.usernameInstance1 = "";
            this.passwordInstance1 = "";
            this.addressInstance2 ="";
            break;
          }

          case "Northen Cape": {
            this.usernameInstance1 = "";
            this.passwordInstance1 = "";
            this.addressInstance1 ="";
            break;
          }

          case "Eastern Cape": {
            this.usernameInstance1 = "";
            this.passwordInstance1 = "";
            this.addressInstance1 ="";
            break;
          }
            case "NDD": {
              this.usernameInstance1 = "Comfort_Mankga"
              this.passwordInstance1 = "Mathematics315@"
              this.addressInstance1 = "https://fhwm.dhis.dhmis.org/staging/api/";
              console.log("In NDD")
              break;
            }
          default: {
            this.usernameInstance1 = "admin"
            this.passwordInstance1 = "district"
            this.addressInstance1 ="";
            break;
          }
        }
    }

    else if ($event.target.name == "InstanceName2")
    {

      let nameaddressInstance2= $event.target.value;
      this.SelectedInstance2 = $event.target.value;

     // this.addressInstance2= $event.target.value

     console.log("instance 2 :"+ nameaddressInstance2);

      switch(nameaddressInstance2) {
        case "Gauteng": {
          this.usernameInstance2 = "admin";
          this.passwordInstance2 = "Terminal17";
          this.addressInstance2 = "https://elogbook.dhis.dhmis.org/staging/api/";
          break;
        }
        case "Mpumalanga": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          this.addressInstance2 ="";
          break;
        }

        case "Limpopo": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          break;
        }

        case "Free State": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          this.addressInstance2 ="";
          break;
        }

        case "North West": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          this.addressInstance2 ="";
          break;
        }

        case "Western Cape": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          this.addressInstance2 ="";
          break;
        }

        case "Northen Cape": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          this.addressInstance2 ="";
          break;
        }

        case "Eastern Cape": {
          this.usernameInstance2 = "";
          this.passwordInstance2 = "";
          this.addressInstance2 ="";
          break;
        }
        case "NDD": {
          this.usernameInstance2 = "Comfort_Mankga"
          this.passwordInstance2 = "Mathematics315@"
          this.addressInstance2 = "https://fhwm.dhis.dhmis.org/staging/api/";
          console.log("In NDD")
          break;
        }
        default: {
          this.usernameInstance2 = "admin"
          this.passwordInstance2 = "district"
          break;
        }
      }

    }else if ($event.target.name == "metadatatype"){

      this.metadataType= $event.target.value;
       this.selectedMetadataType =  this.metadataType;

      console.log("Metadata  :"+ this.metadataType);


    }
  }




}
