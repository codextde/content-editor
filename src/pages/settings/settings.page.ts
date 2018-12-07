import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public api: Api,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.goBack();
  }

  logout() {
    this.navCtrl.navigateRoot('login');
  }

}
