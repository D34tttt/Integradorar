import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  mapbox = (mapboxgl as typeof mapboxgl);
  map:mapboxgl.Map | undefined;
  style = 'mapbox://styles/errekfjj/cl245uzew000e14nuzxiy6f7k';
  
  // Coordenadas de la localización donde queremos centrar el mapa
  lat =18;
  lng = -99;
  zoom = 17;
  constructor() {
    // Asignamos el token desde las variables de entorno
  
    
  }
  
  buildMap(lat:number, lng:number) {
    this.lat =lat;
    this.lng =lng;

    this.mapbox.accessToken = environment.mapBoxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    
    }
    lait(){
      return this.lat;
    }
    lonng(){
      return this.lng;
    }
    g(lo:number,la:number){
      this.mapbox.accessToken = environment.mapBoxToken;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 18,
          center: [lo,la ]
        });
      var markerl = new mapboxgl.Marker().setLngLat([lo,la]).addTo(this.map);
      this.map.addControl(new mapboxgl.NavigationControl());
    }
    getPosition(): Promise<any> {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resp => {
                  resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
                  
              },
              err => {
                  reject(err);
            });
      });
  }
  select(lat:number, lng:number){
    this.lat =lat;
    this.lng =lng;

    this.mapbox.accessToken = environment.mapBoxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    const marker = new mapboxgl.Marker({
      'color': '#314ccd'
      });
      this.map.on('click', (event) => {
      // Use the returned LngLat object to set the marker location
      // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
      marker.setLngLat(event.lngLat).addTo(this.map);
       
      this.lng = event.lngLat.lng;
      this.lat = event.lngLat.lat;

      getElevation(this.lng,this.lat);
      });
       
      async function getElevation(itel:number,item:number) {
      // Construct the API request
      const query = await fetch(
      'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/'+itel+','+ item+'.json?layers=contour&limit=50&access_token=${mapboxgl.accessToken}',
      { method: 'GET' }
      );
      if (query.status !== 200) return;
      const data = await query.json();
      // Display the longitude and latitude values
      
      // Get all the returned features
      const allFeatures = data.features;
      // For each returned feature, add elevation data to the elevations array
      const elevations = allFeatures.map((feature) => feature.properties.ele);
      // In the elevations array, find the largest value
      const highestElevation = Math.max(...elevations);
      // Display the largest elevation value
      
      }
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
