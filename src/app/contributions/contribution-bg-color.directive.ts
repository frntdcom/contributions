import {Directive, ElementRef, Renderer2, OnInit, input, inject} from "@angular/core";

@Directive({
  selector: '[appContributionBgColor]',
  standalone: true,
})
export class ContributionBgColorDirective implements OnInit {
  appContributionBgColor = input.required<number>();

  private readonly colorMap: Record<number, string> = {
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39'
  };

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnInit(): void {
    this.setBackgroundColor(this.appContributionBgColor());
  }

  private setBackgroundColor(value: number): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.colorMap[value] || '#f2f3f5');
  }
}
