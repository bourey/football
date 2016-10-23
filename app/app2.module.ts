// ng1/2 hybrid
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, UrlHandlingStrategy } from '@angular/router';
import { UpgradeAdapter } from '@angular/upgrade';
import { MdCoreModule } from '@angular2-material/core';
import { footballApp } from './app.module';
import { TeamsModule } from './team2/team.module';
import { LeagueService2Module } from './common/league/league.service';
import { TeamService2Module } from './common/team/team.service';
import { Ng2RouterRoot, createAngular1RootModule} from './upgrade_utils';
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


const adapter = new UpgradeAdapter(AppModule);
LeagueService2Module.setAdapter(adapter);
TeamService2Module.setAdapter(adapter);

let rootModule = createAngular1RootModule(['ngRoute', footballApp.name]);

export function bootstrap(el: Element) {
  const ref = adapter.bootstrap(el, [rootModule.name]);

  // this is required because of a bug in NgUpgrade
  setTimeout(() => {
    ref.ng2Injector.get(Router).initialNavigation();
  }, 0);
}
