import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { EpisodesSectionComponent } from './components/episodes-section/episodes-section.component';
import { CulturesSectionComponent } from './components/cultures-section/cultures-section.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { EpisodeModalComponent } from './components/episode-modal/episode-modal.component';
import { MissionFooterComponent } from './components/mission-footer/mission-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    EpisodeCardComponent,
    EpisodesSectionComponent,
    CulturesSectionComponent,
    AuthModalComponent,
    EpisodeModalComponent,
    MissionFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}