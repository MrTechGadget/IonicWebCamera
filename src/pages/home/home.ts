import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private httpd: Httpd, private camera: Camera) {

  }

  startWebServer() {
    let options: HttpdOptions = {
      www_root: 'httpd_root', // relative path to app's www directory
      port: 8080,
      localhost_only: false
    };

    this.httpd.startServer(options).subscribe((data) => {
      console.log('Server is live');
    });

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
