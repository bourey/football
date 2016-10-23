// angular2 imports
import {Component} from '@angular/core';
import {downgradeComponent} from '@angular/upgrade';

// modules

// a placeholder component that acts as a root component for angular 2 modules
@Component({selector : 'ng2-router-root', template: `<router-outlet></router-outlet>`})
export class Ng2RouterRoot {}

export function createAngular1RootModule( moduleNames: string[]) {
  const RootModule = angular.module('rootModule', moduleNames);

  RootModule.component('rootCmp', {template : '<div class="ng-view"></div>'});
  RootModule.directive('ng2RouterRoot', downgradeComponent({
    component: Ng2RouterRoot,
    inputs: [],
    outputs: ['ng2RouterRoot'],
  }) as ng.IDirectiveFactory);
  RootModule.config(($routeProvider: angular.route.IRouteProvider) => {

    // telling the Angular 1 router to render the placeholder
    $routeProvider
      .otherwise({template : '<ng2-router-root></ng2-router-root>', reloadOnSearch: false});
  });

  return RootModule;
};

