import { Component,
        OnInit,
        Input,
        Output,
        EventEmitter,
        OnChanges,
        ElementRef,
        NgZone,
        ChangeDetectionStrategy,
        ChangeDetectorRef } from '@angular/core';
import { BaseChartComponent } from '@swimlane/ngx-charts';
import * as d3 from 'd3';

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomChartComponent extends BaseChartComponent implements OnInit, OnChanges {

  constructor(private element: ElementRef, cd: ChangeDetectorRef, zone: NgZone) {
    super(element, zone, cd);
  }

  dims: any;
  xScale: any;
  yScale: any;
  xDomain: any;
  yDomain: any;
  colors: Function;
  colorScheme: any = ['#008080', '#8000ff', '#adcded'];

  @Input() view;
  @Input() results;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();

    this.dims = {
      width: this.width,
      height: this.height,
    };

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
  }

  getXScale() {
    const spacing = 0.2;
    this.xDomain = this.getXDomain();
    return d3.scaleBand()
      .rangeRound([0, this.dims.width])
      .paddingInner(spacing)
      .domain(this.xDomain);
  }

  getYScale() {
    this.yDomain = this.getYDomain();
    return d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);
  }

  getXDomain() {
    return this.results.map(d => d.name);
  }

  getYDomain() {
    const values = this.results.map(d => d.value);
    const min = Math.min(0, ...values);
    const max = Math.max(0, ...values);
    return [min, max];
  }

  onClick(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = d3.scaleOrdinal()
      .range(this.colorScheme)
      .domain(this.getXDomain());
  }
}
