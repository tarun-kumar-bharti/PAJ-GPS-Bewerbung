import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { BehaviorSubject, Observable, Subject  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestService {
	
  apiUrl:string = environment.resapiurl;
  http = inject(HttpClient);  
  constructor(){}
 
	public getLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
	currentlogin = this.getLogin.asObservable();
	public setLogin(validtoken: boolean) {	  
		this.getLogin.next(validtoken)
	}
	
	public get(url: string, data: any, options?: any) { 
		
		var httpOptions = new HttpHeaders();
		
		httpOptions = httpOptions.append('Content-Type', 'application/json');			
		httpOptions = httpOptions.append('Access-Control-Allow-Origin', '*');

		if(data){
			if(data.hasOwnProperty('token')){		 
				httpOptions = httpOptions.append('Authorization', 'Bearer '+data.token);			
				delete data.token;
			}
		}	
		  
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl+url, {headers: httpOptions})
			.subscribe(res => {			   
			  resolve(res);
			}, (err) => {			   
			  reject(err);
			});
		});  
	} 
	
	
	
	public post(url: string, data: any, options?: any) { 	 

		var httpOptions = new HttpHeaders();
		
		httpOptions = httpOptions.append('Content-Type', 'application/json');			
		httpOptions = httpOptions.append('Access-Control-Allow-Origin', '*');			
		 
 	
		if(data){
			if(data.hasOwnProperty('token')){		 
				httpOptions = httpOptions.append('Authorization', 'Bearer '+data.token);			
				delete data.token;
			}
		}		
		 
		return new Promise((resolve, reject) => {
		
		  this.http.post(this.apiUrl+url,data,{headers: httpOptions})
			.subscribe(res => { 
			  resolve(res);
			}, (err) => { 
			  reject(err);
			});
		});		 
	}
	
}
