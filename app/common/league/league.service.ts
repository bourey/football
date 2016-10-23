import { NgModule } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import { League } from './league';

let delay = 0;
//let delay = 2000;


export class LeagueService {
    leagues: League[] = [
        new League('premier', 'Premier'),
    ];

    constructor(private $timeout: ng.ITimeoutService) { }

    getLeagues(): Promise<League[]> {
        return new Promise<League>(resolve => setTimeout(resolve, delay)).
            then(() => this.leagues);
    }

    getLeague(id: string): Promise<League> {
        let match = this.leagues.find(function(league: League) {
            return league.id === id;
        });
        return new Promise<League>(resolve =>
            setTimeout(resolve, delay))
            .then(() => match);
    }
}

export const LeagueServiceModule = angular.module('LeagueServiceModule', []);
LeagueServiceModule.service('leagueService', LeagueService);

@NgModule()
export class LeagueService2Module {
  static setAdapter(adapter: UpgradeAdapter) {
    adapter.upgradeNg1Provider('leagueService');
  }
}
