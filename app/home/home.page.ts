
import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {  NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isListening: boolean = false;
  matches: Array<String>;

  constructor(public navCtrl: NavController, public speech: SpeechRecognition, private zone: NgZone, private androidPermissions: AndroidPermissions) {
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
        if(matches){
          var str = 'youtube'
          var foundStr =  matches[0].toLowerCase();
          console.log(foundStr)
         // string.indexOf(foundStr) !== -1
          var matchesRecords = foundStr.includes( str );
          console.log('matchesRecords')
          console.log(matchesRecords)
          if(matchesRecords ){
            window.open('https://youtube.com', '_system');
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
