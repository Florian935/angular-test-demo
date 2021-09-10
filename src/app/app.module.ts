import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LightSwitchComponent } from './component/light-switch/light-switch.component';
import { DashboardHeroComponent } from './component/dashboard-hero/dashboard-hero.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

@NgModule({
    declarations: [AppComponent, LightSwitchComponent, DashboardHeroComponent, WelcomeComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
