import { Component, OnInit, ViewChild } from '@angular/core';
import { } from "@types/googlemaps";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('gmap')
  gmapElement: any;
  map: google.maps.Map;
  filiais = [
    ['Araçariguama -  SP', -23.4384723, -47.0883464],
    ['Recife -  PE', -8.0751978, -34.9677578],
    ['Rio de Janeiro -  RJ', -22.9056315, -43.7462287],
    ['Sapucaia do Sul -  RS', -29.8170698, -51.172937],
    ['Cotia -  SP', -23.5984011, -46.8818553],
    ['Divinópolis -  MG', -20.1518927, -44.8780551],
    ['Ouro Branco -  MG', -20.5420869, -43.742677],
    ['Guarulhos -  SP', -23.471894, -46.4749705]
  ];

  constructor() { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(-23.4384723, -47.0883464),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.setMarker(this.map);
  }

  setMarker(map) {
    for (let i = 0; i < this.filiais.length; i++) {
      const filial = this.filiais[i];
      const marker = new google.maps.Marker({
        position: { lat: +filial[1], lng: +filial[2] },
        map: map,
        title: filial[0].toString(),
      });
    }

  }
}
