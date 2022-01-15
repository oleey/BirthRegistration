/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterBabyService } from './RegisterBaby.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-registerbaby',
  templateUrl: './RegisterBaby.component.html',
  styleUrls: ['./RegisterBaby.component.css'],
  providers: [RegisterBabyService]
})
export class RegisterBabyComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  uniquecode = new FormControl('', Validators.required);
  birthdate = new FormControl('', Validators.required);
  childName = new FormControl('', Validators.required);
  fatherName = new FormControl('', Validators.required);
  motherName = new FormControl('', Validators.required);
  registrationDate = new FormControl('', Validators.required);
  citizen = new FormControl('', Validators.required);
  hospitalofficial = new FormControl('', Validators.required);
  npopcofficial = new FormControl('', Validators.required);
  certificate = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceRegisterBaby: RegisterBabyService, fb: FormBuilder) {
    this.myForm = fb.group({
      uniquecode: this.uniquecode,
      birthdate: this.birthdate,
      childName: this.childName,
      fatherName: this.fatherName,
      motherName: this.motherName,
      registrationDate: this.registrationDate,
      citizen: this.citizen,
      hospitalofficial: this.hospitalofficial,
      npopcofficial: this.npopcofficial,
      certificate: this.certificate,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRegisterBaby.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.meenah.RegisterBaby',
      'uniquecode': this.uniquecode.value,
      'birthdate': this.birthdate.value,
      'childName': this.childName.value,
      'fatherName': this.fatherName.value,
      'motherName': this.motherName.value,
      'registrationDate': this.registrationDate.value,
      'citizen': this.citizen.value,
      'hospitalofficial': this.hospitalofficial.value,
      'npopcofficial': this.npopcofficial.value,
      'certificate': this.certificate.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'uniquecode': null,
      'birthdate': null,
      'childName': null,
      'fatherName': null,
      'motherName': null,
      'registrationDate': null,
      'citizen': null,
      'hospitalofficial': null,
      'npopcofficial': null,
      'certificate': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceRegisterBaby.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'uniquecode': null,
        'birthdate': null,
        'childName': null,
        'fatherName': null,
        'motherName': null,
        'registrationDate': null,
        'citizen': null,
        'hospitalofficial': null,
        'npopcofficial': null,
        'certificate': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.meenah.RegisterBaby',
      'uniquecode': this.uniquecode.value,
      'birthdate': this.birthdate.value,
      'childName': this.childName.value,
      'fatherName': this.fatherName.value,
      'motherName': this.motherName.value,
      'registrationDate': this.registrationDate.value,
      'citizen': this.citizen.value,
      'hospitalofficial': this.hospitalofficial.value,
      'npopcofficial': this.npopcofficial.value,
      'certificate': this.certificate.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceRegisterBaby.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.serviceRegisterBaby.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceRegisterBaby.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'uniquecode': null,
        'birthdate': null,
        'childName': null,
        'fatherName': null,
        'motherName': null,
        'registrationDate': null,
        'citizen': null,
        'hospitalofficial': null,
        'npopcofficial': null,
        'certificate': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.uniquecode) {
        formObject.uniquecode = result.uniquecode;
      } else {
        formObject.uniquecode = null;
      }

      if (result.birthdate) {
        formObject.birthdate = result.birthdate;
      } else {
        formObject.birthdate = null;
      }

      if (result.childName) {
        formObject.childName = result.childName;
      } else {
        formObject.childName = null;
      }

      if (result.fatherName) {
        formObject.fatherName = result.fatherName;
      } else {
        formObject.fatherName = null;
      }

      if (result.motherName) {
        formObject.motherName = result.motherName;
      } else {
        formObject.motherName = null;
      }

      if (result.registrationDate) {
        formObject.registrationDate = result.registrationDate;
      } else {
        formObject.registrationDate = null;
      }

      if (result.citizen) {
        formObject.citizen = result.citizen;
      } else {
        formObject.citizen = null;
      }

      if (result.hospitalofficial) {
        formObject.hospitalofficial = result.hospitalofficial;
      } else {
        formObject.hospitalofficial = null;
      }

      if (result.npopcofficial) {
        formObject.npopcofficial = result.npopcofficial;
      } else {
        formObject.npopcofficial = null;
      }

      if (result.certificate) {
        formObject.certificate = result.certificate;
      } else {
        formObject.certificate = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'uniquecode': null,
      'birthdate': null,
      'childName': null,
      'fatherName': null,
      'motherName': null,
      'registrationDate': null,
      'citizen': null,
      'hospitalofficial': null,
      'npopcofficial': null,
      'certificate': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
