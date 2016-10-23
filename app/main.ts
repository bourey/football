import { AppModule, RootModule } from './app2.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlatformRef, Type } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade';
import { Router } from '@angular/router';
import { TeamService } from './common/team/team.service';

export function bootstrap(
    platform: PlatformRef, Ng2Module: Type<{}>, element: Element, ng1Module: angular.IModule) {
  // We bootstrap the Angular 2 module first; then when it is ready (async)
  // We bootstrap the Angular 1 module on the bootstrap element
  return platform.bootstrapModule(Ng2Module).then(ref => {
    let upgrade = ref.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(element, [ng1Module.name]);
    return upgrade;
  });
}

bootstrap(platformBrowserDynamic(), AppModule, document.body, RootModule).then((ref) => {
  // this is required because of a bug in NgUpgrade
  setTimeout(() => {
    ref.injector.get(Router).initialNavigation();
    console.log(ref.injector.get(TeamService));
  }, 0);
});
