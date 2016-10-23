// ng1/2 hybrid
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { MdCoreModule } from '@angular2-material/core';
import { TeamsModule } from './team2/team.module';
import { LeagueService2Module } from './common/league/league.service';
import { UpgradeModule, downgradeComponent} from '@angular/upgrade';
import { TeamService } from './common/team/team.service';
import { footballApp } from './app.module';

// This URL handling strategy is custom and application-specific.
// Using it we can tell the Angular 2 router to handle only specific URLs.
class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: any) { return url.toString().startsWith('/teams'); }
  extract(url: any) { return url; }
  merge(url: any, whole: any) { return url; }
}

// a placeholder component that acts as a root component for angular 2 modules
@Component({selector : 'ng2-router-root', template: `<router-outlet></router-outlet>`})
export class Ng2RouterRoot {}


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


/** Wrapper root module for angular 1 */
export const RootModule = angular.module('rootModule', ['ngRoute', footballApp.name]);

RootModule.component('rootCmp', {template : '<div class="ng-view"></div>'});

RootModule.directive('ng2RouterRoot', downgradeComponent({
  component: Ng2RouterRoot,
  outputs: ['ng2RouterRoot'],
}) as ng.IDirectiveFactory);

// Tell the angular 1 router to render the placeholder
RootModule.config(($routeProvider: angular.route.IRouteProvider) => {
  $routeProvider
    .otherwise({template : '<ng2-router-root></ng2-router-root>', reloadOnSearch: false});
});
