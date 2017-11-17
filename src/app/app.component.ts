import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from './providers/dataelement.service';
import {OrganisationUnitService} from './providers/organisation-unit.service';
import {User} from './providers/user';
import {dhis2Instance} from './dhis2Instance';


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



   constructor(private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService) {

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

     this.gp.address = "";
     this.gp.name = "Gauteng";
     this.gp.username = "";
     this.gp.password = "";


     this.ndd.address = "";
     this.ndd.name = "NDD";
     this.ndd.username = "";
     this.ndd.password = "";

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

		const provincesurl = 'https://fhwm.dhis.dhmis.org/staging/api/organisationUnits?fields=:all&filter=level:eq:2'

this.dataelemetservice.getDataelementsService(dataelementUrl)
.then(result =>{ this.dataElements =result.dataElements

    for (let dataelement of this.dataElements)
    {
      console.log("list of dataelements "+ dataelement.name )

    }




  })
.catch(error => console.log(error));

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



  onCompare(addressInstance1: string, addressInstance2: string, metadataType: string) {

alert(addressInstance1);


    this.dhis2hostname1url = addressInstance1+metadataType;
    this.dhis2hostname2url = addressInstance2+metadataType;



  }



}
