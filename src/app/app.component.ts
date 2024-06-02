import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContributionsComponent } from "./contributions/contributions.component";
import {Contributions} from "./contributions/contributions.models";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ContributionsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  data: Contributions = this.generateContributionsData();

  generateContributionsData(year = 2020) {
    const dataObject:any = {};
    const startDate = new Date(year, 0, 1);

    for (let i = 0; i < 366; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dateString = date.toISOString().split('T')[0];
      dataObject[dateString] = Math.floor(Math.random() * 5);
    }
    dataObject.year = year;

    return dataObject;
  }
}
