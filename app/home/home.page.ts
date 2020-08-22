
import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {  NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isListening: boolean = false;
  matches: Array<String>;
  commandsYouTube:string = 'youtube'
  commandsGallery:string = 'gallery'
  commandsMessage:string = 'message'
  commandsDial:string = 'dialler'
  commandWhatsapp:string = 'whatsapp'
  commandFacebook:string = 'facebook'
  commandSetting:string = 'setting'

  constructor(public navCtrl: NavController, public speech: SpeechRecognition, private zone: NgZone, private androidPermissions: AndroidPermissions,private iab: InAppBrowser,private appAvailability: AppAvailability) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  pressed(){
    console.log('pressed')
    this.matches = []
    let _this = this;
    let options ={
      showPopup :false,
      prompt :"Hi"
    }
    this.speech.startListening(options)
    .subscribe(matches => {
      console.log('matches')
      console.log(matches)
      _this.zone.run(() => {
        _this.matches = matches;
        console.log('_this.matches')
        console.log(_this.matches)
        if(matches){
          var foundStr =  matches[0].toLowerCase();
          var matchesCommandsYouTube = foundStr.includes( this.commandsYouTube );
          if(matchesCommandsYouTube ){
            window.open('https://youtube.com', '_system');
          }


          var matchesCommandsMessage = foundStr.includes( this.commandsMessage );
            if(matchesCommandsMessage ){
                window.open("sms://", '_system');
            }

            var matchesCommandsGallery = foundStr.includes( this.commandsGallery );
            console.log(matchesCommandsGallery)
            if(matchesCommandsGallery ){
              console.log(matchesCommandsGallery)
              console.log('matchesCommandsGallery')
                window.open("android-app://com.google.android.apps.photos", '_system');

            }

            var matchesCommandsDial = foundStr.includes( this.commandsDial );
            if(matchesCommandsDial ){
                window.open('tel:', '_system');
            }

            var matchesCommandWhatsapp = foundStr.includes( this.commandWhatsapp );
            if(matchesCommandWhatsapp ){
                window.open('android-app://com.whatsapp', '_system');
            }

          var matchesCommandFaceBook = foundStr.includes( this.commandFacebook );
          if(matchesCommandFaceBook ){
            window.open('android-app://com.facebook.katana', '_system');
          }

          var matchesCommandSetting = foundStr.includes( this.commandSetting );
          if(matchesCommandSetting ){
            window.open('android-app://com.android.settings', '_system');
          }

        }
      })
    }, error => console.error(error));
  }


  active(){
    console.log('active')
  }

  released() {
    console.log('released')
    //this.speech.stopListening();
  }
  toggleListenMode():void {
    this.isListening = this.isListening ? false : true;
    console.log('listening mode is now : ' + this.isListening);
  }

}
