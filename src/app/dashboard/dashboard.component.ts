 
import { Component, OnInit, inject } from '@angular/core';
 
import { CommonModule } from '@angular/common';  
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService } from  '../service/rest.service'; 
import { StorageService } from  '../service/storage.service'; 
 

declare var L:any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent{
	
	map:any;
	apicall = inject(RestService); 
	storage = inject(StorageService); 
	route	= inject(Router);
	
	deviceid:any; 
	coordinates:any;
	devicename:any;
	linecoordinate:any;

	constructor(){ 
		
	} 
	 
	initMap(id:any,path:any) {
 
		
		let getlatlng;
		   
		 
		if(id){ 
			if(this.coordinates[this.deviceid]){
				getlatlng = this.coordinates[this.deviceid];  
			}
		}	
		  
		
		if(!this.map){
			this.map = L.map('map').setView([0, 0], 1);
		} 
		if(this.coordinates.length>0){
			  
			const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			  maxZoom: 18,
			  minZoom: 2, 
			  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			});
			tiles.addTo(this.map); 
			
			if(id==true && path==true){  
				let latlngs=[];				
				for (let i in this.linecoordinate) {  
					 var startco=[];
					 startco.push(this.linecoordinate[i].start_lat);
					 startco.push(this.linecoordinate[i].start_lng);
					 
					 var endco=[];
					 endco.push(this.linecoordinate[i].end_lat);
					 endco.push(this.linecoordinate[i].end_lng);
					 
					latlngs.push(startco);
					latlngs.push(endco);  
					
					var polyline = L.polyline(latlngs, {color: 'blue'}, 2).addTo(this.map); 
					this.map.fitBounds(polyline.getBounds());
				}  
				 
			

			}
			 
			for (let index in this.coordinates) {
				 
			    var cname= "";
				this.devicename.some((item:any) => {
					if(item.id==index){
					 cname = item.name;
					}
				});
				
				if(id===true && path===false){
					if(this.coordinates[this.deviceid]){
						this.map.flyTo([getlatlng.lat, getlatlng.lng], 10);
					}
				} 
				
				const marker = L.marker([this.coordinates[index].lat, this.coordinates[index].lng], {  });
				marker.addTo(this.map).bindPopup(cname).openPopup();	
			}
		}  
		
	}

	getDevice(device:number){
		this.deviceid = device; 		 
		this.initMap(true,false);		 
	}
	
	getLinePath(){
		 
	 if(this.storage.getItem("token")){
		
		this.apicall.get('logbook/getAllRoutes/'+this.deviceid,{"token":this.storage.getItem("token")}).then((result:any) => { 
			if(result['data']){ 			 
				console.log(result['data']);
				let getLocArr =  Object.keys(result['data']);				 
				if(getLocArr.length>0){
					let pathco=[];
					for (let dateindex in getLocArr) {	 
						pathco.push({
							"start_lat": result['data'][getLocArr[dateindex]][0].start_lat,
							"start_lng": result['data'][getLocArr[dateindex]][0].start_lng,
							"end_lat": result['data'][getLocArr[dateindex]][0].end_lat,
							"end_lng": result['data'][getLocArr[dateindex]][0].end_lng 
						})						 
					}
					this.linecoordinate = pathco;	
					this.initMap(true,true);		
				}		
			}			
		},(err:any) => {					
					 
		});  
	 } 
	}
	 
 
	ngOnInit(){
		if(this.storage.getItem("token")){
		
			this.apicall.get('device ',{"token":this.storage.getItem("token")}).then((result:any) => { 
							
				if(result['success']){ 
					
					let deviceids = []; 
					let dnamelist=[]; 
					for (let index in result['success']) {						
						dnamelist.push({
								"id":result['success'][index]['id'],
								'name':result['success'][index]['name']  
						});
						
						deviceids.push(result['success'][index]['id']);
					}
					
					this.devicename = dnamelist; 
				 
					 if(deviceids.length>0){	
						this.apicall.post('trackerdata/getalllastpositions',{"token":this.storage.getItem("token"), "deviceIDs":deviceids,  "fromLastPoint": true}).then((result:any) => { 
							
						 
							let qlistarray=[]; 
							if(result['success']){ 
								for (let index in result['success']) {
									qlistarray[result['success'][index]['iddevice']]={
										'lat':result['success'][index]['lat'],
										'lng':result['success'][index]['lng'],
									} 
								}
							} 
						 
							this.coordinates = qlistarray;	
							 
							this.initMap(false,false);

 
						},(err:any) => {
					
					 
						}); 
					}  
				}
				
			},(err:any) => {
				
					
			});

		}else{ 
			this.route.navigate(['']);  
		} 
	}


	
}
