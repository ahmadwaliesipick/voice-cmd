import { NgModule } from '@angular/core';
import { BrowserModule,HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { DirectivesModule } from 'src/directives/directives.module';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { IonicGestureConfig } from '../utils/IonicGestureConfig'
@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModul ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
