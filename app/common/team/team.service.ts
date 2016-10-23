import { NgModule } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import { Team } from './team';

let delay = 0;

export class TeamService {
    teams: Team[] = [
        new Team('arsenal', 'Arsenal', 'premier'),
    ];

    constructor(private $timeout: ng.ITimeoutService) { }

    getTeam(id: string): Promise<Team> {
        let match = this.teams.find(function(team: Team) {
            return team.id === id;
        });
        return new Promise<Team>(resolve => setTimeout(resolve, delay)).
            then(() => match);
    }

    getTeamsForLeague(leagueId: string): Promise<Team[]> {
        let matches = this.teams.filter(function(team: Team) {
            return team.leagueId === leagueId;
        });
        return new Promise<Team>(resolve => setTimeout(resolve, delay)).
            then(() => matches);
    }

    getTeams(): Promise<Team[]> {
        return new Promise<Team>(resolve => setTimeout(resolve, delay)).
            then(() => this.teams);
    }
}

export const teamServiceModule = angular.module('teamServiceModule', []);
teamServiceModule.service('teamService', TeamService);

@NgModule()
export class TeamService2Module {
  static setAdapter(adapter: UpgradeAdapter) {
    adapter.upgradeNg1Provider('teamService');
  }
}
