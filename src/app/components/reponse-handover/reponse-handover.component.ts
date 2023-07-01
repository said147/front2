import { Component, OnInit } from '@angular/core';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { SharedService } from 'src/app/SharedService';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reponse-handover',
  templateUrl: './reponse-handover.component.html',
  styleUrls: ['./reponse-handover.component.css']
})
export class ReponseHandoverComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
    id?: any;
    prenom?: any;
    departement?: any;
    demandes:any;
    demande:any;
    btnDisabled:boolean = false;
    p:number=1;
    itemPerPage:number=5;
    totaldemande:any;
    status:string="";
    term:string="";
    currentPage:number=0;
    size:number=8;
    content:any;
    a:any;
    pages:Array<number> | undefined;
  constructor(private service: HelpdeskserviceService,private sharedService: SharedService,private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    

      

      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      this.departement=user.departement;
      
      
    }
    this.service.repTiquete(this.id).subscribe(
      response => {
        this.demandes= response;
        this.demande=this.demandes.sort(function(a: { id_demande: any; },b: { id_demande: any; }){

          return b.id_demande-a.id_demande;
        })
       console.log( this.demande)
      
     
      
      
      
      
      }
      
      );
    console.log(this.id)
    
  }
  filterD(){
    this.demandes=this.demandes.sort(function(a: { id_demande: any; },b: { id_demande: any; }){

      return b.id_demande=a.id_demande;
    })
  }
  Ondeleted( id_demande:any){
   
    
     
      this.service.deletet(id_demande).subscribe(
        response => {
         
         console.log( "said")
      
        
        
        
        }
        
        );
    
   
  }
  doSearch() {
    if(this.status==""){
      this.ngOnInit();
    }

 else{
  this.service.listProductss(this.status,this.currentPage,this.size).subscribe(
    response => {
    this.demandes= Object.values(response);
    this.pages=new Array(this.demandes.totalPages);
    
    this.demandes.push( response);
    console.log(this.demandes);
   }
   
   );
 }
  }
  chercher(){
this.doSearch();
  }

  cancal(){
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
    this.router.navigateByUrl('/reponse-handover');
  }
}

