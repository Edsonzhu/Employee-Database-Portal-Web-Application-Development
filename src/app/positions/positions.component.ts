import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  private getPositionsSub: any;
  private loadingError: boolean = false;

  constructor(private posS: PositionService, private router: Router) { }

  ngOnInit() {
   this.getPositionsSub = this.posS.getPositions()
    .subscribe(pos => this.positions = pos, 
               err => this.loadingError = true);
  }

  routePosition(id: string) {;
    this.router.navigate(['/position', id]);
  }

  ngOnDestroy(){
    if (this.getPositionsSub) { this.getPositionsSub.unsubscribe(); }
  }
}
