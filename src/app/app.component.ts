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

  teams: string[];
  year: number = 2019; 
  selectedYear: number;
  years: number[] = this.getYears(1900);
 
  ngOnInit() {
    this.refreshTeams(this.year);
  }

  refreshTeams(year: number) {
    this.teams = this.playersService.fetchTeams(this.year).subscribe(data => { this.teams = data });
  }

  onYearChange() : void {
    this.year = this.selectedYear;
    this.refreshTeams(this.year);
  }

  getYears(startYear) : number[] {
    var currentYear = new Date().getFullYear()
    var years = [];
    for (var x = currentYear; x >= startYear; x--) {
      years.push(x);
    }
    return years;
  }
}
