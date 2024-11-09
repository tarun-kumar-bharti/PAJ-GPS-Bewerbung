import { Component,inject } from '@angular/core';


import { CommonModule } from '@angular/common';  
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService } from  '../service/rest.service'; 
import { StorageService } from  '../service/storage.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
	
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
	}

	logout(){
		this.storage.setItem("token",'');
		this.validtoken =false;
		this.route.navigate(['']);  
	}
}
