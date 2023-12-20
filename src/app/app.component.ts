import { Component } from '@angular/core';
import data from './patientData.json';

class IPatient {
  FirstName!: string;
  LastName!: string;
  ChartNo!: string;
  Address1!: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'search';
  patientData: { [key: string]: string } = {
    '/': '',
    '@': '',
    '#': '',
    $: '',
  };
  patientsData: IPatient[] = data;
  filterData!: IPatient[];
  searchFieldValue = `${this.patientData['/']}${this.patientData['@']}${this.patientData['#']}${this.patientData['$']}`;
  constructor() {}

  /**
   * set search bar value based on field
   */
  setSearchFieldValue(): void {
    this.searchFieldValue = '';
    console.log(this.patientData);
    for (const key of Object.keys(this.patientData)) {
      const value = this.patientData[key];
      // Check if the value is not empty
      if (value !== '') {
        // Append the key and value to the searchFieldValue
        this.searchFieldValue += `${key}${value}`;
      } else {
      }
    }
  }

  /**
   * set all field based on search bar value
   */
  setFieldDataBasedSearch(): void {
    const regex = /([/@#$])([^/@#$\s]*)/g;
    let match;
    while ((match = regex.exec(this.searchFieldValue))) {
      this.patientData[match[1]] = match[2];
    }
  }

  /**
   * get search data
   */
  getSerchData(): void {
    if (this.searchFieldValue) {
      this.filterData = this.patientsData.filter((user: IPatient) => {
        return (
          user.FirstName.toLowerCase().includes(
            this.patientData['/'].toLowerCase()
          ) &&
          user.LastName.toLowerCase().includes(
            this.patientData['@'].toLowerCase()
          ) &&
          user.ChartNo.toLowerCase().includes(
            this.patientData['#'].toLowerCase()
          ) &&
          user.Address1.toLowerCase().includes(
            this.patientData['$'].toLowerCase()
          )
        ).valueOf();
      });
    }
  }

  /**
   * clear all fields and data
   */
  clear(): void {
    this.patientData = {
      '/': '',
      '@': '',
      '#': '',
      $: '',
    };
    this.filterData = [];
    this.searchFieldValue = '';
  }
}
