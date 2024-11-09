
import { Component , OnInit, AfterViewInit } from '@angular/core'; 
//import * as L from 'leaflet';
declare var L:any;
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit  {
	map:any;
	//declare var L:any;

	private initMap() {
		
		this.map = L.map('map', {
		  center: [ 39.8282, -98.5795 ],
		  zoom: 3
		});

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  maxZoom: 18,
		  minZoom: 3,
		  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		tiles.addTo(this.map);

		const marker = L.marker([39.8282, -98.5795], {  });
		marker.addTo(this.map); 
	}

	constructor() {}

	ngAfterViewInit() {
		this.initMap();
	}
}