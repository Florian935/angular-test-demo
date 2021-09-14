import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './component/banner/banner.component';
import { DashboardHeroComponent } from './component/dashboard-hero/dashboard-hero.component';
import { LightSwitchComponent } from './component/light-switch/light-switch.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AboutComponent } from './component/about/about.component';
import { TwainQuoteComponent } from './component/twain-quote/twain-quote.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        LightSwitchComponent,
        DashboardHeroComponent,
        WelcomeComponent,
        BannerComponent,
        AboutComponent,
        TwainQuoteComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
