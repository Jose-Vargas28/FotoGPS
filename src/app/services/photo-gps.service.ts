import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo as CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';

export interface PhotoGPS {
  filepath: string;
  webviewPath?: string;
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoGpsService {
  public photos: PhotoGPS[] = [];

  constructor() {}

  // Método principal para tomar foto y guardar ubicación + registro
  async addPhotoWithLocation() {
    // 1 Tomar la foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
    });

    // 2 Obtener la ubicación actual
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;


    // 3 Guardar la imagen
    const savedImage = await this.savePicture(capturedPhoto);

    const newPhoto: PhotoGPS = {
      filepath: savedImage.filepath,
      webviewPath: savedImage.webviewPath,
      latitude: lat,
      longitude: lon,
      mapsUrl
    };

    this.photos.unshift(newPhoto);

    // 4️⃣ Guardar registro en archivo de texto en Documents
    const log = 
`Foto: ${newPhoto.filepath}
Latitud: ${lat}
Longitud: ${lon}
Link: ${mapsUrl}
-------------------------
`;

    await this.appendToFile('foto_gps.txt', log);
  }

  private async savePicture(photo: CameraPhoto) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = await this.convertBlobToBase64(blob) as string;

    const fileName = `${Date.now()}.jpeg`;
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents // Guardar también en Documents para Android
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  private async appendToFile(filename: string, content: string) {
    try {
      // Leer archivo existente
      const existing = await Filesystem.readFile({
        path: filename,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      // Escribir contenido agregado
      await Filesystem.writeFile({
        path: filename,
        data: existing.data + content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
    } catch {
      // Si no existe, crear nuevo
      await Filesystem.writeFile({
        path: filename,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
    }
  }
}
