import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PlayersService {

    constructor(private http: HttpClient) { }

    fetchRoster(year: number, teamId: number) {
        var queryString = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${year}'&end_season='${+year + 1}'&team_id='${teamId}'`;

        return this.http.get(queryString)
            .pipe(
                map(data => {
                    const playersArray = [];
                    var rows = data['roster_team_alltime'].queryResults.row;
                    for (var item in rows) {
                        playersArray.push(rows[item].name_first_last);
                    }
                    return playersArray;
                })
            )
    }

    fetchTeams(year: number): any {
        var queryString = `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${year}'`;

        return this.http.get(queryString)
            .pipe(
                map(data => {
                    const teamArray = [];
                    var rows = data['team_all_season'].queryResults.row;
                    for (var item in rows) {
                        teamArray.push({ 'team': rows[item].name_display_full, 'teamId': rows[item].team_id });
                    }
                    return teamArray;
                })
            )
    }
}