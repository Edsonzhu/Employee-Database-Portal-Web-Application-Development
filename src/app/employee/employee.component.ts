import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { PositionService } from '../data/position.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Position } from '../data/position';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private paramSubscription: any;
  private employeeSubscription: any;
  private getPositionsSubscription: any;
  private saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage = false;
  failMessage = false;

  constructor(private empS: EmployeeService, private actRoute: ActivatedRoute,
    private posS: PositionService) { }

    ngOnInit() {
      this.paramSubscription = this.actRoute.params.subscribe(params =>{
        this.employeeSubscription = this.empS.getEmployee(params.id).subscribe(
          (emp:EmployeeRaw) => {this.employee = emp[0];},
          (err) => {},
          () => {this.getPositionsSubscription = this.posS.getPositions()
            .subscribe(pos => this.positions = pos);}
        );
      })
    }
  
    onSubmit(f: NgForm) {
        this.saveEmployeeSubscription = this.empS.saveEmployee(this.employee)
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
      if (this.paramSubscription) {this.paramSubscription.unsubscribe();}
      if (this.employeeSubscription) {this.employeeSubscription.unsubscribe();}
      if (this.getPositionsSubscription) {this.getPositionsSubscription.unsubscribe();}
      if (this.saveEmployeeSubscription) {this.saveEmployeeSubscription.unsubscribe();}
    }
}
