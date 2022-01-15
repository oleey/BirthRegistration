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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Register Baby 
 * @param  {org.meenah.RegisterBaby} registerBaby - the registration of a baby
 * @transaction
 */
function RegisterBaby(registerBaby) {
    return getAssetRegistry('org.meenah.Certificate')
    .then(function (assetRegistry) {
      let factory = getFactory()
      let uniquecode = registerBaby.certificate.certificateId + ''+registerBaby.citizen.citizenId
      let certificateAsset = factory.newResource('org.meenah','Certificate',uniquecode)
      certificateAsset.birthdate = registerBaby.birthdate
      certificateAsset.childName = registerBaby.childName
      certificateAsset.fatherName = registerBaby.fatherName
      certificateAsset.motherName = registerBaby.motherName
      certificateAsset.registrationDate = registerBaby.registrationDate
      certificateAsset.citizen = registerBaby.citizen
      certificateAsset.hospitalofficial = registerBaby.hospitalofficial
      certificateAsset.npopcofficial = registerBaby.npopcofficial
      certificateAsset.certificate = registerBaby.certificate

      return assetRegistry.add(certificateAsset);
    })
    .catch(function (error) {
      console.log("Failed to register patient asset")
    });
}


/**
 * View Birth Certificate
 * @param  {org.meenah.ViewBirthCertificate} viewBirthCertificate - the view patient record
 * @transaction
 */
function ViewBirthCertificate(viewBirthCertificate) {
    let viewCertificate;
  
  // Get the vehicle asset registry.
  return getAssetRegistry('org.meenah.Certificate')
    .then(function (certificateAssetRegistry) {
      // Get the specific certificate from the certificate asset registry.
      viewCertificate = viewBirthCertificate.certificate
      return certificateAssetRegistry.get(viewCertificate);
    })
    .then(function (viewCertificate) {
      // Process the the vehicle object.
  
      console.log("surname"+ viewCertificate.certificate.uniquecode);
      console.log("Birth Date"+ viewCertificate.certificate.birthdate);
      console.log("child Name" + viewCertificate.certificate.childName);
      console.log("Father Name" + viewCertificate.certificate.fatherName);
      console.log("Mother Name" + viewCertificate.certificate.motherName);
      console.log("Registration Date" + viewCertificate.certificate.registrationDate);
      console.log("Citizen" + viewCertificate.certificate.citizen);
      console.log("Hospital official" + viewCertificate.certificate.hospitalofficial);
      console.log("Npopc Official" + viewCertificate.certificate.npopcofficial);    
     
    })
    .catch(function (error) {
      // Add optional error handling here.
    });
  }

