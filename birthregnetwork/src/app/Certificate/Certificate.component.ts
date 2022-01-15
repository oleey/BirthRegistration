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
import { CertificateService } from './Certificate.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-certificate',
  templateUrl: './Certificate.component.html',
  styleUrls: ['./Certificate.component.css'],
  providers: [CertificateService]
})
export class CertificateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  certificateId = new FormControl('', Validators.required);
  birthdate = new FormControl('', Validators.required);
  childName = new FormControl('', Validators.required);
  fatherName = new FormControl('', Validators.required);
  motherName = new FormControl('', Validators.required);
  registrationDate = new FormControl('', Validators.required);
  citizen = new FormControl('', Validators.required);
  hospitalofficial = new FormControl('', Validators.required);
  npopcofficial = new FormControl('', Validators.required);

  constructor(public serviceCertificate: CertificateService, fb: FormBuilder) {
    this.myForm = fb.group({
      certificateId: this.certificateId,
      birthdate: this.birthdate,
      childName: this.childName,
      fatherName: this.fatherName,
      motherName: this.motherName,
      registrationDate: this.registrationDate,
      citizen: this.citizen,
      hospitalofficial: this.hospitalofficial,
      npopcofficial: this.npopcofficial
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCertificate.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.meenah.Certificate',
      'certificateId': this.certificateId.value,
      'birthdate': this.birthdate.value,
      'childName': this.childName.value,
      'fatherName': this.fatherName.value,
      'motherName': this.motherName.value,
      'registrationDate': this.registrationDate.value,
      'citizen': this.citizen.value,
      'hospitalofficial': this.hospitalofficial.value,
      'npopcofficial': this.npopcofficial.value
    };

    this.myForm.setValue({
      'certificateId': null,
      'birthdate': null,
      'childName': null,
      'fatherName': null,
      'motherName': null,
      'registrationDate': null,
      'citizen': null,
      'hospitalofficial': null,
      'npopcofficial': null
    });

    return this.serviceCertificate.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'certificateId': null,
        'birthdate': null,
        'childName': null,
        'fatherName': null,
        'motherName': null,
        'registrationDate': null,
        'citizen': null,
        'hospitalofficial': null,
        'npopcofficial': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.meenah.Certificate',
      'birthdate': this.birthdate.value,
      'childName': this.childName.value,
      'fatherName': this.fatherName.value,
      'motherName': this.motherName.value,
      'registrationDate': this.registrationDate.value,
      'citizen': this.citizen.value,
      'hospitalofficial': this.hospitalofficial.value,
      'npopcofficial': this.npopcofficial.value
    };

    return this.serviceCertificate.updateAsset(form.get('certificateId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteAsset(): Promise<any> {

    return this.serviceCertificate.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

    return this.serviceCertificate.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'certificateId': null,
        'birthdate': null,
        'childName': null,
        'fatherName': null,
        'motherName': null,
        'registrationDate': null,
        'citizen': null,
        'hospitalofficial': null,
        'npopcofficial': null
      };

      if (result.certificateId) {
        formObject.certificateId = result.certificateId;
      } else {
        formObject.certificateId = null;
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
      'certificateId': null,
      'birthdate': null,
      'childName': null,
      'fatherName': null,
      'motherName': null,
      'registrationDate': null,
      'citizen': null,
      'hospitalofficial': null,
      'npopcofficial': null
      });
  }

}
