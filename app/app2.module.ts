// ng1/2 hybrid
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { MdCoreModule } from '@angular2-material/core';
import { TeamsModule } from './team2/team.module';
import { LeagueService2Module } from './common/league/league.service';
import { Ng2RouterRoot } from './upgrade_utils';
import {UpgradeModule} from '@angular/upgrade';
import { TeamService } from './common/team/team.service';

// This URL handling strategy is custom and application-specific.
// Using it we can tell the Angular 2 router to handle only specific URLs.
class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: any) { return url.toString().startsWith('/teams'); }
  extract(url: any) { return url; }
  merge(url: any, whole: any) { return url; }
}

/**
 * Root module for angular 2 for the app. 
 */
@NgModule({
  imports: [TeamsModule, LeagueService2Module, BrowserModule, MdCoreModule,
    RouterModule.forRoot([], {useHash: true}), UpgradeModule],
  declarations: [Ng2RouterRoot],
  entryComponents: [Ng2RouterRoot],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy },
    {
      provide: TeamService,
      useFactory: (i: ng.auto.IInjectorService) => i.get('teamService'),
      deps: ['$injector']
    }
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
