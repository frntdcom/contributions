import {Component, ChangeDetectionStrategy, Input, inject} from '@angular/core';
import {NgForOf, NgIf, DatePipe, NgClass} from "@angular/common";
import {ContributionBgColorDirective} from "./contribution-bg-color.directive";
import {ContributionA11yDirective} from "./contribution-a11y.directive";
import {ContributionsService} from "./contributions.service";
import {Contributions} from "./contributions.models";

const THEAD_ROWS = [
  {
    colspan: 4,
    name: 'Jan',
  },
  {
    colspan: 4,
    name: 'Feb',
  },
  {
    colspan: 5,
    name: 'Mar',
  },
  {
    colspan: 5,
    name: 'Apr',
  },
  {
    colspan: 4,
    name: 'May',
  },
  {
    colspan: 4,
    name: 'Jun',
  },
  {
    colspan: 5,
    name: 'Jul',
  },
  {
    colspan: 4,
    name: 'Aug',
  },
  {
    colspan: 4,
    name: 'Sep'
  },
  {
    colspan: 5,
    name: 'Oct',
  },
  {
    colspan: 4,
    name: 'Nov',
  },
  {
    colspan: 5,
    name: 'Dec',
  },
];

@Component({
  standalone: true,
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss'],
  imports: [NgForOf, NgIf, DatePipe, NgClass, ContributionBgColorDirective, ContributionA11yDirective],
  providers: [ContributionsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContributionsComponent {
  readonly theadRows = THEAD_ROWS;
  private readonly contributionsService = inject(ContributionsService);

  readonly weeklyContributionsGrid = this.contributionsService.weeklyContributionsGrid;
  readonly daysOfWeek = this.contributionsService.daysOfWeek;

  @Input({required: true})
  set contributions(val: Contributions) {
    this.contributionsService.setContributions(val)
  }
}
