import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  screeningId: number = 0;
  seatMap: number[][] = []; 
  selectedSeats: { row: number, seat: number }[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.screeningId = Number(this.route.snapshot.paramMap.get('id'));

    
    this.seatMap = Array(4).fill(0).map(() => Array(5).fill(0));
  }

  toggleSeat(row: number, seat: number): void {
    const index = this.selectedSeats.findIndex(s => s.row === row && s.seat === seat);
    if (index > -1) {
      this.selectedSeats.splice(index, 1); 
    } else {
      this.selectedSeats.push({ row, seat });
    }
  }

  isSelected(row: number, seat: number): boolean {
    return this.selectedSeats.some(s => s.row === row && s.seat === seat);
  }
}
