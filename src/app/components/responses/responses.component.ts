import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  demandeTelework:any;
  currentPage:number=0;
  size:number=8;
  content:any;
  p:number=1;
  demandeDepart:any;
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.listDemandeTelework().subscribe(
      response => {
      this.demandeTelework= response;
    
  
      console.log(this.demandeTelework);
     }
     
     );
     this.service.listDemandeDepart().subscribe(
      response => {
      this.demandeDepart= response;
    
  
      console.log(this.demandeDepart);
     }
     
     );
     
  }

}
