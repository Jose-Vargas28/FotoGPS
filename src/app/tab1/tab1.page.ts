import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { PhotoGpsService } from '../services/photo-gps.service';
import { camera } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,
    IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon,
    NgFor, NgIf
  ],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page {
  camera = camera;

  constructor(public photoGpsService: PhotoGpsService) {}

  async addPhoto() {
    await this.photoGpsService.addPhotoWithLocation();
  }
}
