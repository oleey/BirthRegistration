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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for birthregnetwork', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be birthregnetwork', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('birthregnetwork');
    })
  });

  it('network-name should be birthregnetwork@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('birthregnetwork@0.0.1.bna');
    });
  });

  it('navbar-brand should be birthregnetwork',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('birthregnetwork');
    });
  });

  
    it('Certificate component should be loadable',() => {
      page.navigateTo('/Certificate');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Certificate');
      });
    });

    it('Certificate table should have 10 columns',() => {
      page.navigateTo('/Certificate');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('NpopcOfficial component should be loadable',() => {
      page.navigateTo('/NpopcOfficial');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('NpopcOfficial');
      });
    });

    it('NpopcOfficial table should have 6 columns',() => {
      page.navigateTo('/NpopcOfficial');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('HospitalOfficial component should be loadable',() => {
      page.navigateTo('/HospitalOfficial');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('HospitalOfficial');
      });
    });

    it('HospitalOfficial table should have 7 columns',() => {
      page.navigateTo('/HospitalOfficial');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Citizen component should be loadable',() => {
      page.navigateTo('/Citizen');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Citizen');
      });
    });

    it('Citizen table should have 6 columns',() => {
      page.navigateTo('/Citizen');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('RegisterBaby component should be loadable',() => {
      page.navigateTo('/RegisterBaby');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RegisterBaby');
      });
    });
  
    it('ViewBirthCertificate component should be loadable',() => {
      page.navigateTo('/ViewBirthCertificate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ViewBirthCertificate');
      });
    });
  

});