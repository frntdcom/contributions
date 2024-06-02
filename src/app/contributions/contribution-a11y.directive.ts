import {Directive, HostListener, ElementRef, Renderer2, inject, OnInit} from "@angular/core";
import {ContributionsService} from "./contributions.service";
import {WeeklyContributionsGrid} from "./contributions.models";

@Directive({
  selector: '[appContributionA11y]',
  standalone: true,
})
export class ContributionA11yDirective implements OnInit {
  private readonly contributionsService = inject(ContributionsService);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly daysOfWeek = this.contributionsService.daysOfWeek;
  readonly weeklyContributionsGrid = this.contributionsService.weeklyContributionsGrid;

  @HostListener('keydown', ['$event'])
  onCellKeyDown(event: KeyboardEvent) {
    const keyActions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keyActions.includes(event.key)) {
      return;
    }

    const rowIndex = Number(this.el.nativeElement.getAttribute('data-row'));
    const columnIndex = Number(this.el.nativeElement.getAttribute('data-column'));

    let newRowIndex = rowIndex;
    let newColumnIndex = columnIndex;

    switch (event.key) {
      case 'ArrowUp':
        newRowIndex = rowIndex > 0 ? rowIndex - 1 : this.daysOfWeek.length - 1;
        if (!this.weeklyContributionsGrid()[newRowIndex][columnIndex]) {
          newRowIndex = this.findNonEmptyCell(columnIndex, newRowIndex, this.weeklyContributionsGrid(), 'top');
        }
        break;
      case 'ArrowDown':
        newRowIndex = rowIndex < this.daysOfWeek.length - 1 ? rowIndex + 1 : 0;
        if (!this.weeklyContributionsGrid()[newRowIndex][columnIndex]) {
          newRowIndex = this.findNonEmptyCell(columnIndex, newRowIndex, this.weeklyContributionsGrid(), 'bottom');
        }
        break;
      case 'ArrowLeft':
        newColumnIndex = columnIndex > 0 ? columnIndex - 1 : this.contributionsService.numberOfWeeks - 1;
        if (!this.weeklyContributionsGrid()[rowIndex][newColumnIndex]) {
          newColumnIndex = this.findNonEmptyCell(newColumnIndex, rowIndex, this.weeklyContributionsGrid(), 'left');
        }
        break;
      case 'ArrowRight':
        newColumnIndex = columnIndex < this.contributionsService.numberOfWeeks - 1 ? columnIndex + 1 : 0;
        if (!this.weeklyContributionsGrid()[rowIndex][newColumnIndex]) {
          newColumnIndex = this.findNonEmptyCell(newColumnIndex, rowIndex, this.weeklyContributionsGrid(), 'right');
        }
        break;
      case 'Home':
        newColumnIndex = 0;
        if (!this.weeklyContributionsGrid()[rowIndex][newColumnIndex]) {
          newColumnIndex = this.findNonEmptyCell(newColumnIndex, rowIndex, this.weeklyContributionsGrid(), 'right');
        }
        break;
      case 'End':
        newColumnIndex = this.contributionsService.numberOfWeeks - 1;
        if (!this.weeklyContributionsGrid()[rowIndex][newColumnIndex]) {
          newColumnIndex = this.findNonEmptyCell(newColumnIndex, rowIndex, this.weeklyContributionsGrid(), 'left');
        }
        break;
      case 'PageUp':
        newRowIndex = 0
        if (!this.weeklyContributionsGrid()[newRowIndex][columnIndex]) {
          newRowIndex = this.findNonEmptyCell(columnIndex, newRowIndex, this.weeklyContributionsGrid(), 'bottom');
        }
        break;
      case 'PageDown':
        newRowIndex = this.contributionsService.numberOfDays - 1;
        if (!this.weeklyContributionsGrid()[newRowIndex][columnIndex]) {
          newRowIndex = this.findNonEmptyCell(columnIndex, newRowIndex, this.weeklyContributionsGrid(), 'top');
        }
        break;
    }

    const newCell: HTMLElement | null = document.querySelector(`[data-row='${newRowIndex}'][data-column='${newColumnIndex}']`);

    if (newCell) {
      newCell.focus();
    }
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
  }

  findNonEmptyCell(columnIndex: number, rowIndex: number, grid: WeeklyContributionsGrid, type: 'top' | 'bottom' | 'right' | 'left'): number {
    const maxColumnIndex = this.contributionsService.numberOfWeeks - 1;
    const maxRowIndex = this.contributionsService.numberOfDays - 1;

    if (type === 'top' || type === 'bottom') {
      if (rowIndex < 0) {
        rowIndex = maxRowIndex;
      } else if (rowIndex > maxRowIndex) {
        rowIndex = 0;
      }
      if (grid[rowIndex][columnIndex]) {
        return rowIndex;
      }

      return this.findNonEmptyCell(columnIndex, type === 'top' ? rowIndex - 1 : rowIndex + 1, grid, type);
    }

    if (type === 'left' || type === 'right') {
      if (columnIndex < 0) {
        columnIndex = maxColumnIndex;
      } else if (columnIndex > maxColumnIndex) {
        columnIndex = 0;
      }
      if (grid[rowIndex][columnIndex]) {
        return columnIndex;
      }

      return this.findNonEmptyCell(type === 'right' ? columnIndex + 1 : columnIndex - 1, rowIndex, grid, type);
    }

    // it'll never happen, I don't know why linter doesn't understand me
    return 0;
  }
}
