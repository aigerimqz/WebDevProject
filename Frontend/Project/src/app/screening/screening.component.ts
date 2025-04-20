import { Component, OnInit } from '@angular/core';
import { Screening } from '../../models';
import { ScreeningService } from '../services/screening.service';

@Component({
  selector: 'app-screening',
  standalone: true,
  imports: [],
  templateUrl: './screening.component.html',
  styleUrl: './screening.component.css'
})
export class ScreeningComponent implements OnInit{
  screenings: Screening[] = [];

  constructor(private screeningService: ScreeningService){}
  ngOnInit(): void {
      this.screenings = this.screeningService.getAllScreenings();
  }
}
