import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlayersService } from './players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private playersService: PlayersService) { }

  private teams;
  private players: string[]
  private year: number = 2019;
  private selectedYear: number = this.year;
  private selectedTeam: number;
  private years: number[] = this.getYears(1876);

  ngOnInit() {
    this.refreshTeams(this.year);
  }

  refreshTeams(year: number) {
    this.playersService.fetchTeams(this.year).subscribe(data => {
      this.teams = data;
    });
  }

  refreshRoster(year: number, teamId: number) {
    this.playersService.fetchRoster(this.year, this.selectedTeam).subscribe(data => {
      this.players = data;
    });
  }

  onTeamsChange() : void {
    this.refreshTeams(this.year);
    if (this.selectedTeam) {
      this.refreshRoster(this.year, this.selectedTeam);
    }
  }

  onYearChange(): void {
    this.year = this.selectedYear;
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
