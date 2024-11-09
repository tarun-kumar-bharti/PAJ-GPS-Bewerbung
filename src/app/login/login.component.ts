
import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService } from  '../service/rest.service'; 
import { StorageService } from  '../service/storage.service'; 

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
	
	apicall = inject(RestService); 
	storage = inject(StorageService); 
	route	= inject(Router); 

	username:string;
	password:string;
	displayerror:string;
	validtoken:boolean;
	constructor(){
		this.username = "testkunde@paj-gps.de";
		this.password = "App123###...";
		this.displayerror="";
		this.validtoken=false;
	}
	
	ngOnInit(){
		if(this.storage.getItem("token")){
			this.validtoken = true;
			this.route.navigate(['dashboard']);  
		}
	}
	
	getUserName(value:string){	  
	  this.username = value;  
	}
	
	getPassword(value:string){	  
	  this.password = value;  
	}
	
	login(){
		let credentials = {
			email: this.username,
			password: this.password
		};
		
		this.apicall.post('login',credentials).then((result:any) => { 
			if(result['success']){ 
				this.storage.setItem('token',result['success']['token']); 
				this.validtoken=true; 
				this.route.navigate(['dashboard']);  
				
				this.apicall.setLogin(this.validtoken);
				
			}				
		},(err) => {
			
			if(err.error.error.passwordError){
				this.displayerror= err.error.error.passwordError;
			}else if(err.error.error.emailError){
				this.displayerror= err.error.error.emailError;
			}
			 
		});		 
	}
	 
}
