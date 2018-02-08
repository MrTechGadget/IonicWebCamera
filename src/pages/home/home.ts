import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url:String;
  pic:any;

  constructor(platform: Platform, public navCtrl: NavController, private httpd: Httpd, private camera: Camera) {
    platform.ready().then(() => {
      this.startWebServer()
    });
  }
  ionicViewDidLoad() {
    
  }

  startWebServer() {
    let options: HttpdOptions = {
      www_root: 'httpd_root', // relative path to app's www directory
      port: 8080,
      localhost_only: false
    };

    this.httpd.startServer(options).subscribe((data) => {
      console.log('Server is live');
      this.url = data;
      let pic = this.takePicture();
      return pic;
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
     return base64Image
    }, (err) => {
     // Handle error
    });
  }

}
