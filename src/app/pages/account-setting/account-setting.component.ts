import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [],
})
export class AccountSettingComponent implements OnInit {
  constructor(private _settingService: SettingsService) {}

  ngOnInit(): void {
    this._settingService.checkCurrentTheme();
  }

  changeTheme(tema: string) {
    this._settingService.changeTheme(tema);
  }
}
