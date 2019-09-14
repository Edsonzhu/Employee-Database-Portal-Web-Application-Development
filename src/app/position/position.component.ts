import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Position } from '../data/position';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  private paramSub: any;
  private positionSub: any;
  private savePositionSub: any;
  position: Position;
  successMessage = false;
  failMessage = false;

  constructor(private posS: PositionService, private actRoute: ActivatedRoute) {
    this.position = new Position();
  }

  ngOnInit() {
    this.paramSub = this.actRoute.params.subscribe(params => {
      this.positionSub = this.posS.getPosition(params.id).subscribe(
        (pos) => {this.position = pos[0];}
      )
    });
  }

  onSubmit(f: NgForm) {
    this.savePositionSub = this.posS.savePosition(this.position)
    .subscribe(
      data => {
        this.successMessage = true;
        setTimeout(() => this.successMessage = false, 2500);
      },
      error => {
        this.failMessage = true;
        setTimeout(() => this.failMessage = false, 2500);
      });
  }

  ngOnDestroy() {
    if (this.paramSub) {this.paramSub.unsubscribe();}
    if (this.positionSub) {this.positionSub.unsubscribe();}
  }
}
