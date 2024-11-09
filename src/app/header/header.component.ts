import { Component,inject, OnInit, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService } from  '../service/rest.service'; 
import { StorageService } from  '../service/storage.service'; 

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
	
    apicall = inject(RestService); 
	storage = inject(StorageService); 
	route	= inject(Router);
	
	 
	validtoken:boolean;
			
	constructor(){ 
		this.validtoken=false; 
	}
	
	ngOnInit(){		 
		if(this.storage.getItem("token"))	{
			this.validtoken = true;
		}
		
		this.apicall.currentlogin.subscribe(validtoken => this.validtoken=validtoken);
	}

	logout(){
		this.storage.setItem("token",'');
		this.validtoken =false;
		this.route.navigate(['']);  
	}
	
	ngOnDestroy() {
		 
	}
}
