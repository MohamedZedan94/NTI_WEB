import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  employees = [
    {
      id: 1,
      name: 'Ahmed',
      age: 28,
      department: 'Development',
      available: true
    },
    {
      id: 2,
      name: 'Esraa',
      age: 24,
      department: 'Marketing',
      available: false
    },
    {
      id: 3,
      name: 'Mohamed',
      age: 26,
      department: 'Design',
      available: true
    }
  ];

  departments = [
    'Development',
    'Marketing',
    'Design'
  ];

  selectedDepartment = 'All';

  viewMode = 'card';

  newEmployee = {
    name: '',
    age: 0,
    department: 'Development',
    available: true
  };


  addEmployee() {

    if (
      this.newEmployee.name.trim() === '' ||
      this.newEmployee.age <= 0
    ) {
      alert('Please enter valid data');
      return;
    }

    const newEmployee = {
      id: this.employees.length + 1,
      name: this.newEmployee.name,
      age: this.newEmployee.age,
      department: this.newEmployee.department,
      available: this.newEmployee.available
    };

    this.employees.push(newEmployee);

    this.newEmployee = {
      name: '',
      age: 0,
      department: 'Development',
      available: true
    };
  }


  toggleAvailability(employee: any) {

    employee.available = !employee.available;

  }


  getFilteredEmployees() {

    if (this.selectedDepartment === 'All') {
      return this.employees;
    }

    return this.employees.filter(
      employee =>
        employee.department === this.selectedDepartment
    );

  }

}
