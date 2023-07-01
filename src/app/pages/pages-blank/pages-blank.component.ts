import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { SignaturePad } from 'angular2-signaturepad';
@Component({
  selector: 'app-pages-blank',
  templateUrl: './pages-blank.component.html',
  styleUrls: ['./pages-blank.component.css']
})
export class PagesBlankComponent implements OnInit {
User:any;
roles=[];
signatureImg: string | undefined;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };
  constructor(private service: HelpdeskserviceService, private router: Router) {
   
   }

  ngOnInit(): void {
    this.service. listUser().subscribe(
      response => {
        
       this.User= response;
      console.log(this.User)

      });
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }
}
