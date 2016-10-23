import { Team } from '../common/team/team';
import { TeamService, teamServiceModule } from '../common/team/team.service';
import { TeamListCmp } from './team_list.component';

export const teamModule = angular.module('teamModule', [
    'ngRoute',
    teamServiceModule.name,
]);

/** @ngInject */
let resolveTeams = function(teamService: TeamService): Promise<Team[]> {
    return teamService.getTeams();
};

/** @ngInject */
let resolveTeam = function(teamService: TeamService): Promise<Team> {
    return teamService.getTeam('?');
};

let configRoutes = function($routeProvider: angular.route.IRouteProvider) {
    $routeProvider.when('/teams', {
        controller: TeamListCmp,
        controllerAs: 'ctrl',
        templateUrl: '/app/team/team_list.component.html',
        resolve: {
            teams: resolveTeams
        }
    }).when('team/:teams', {
        controllerAs: 'ctrl',
        templateUrl: '/app/team/team_detail.component.html',
        resolve: {
            team: resolveTeam
        }
    });
};
teamModule.config(configRoutes);
