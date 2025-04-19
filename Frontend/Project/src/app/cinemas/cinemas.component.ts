import { Component, OnInit } from '@angular/core';
import { Cinema } from '../../models';
import { CinemasService } from '../services/cinemas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinemas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cinemas.component.html',
  styleUrl: './cinemas.component.css'
})
export class CinemasComponent implements OnInit{
  cinemas: Cinema[] = []

  constructor(private cinemasService: CinemasService,
              private router: Router
  ){}

  ngOnInit(): void {
      this.cinemas = this.cinemasService.getAllCinemas();
  }
  goToDetail(cinemaId: number): void {
    this.router.navigate(['/cinemas', cinemaId]);
  }

}
