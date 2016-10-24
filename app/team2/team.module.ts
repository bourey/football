import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamServiceModule } from '../common/team/team.service';

let ROUTES = [
  { path: 'teams', children: [
    { path: '', loadChildren: 'app/team2/team_list.module' },
    { path: ':teamId', loadChildren: 'app/team2/team_detail.module' }
  ]}
];


@NgModule({
  imports: [TeamServiceModule, RouterModule.forChild(ROUTES)],
})
export class TeamsModule {}
