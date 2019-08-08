import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
 
  userEmail: string;
 
  constructor(
    private router : Router,
     public menuCtrl: MenuController,
    private authService: AuthenticateService,
    public alertController: AlertController
  ) {}
 
  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      //this.navCtrl.navigateBack('');
      this.router.navigate(['/login']);

    }
  }
 
async thanksMsg(){
  const alert = await this.alertController.create({
    header: 'Thank You',
    subHeader: 'For Using XpServ',
    message: 'We will get in touch with you soon...',
    buttons: ['OKAY!'],
    
  });

  await alert.present();
}
/*openMenu(){
  document.querySelector('ion-menu-controller')
        .open();
}*/

  /*logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      //this.navCtrl.navigateBack('');
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.log(error);
    })
  }*/
}