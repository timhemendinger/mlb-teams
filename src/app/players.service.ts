import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PlayersService {

    constructor(private http: HttpClient) { }

    returnedTeams = [];

    fetchTeams(year: number) : any {

        var queryString = `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${year}'`;

        return this.http.get(queryString)
            .pipe(
                map(data => {
                    const teamArray = [];
                    var rows = data['team_all_season'].queryResults.row;
                    for (var item in rows) {
                        teamArray.push(rows[item].name_display_full);
                    }
                    return teamArray;
                })
            )
    }
}