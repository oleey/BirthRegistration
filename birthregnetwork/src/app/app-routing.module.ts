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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CertificateComponent } from './Certificate/Certificate.component';

import { NpopcOfficialComponent } from './NpopcOfficial/NpopcOfficial.component';
import { HospitalOfficialComponent } from './HospitalOfficial/HospitalOfficial.component';
import { CitizenComponent } from './Citizen/Citizen.component';

import { RegisterBabyComponent } from './RegisterBaby/RegisterBaby.component';
import { ViewBirthCertificateComponent } from './ViewBirthCertificate/ViewBirthCertificate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Certificate', component: CertificateComponent },
  { path: 'NpopcOfficial', component: NpopcOfficialComponent },
  { path: 'HospitalOfficial', component: HospitalOfficialComponent },
  { path: 'Citizen', component: CitizenComponent },
  { path: 'RegisterBaby', component: RegisterBabyComponent },
  { path: 'ViewBirthCertificate', component: ViewBirthCertificateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
