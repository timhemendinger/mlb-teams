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

  private teams: string[];
  private players: string[]
  private year: number = 2019;
  private selectedYear: number;
  private years: number[] = this.getYears(1876);

  ngOnInit() {
    this.refreshTeams(this.year);

    this.playersService.fetchRoster().subscribe(data => {
      this.players = data;
    });
  }

  refreshTeams(year: number) {
    this.playersService.fetchTeams(this.year).subscribe(data => {
      this.teams = data;
    });
  }

  onTeamsChange() : void {
    
  }

  onYearChange(): void {
    this.year = this.selectedYear;
    this.refreshTeams(this.year);
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
