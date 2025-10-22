Fotos y GPS

1.- Primero creamos el proyecto:
ionic start miApp tabs --type=angular

2.- Luego instalamos los plugins necesarios
npm install @capacitor/camera @capacitor/geolocation @capacitor/filesystem
<img width="886" height="172" alt="image" src="https://github.com/user-attachments/assets/07bd1763-a037-4e41-85a8-164c76b95092" />


3.- Luego procedemos a trabajar con el código combinando los proyectos de galería y el de geolocalización
<img width="1035" height="738" alt="image" src="https://github.com/user-attachments/assets/0d4308b1-778c-4278-ac38-4a00a75c2000" />

4.- Una vez que ya tenemos el código listo procedemos a instalar lo que haga falta y a inicializar android con los siguientes comandos:
npm install @capacitor/assets
ionic build
npx cap sync
npx cap copy
npx cap sync android
ionic capacitor open android

5.- Ahora probamos la app en el teléfono verificando que todo funcione

La app pide permisos de cámara  y de poder utilizar el gps
![Screenshot_20251021_233103_Permission controller](https://github.com/user-attachments/assets/55b78235-a6ca-42a3-abd5-c265f29d7ffd)
![Screenshot_20251021_233138_Permission controller](https://github.com/user-attachments/assets/df553199-e546-43b2-93bf-388168de2935)

Entonces ya podemos tomar fotos y se guarda la ubicación en un txt 
![Screenshot_20251021_233151_FotoGPS](https://github.com/user-attachments/assets/0e1c478a-0792-44c5-8618-cf0b660630fa)
![Screenshot_20251021_234941_FotoGPS](https://github.com/user-attachments/assets/b8c02aa6-0149-4d14-9a99-64badabc8cbf)
![Screenshot_20251021_234954_Maps](https://github.com/user-attachments/assets/31a50171-63f8-495c-b649-3a460c97fdc8)
<img width="693" height="318" alt="image" src="https://github.com/user-attachments/assets/b4cafb58-952d-4c60-b403-466cd312256a" />



