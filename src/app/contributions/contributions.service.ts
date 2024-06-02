import {Injectable, signal} from "@angular/core";
import {WeeklyContributionsGrid, Contributions} from "./contributions.models";

const DEFAULT_LOCALES = 'en-CA';

@Injectable()
export class ContributionsService {
  readonly numberOfWeeks = 53;
  readonly numberOfDays = 7;
  readonly daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  readonly weeklyContributionsGrid = signal<WeeklyContributionsGrid>([])

  setContributions(contributions: Contributions) {
    this.weeklyContributionsGrid.set(this.formatContributionsByWeek(contributions));
  }

  formatContributionsByWeek(contributionsData: Contributions): WeeklyContributionsGrid {
    const yearStart = new Date(contributionsData.year, 0, 1);
    const firstDayOfYear = yearStart.getDay();

    const weeklyGrid: WeeklyContributionsGrid = Array.from({length: 7}, () => Array(53).fill(null));
    let currentDay = new Date(yearStart);

    for (let week = 0; week < this.numberOfWeeks; week++) {
      for (let day = 0; day < this.numberOfDays; day++) {

        if (week === 0 && day < firstDayOfYear) {
          continue;
        }

        if (currentDay.getFullYear() !== contributionsData.year) {
          break;
        }

        weeklyGrid[day][week] = {
          date: currentDay.toLocaleDateString(DEFAULT_LOCALES),
          amount: contributionsData[currentDay.toLocaleDateString(DEFAULT_LOCALES)],
        };
        currentDay.setDate(currentDay.getDate() + 1);
      }
    }

    return weeklyGrid;
  }
}
