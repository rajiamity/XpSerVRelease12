import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, ModalController, MenuController, ActionSheetController, PopoverController, ToastController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticateService } from './services/authentication.service';
//import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress = 0;
    timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticateService,

    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,    
    private toastCtrl: ToastController
    
    
  ) {
    this.initializeApp();
    // Initialize BackButton Eevent.
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

logout(){
  
  this.authService.logoutUser()
  .then(res => {
    console.log(res);
    //this.navCtrl.navigateBack('');
    this.router.navigate(['/login']);

  })
  .catch(error => {
    console.log(error);
  })
}

// active hardware back button
async backButtonEvent() {
  this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
          const element = await this.actionSheetCtrl.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
      }

      // close popover
      try {
          const element = await this.popoverCtrl.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
      }

      // close modal
      try {
          const element = await this.modalCtrl.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
          console.log(error);

      }

      // close side menua
      try {
          const element = await this.menu.getOpen();
          if (element !== null) {
              this.menu.close();
              return;

          }

      } catch (error) {      }

      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
              outlet.pop();

          } else if (this.router.url === '/home') {
              if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                  // this.platform.exitApp(); // Exit from app
                  navigator['app'].exitApp(); // work for ionic 4

              } else {
                 const toast= await this.toastCtrl.create({     
                     message: 'Press back again to exit App',
                     duration: 2000,
                     position: 'middle'});toast.present();
                     // .subscribe(toast => {
                          // console.log(JSON.stringify(toast));
                      //});
                  this.lastTimeBackPress = new Date().getTime();
              }
          }
      });
  });



}
  
}