import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Team } from './team.model';
import { Players } from './players.model';
import { Player } from './player.model';

@Injectable({
    providedIn: 'root'
})

export class PlayersService {

    constructor(private http: HttpClient) { }

    private mlbAPIHost = 'http://lookup-service-prod.mlb.com/json/'

    fetchPlayerInfo(playerId: number) {
        var queryString = `${this.mlbAPIHost}named.player_info.bam?sport_code='mlb'&player_id='${playerId}'`;

        return this.http.get(queryString)
            .pipe(
                map(data => {
                    var row = data['player_info'].queryResults.row;
                    const playerInfo: Player = {
                        name: row.name_display_first_last,
                        position: row.primary_position_txt,
                        birthdate: row.birth_date,
                        bats: row.bats,
                        throws: row.throws
                    }
                    return playerInfo;
                })
            )
    }

    fetchRoster(year: number, teamId: number) {
        var queryString = `${this.mlbAPIHost}named.roster_team_alltime.bam?start_season='${year}'&end_season='${+year + 1}'&team_id='${teamId}'`;

        return this.http.get(queryString)
            .pipe(
                map(data => {
                    const playersArray: Players[] = [];
                    var rows = data['roster_team_alltime'].queryResults.row;
                    for (var item in rows) {
                        playersArray.push({ name: rows[item].name_first_last, playerId: rows[item].player_id });
                    }
                    return playersArray;
                })
            )
    }

    fetchTeams(year: number): any {
        var queryString = `${this.mlbAPIHost}named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${year}'`;

        return this.http.get(queryString)
            .pipe(
                map(data => {
                    const teamArray: Team[] = [];
                    var rows = data['team_all_season'].queryResults.row;
                    for (var item in rows) {
                        teamArray.push({ team: rows[item].name_display_full, teamId: rows[item].team_id });
                    }
                    return teamArray;
                })
            )
    }
}