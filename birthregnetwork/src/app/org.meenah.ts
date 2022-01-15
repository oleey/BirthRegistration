import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.meenah{
   export class NpopcOfficial extends Participant {
      npopcofficialId: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      branch: string;
   }
   export class HospitalOfficial extends Participant {
      hospitalofficialId: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      branch: string;
      hospitalName: string;
   }
   export class Citizen extends Participant {
      citizenId: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      relationship: string;
   }
   export class Certificate extends Asset {
      certificateId: string;
      birthdate: string;
      childName: string;
      fatherName: string;
      motherName: string;
      registrationDate: Date;
      citizen: Citizen;
      hospitalofficial: HospitalOfficial;
      npopcofficial: NpopcOfficial;
   }
   export class RegisterBaby extends Transaction {
      uniquecode: string;
      birthdate: string;
      childName: string;
      fatherName: string;
      motherName: string;
      registrationDate: Date;
      citizen: Citizen;
      hospitalofficial: HospitalOfficial;
      npopcofficial: NpopcOfficial;
      certificate: Certificate;
   }
   export class ViewBirthCertificate extends Transaction {
      certificate: Certificate;
   }
// }
