import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  private getEmployeesSub: any;
  private loadingError: boolean = false;

  constructor(private empS: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.empS.getEmployees()
      .subscribe(emp => {this.employees = emp;
                        this.filteredEmployees = this.employees}, 
                 err => this.loadingError = true);
  }

  onEmployeeSearchKeyUP(event:any) {
    let exp = event.target.value.toLowerCase();
    //let regex = new RegExp(exp, 'g'); console.log(event.target.value.toLowerCase())
    this.filteredEmployees = this.employees.filter(emp => {
      return (emp.FirstName.toLowerCase().includes(exp) || emp.LastName.toLowerCase().includes(exp) || emp.Position.PositionName.toLowerCase().includes(exp))
    });
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  ngOnDestroy(){
    if (this.getEmployeesSub) { this.getEmployeesSub.unsubscribe(); }
  }
}
