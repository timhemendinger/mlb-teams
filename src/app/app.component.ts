import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlayersService } from './players.service';
import { Team } from './team.model';
import { Players } from './players.model';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private playersService: PlayersService) { }

  private teamsData: Team[];
  private players: Players[];
  private year: number = 2019;
  private selectedTeam: number;
  private years: number[] = this.getYears(1876);
  private player: Player;

  ngOnInit() {
    this.refreshTeams(this.year);
  }

  getPlayerInfo(id: number) {
    console.log(id);
    this.playersService.fetchPlayerInfo(id).subscribe(data => {
      this.player = data;
    });
  }

  refreshTeams(year: number) {
    this.playersService.fetchTeams(this.year).subscribe(data => {
      this.teamsData = data;
    });
  }

  refreshRoster(year: number, teamId: number) {
    if (this.selectedTeam) {
      this.playersService.fetchRoster(this.year, this.selectedTeam).subscribe(data => {
        this.players = data;
      });
    }
  }

  onTeamsChange(): void {
    this.refreshTeams(this.year);
    this.refreshRoster(this.year, this.selectedTeam);
  }

  onYearChange(): void {
    this.refreshTeams(this.year);
    this.refreshRoster(this.year, this.selectedTeam);
  }

  getYears(startYear): number[] {
    var currentYear = new Date().getFullYear()
    var years = [];
    for (var x = currentYear; x >= startYear; x--) {
      years.push(x);
    }
    return years;
  }
}
