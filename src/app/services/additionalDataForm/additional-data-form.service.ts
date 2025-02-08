import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IAdditionalData, IAdditionalDataFormGroup, IAdditionalDetailsFormGroup, ICountryLicenseFormGroup, IDriverDetails, IDriverDetailsFormGroup } from '../../models/additionalData.interface';
import { INSURNACE_INQUIRE_VALIDATORS } from '../../core/validations';

@Injectable({ providedIn: 'root' })
export class AdditionalDataFormService {
  fb = inject(FormBuilder);
  defaultFormValue: Partial<IAdditionalData> = {
    additionalDetails: {
      otherViolations: false,
      sameWorkCity: false,
      anotherCountryLicense: false,
      carModified: false,
      childrenUnder16: null,
      accidents5Years: null,
      licenses:[],
      modifications: null,
    },
    drivers: []
  }

  driverDefaultValue: Partial<IDriverDetails> = {
    sameAddress: true,
    anotherCountryLicense: false,
    childrenUnder16: null,
    accidents5Years: null,
    otherViolations: false,
  }

  form = this.fb.group<IAdditionalDataFormGroup>({
    isAdditionalData: new FormControl(false),
    estimatedValue: new FormControl(null, [Validators.required]),
    usePurpose: new FormControl(null),
    getDiscount: new FormControl(false),
    promoType: new FormControl(null),
    workMail: new FormControl(null),
    partyType: new FormControl(null),
    partyId: new FormControl(null),
    promoCode: new FormControl(null),
    birthYear: new FormControl(null, [Validators.required]),
    birthMonth: new FormControl(null, [Validators.required]),
    drivers: this.fb.array<FormGroup<IDriverDetailsFormGroup>>([]),
    additionalDetails: this.fb.group<IAdditionalDetailsFormGroup>({
      isOwnerDoc: new FormControl(false),
      educationLevel: new FormControl(null),
      childrenUnder16: new FormControl(null),
      ownerBirthDate: new FormControl(null),
      drivingRestriction: new FormControl(null),
      parkingPlace: new FormControl(null),
      accidents5Years: new FormControl(null),
      annualDistance: new FormControl(null),
      motionVector: new FormControl(null),
      otherViolations: new FormControl(false),
      violationTypes: new FormControl(null),
      sameWorkCity: new FormControl(true),
      workCityId: new FormControl(null),
      anotherCountryLicense: new FormControl(false),
      licenses: this.fb.array<FormGroup<ICountryLicenseFormGroup>>([]),
      carModified: new FormControl(false),
      modifications: new FormControl(''),
    }, {validators: this.ownerDetailsValidation()})
  })

  get estimatedValue() {
    return this.form.controls.estimatedValue
  }
  get usePurpose() {
    return this.form.controls.usePurpose
  }
  get getDiscount() {
    return this.form.controls.getDiscount
  }
  get promoType() {
    return this.form.controls.promoType
  }
  get workMail() {
    return this.form.controls.workMail
  }
  get partyType() {
    return this.form.controls.partyType
  }
  get promoCode() {
    return this.form.controls.promoCode
  }
  get partyId() {
    return this.form.controls.partyId
  }
  get ownerBirthMonth() {
    return this.form.controls.birthMonth
  }
  get ownerBirthYear() {
    return this.form.controls.birthYear
  }

  get drivers() {
    return this.form.controls.drivers as FormArray
  }
  getSpecificDriver(index: number) {
    return (this.drivers.at(index) as FormGroup<IDriverDetailsFormGroup>)
  }
  idNumber(index: number) {
    return this.getSpecificDriver(index).controls.idNumber
  }
  accidents5Years(index: number) {
    return this.getSpecificDriver(index).controls.accidents5Years
  }
  anotherCountryLicense(index: number) {
    return this.getSpecificDriver(index).controls.anotherCountryLicense
  }
  workCityId(index: number) {
    return this.getSpecificDriver(index).controls.workCityId
  }
  violationsTypes(index: number) {
    return this.getSpecificDriver(index).controls.violationsTypes
  }
  sameAddress(index: number) {
    return this.getSpecificDriver(index).controls.sameAddress
  }
  residenceCityId(index: number) {
    return this.getSpecificDriver(index).controls.residenceCityId
  }
  relativeRelation(index: number) {
    return this.getSpecificDriver(index).controls.relativeRelation
  }
  otherViolations(index: number) {
    return this.getSpecificDriver(index).controls.otherViolations
  }
  birthMonth(index: number) {
    return this.getSpecificDriver(index).controls.birthMonth
  }
  birthYear(index: number) {
    return this.getSpecificDriver(index).controls.birthYear
  }
  childrenUnder16(index: number) {
    return this.getSpecificDriver(index).controls.childrenUnder16
  }
  driverLicenseRestrict(index: number) {
    return this.getSpecificDriver(index).controls.driverLicenseRestrict
  }
  drivingPercent(index: number) {
    return this.getSpecificDriver(index).controls.drivingPercent
  }
  educationLevel(index: number) {
    return this.getSpecificDriver(index).controls.educationLevel
  }
  licenses(driverIndex: number) {
    return this.getSpecificDriver(driverIndex).controls.licenses as FormArray
  }
  getSpecificLicense(driverindex: number, licenseIndex: number) {
    return this.licenses(driverindex).at(licenseIndex) as FormGroup<ICountryLicenseFormGroup>
  }
  yearsHoldingLicense(driverindex: number, licenseIndex: number) {
    return this.getSpecificLicense(driverindex, licenseIndex).controls.yearsHoldingLicense
  }
  licenseCountryId(driverindex: number, licenseIndex: number) {
    return this.getSpecificLicense(driverindex, licenseIndex).controls.licenseCountryId
  }

  get additionalDetails() {
    return this.form.controls.additionalDetails
  }
  get isOwnerDoc() {
    return this.additionalDetails.controls.isOwnerDoc
  }
  get ownerEducationLevel() {
    return this.additionalDetails.controls.educationLevel
  }
  get ownerChildrenUnder16() {
    return this.additionalDetails.controls.childrenUnder16
  }
  get ownerBirthDate() {
    return this.additionalDetails.controls.ownerBirthDate
  }
  get drivingRestriction() {
    return this.additionalDetails.controls.drivingRestriction
  }
  get parkingPlace() {
    return this.additionalDetails.controls.parkingPlace
  }
  get ownerAccidents5Years() {
    return this.additionalDetails.controls.accidents5Years
  }
  get annualDistance() {
    return this.additionalDetails.controls.annualDistance
  }
  get motionVector() {
    return this.additionalDetails.controls.motionVector
  }
  get ownerOtherViolations() {
    return this.additionalDetails.controls.otherViolations
  }
  get ownerViolationTypes() {
    return this.additionalDetails.controls.violationTypes
  }
  get sameWorkCity() {
    return this.additionalDetails.controls.sameWorkCity
  }
  get ownerWorkCityId() {
    return this.additionalDetails.controls.workCityId
  }
  get ownerAnotherCountryLicense() {
    return this.additionalDetails.controls.anotherCountryLicense
  }
  get carModified() {
    return this.additionalDetails.controls.carModified
  }
  get modifications() {
    return this.additionalDetails.controls.modifications
  }
  get isAdditionalData() {
    return this.form.controls.isAdditionalData
  }
  get ownerLicenses(){
    return this.additionalDetails.controls.licenses as FormArray;
  }
  ownerYearsHoldingLicense(index:number) {
    return (this.ownerLicenses.at(index) as FormGroup<ICountryLicenseFormGroup>).controls.yearsHoldingLicense;
  }
  ownerLicenseCountryId(index: number) {
    return (this.ownerLicenses.at(index) as FormGroup<ICountryLicenseFormGroup>).controls.licenseCountryId;
  }

  createDriverFormGroup() {
    return this.fb.group<IDriverDetailsFormGroup>({
      idNumber: new FormControl(null, [...INSURNACE_INQUIRE_VALIDATORS['idNumber']]),
      birthYear: new FormControl(null, [...INSURNACE_INQUIRE_VALIDATORS['required']]),
      birthMonth: new FormControl(null, [...INSURNACE_INQUIRE_VALIDATORS['required']]),
      educationLevel: new FormControl(null),
      childrenUnder16: new FormControl(0),
      drivingPercent: new FormControl(null),
      driverLicenseRestrict: new FormControl(null),
      accidents5Years: new FormControl(0),
      relativeRelation: new FormControl(null),
      otherViolations: new FormControl(false),
      violationsTypes: new FormControl(null),
      sameAddress: new FormControl(true),
      residenceCityId: new FormControl(null),
      workCityId: new FormControl(null),
      anotherCountryLicense: new FormControl(false),
      licenses: this.fb.array<FormGroup<ICountryLicenseFormGroup>>([])
    }, { validators: this.driverValidations() })
  }

  addDriver() {
    let driver = this.createDriverFormGroup();
    driver.patchValue(this.driverDefaultValue);
    this.drivers.push(driver)
  }

  removeDriver(index: number) {
    this.drivers.removeAt(index);
  }

  createCountryLicenseGroup() {
    return this.fb.group<ICountryLicenseFormGroup>({
      yearsHoldingLicense: new FormControl(null, [Validators.required]),
      licenseCountryId: new FormControl(null, [Validators.required])
    })
  }

  addCountryLicense(index: number) {
    this.licenses(index).push(this.createCountryLicenseGroup())
  }
  removeCountryLicense(driverIndex: number, licenseIndex: number) {
    this.licenses(driverIndex).removeAt(licenseIndex)
  }

  driverValidations(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const GROUP = control as FormGroup<IDriverDetailsFormGroup>;
      // violation type validate
      if(GROUP.value.otherViolations && !GROUP.value.violationsTypes){
        GROUP.controls.violationsTypes.setErrors({'required':true});
      }else{
        GROUP.controls.violationsTypes.setErrors(null);
      }
      // same address validate
      if(!GROUP.value.sameAddress && (!GROUP.value.workCityId || !GROUP.value.residenceCityId)){
        GROUP.controls.workCityId.setErrors({'required':true});
        GROUP.controls.residenceCityId.setErrors({'required':true});
      }else{
        GROUP.controls.workCityId.setErrors(null);
        GROUP.controls.residenceCityId.setErrors(null);
      }
      return null;
    }
  };

  addOwnerLicense() {
    this.ownerLicenses.push(this.createCountryLicenseGroup())
  }
  removeOwnerLicense(index:number) {
    this.ownerLicenses.removeAt(index)
  }

  ownerDetailsValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const GROUP = control as FormGroup<IAdditionalDetailsFormGroup>;
      // violation type validate
      if(GROUP.value.otherViolations && !GROUP.value.violationTypes){
        GROUP.controls.violationTypes.setErrors({'required':true});
      }else{
        GROUP.controls.violationTypes.setErrors(null);
      }
      // same work city validate
      if(!GROUP.value.sameWorkCity && !GROUP.value.workCityId){
        GROUP.controls.workCityId.setErrors({'required':true});
      }else{
        GROUP.controls.workCityId.setErrors(null);
      }
      // modifications validate
      if(GROUP.value.carModified && !GROUP.value.modifications){
        GROUP.controls.modifications.setErrors({'required':true});
      }else{
        GROUP.controls.modifications.setErrors(null);
      }
      return null;
    }
  };

  hasCountryLicense(value:boolean, index:number){
    value ? this.addCountryLicense(index) : this.licenses(index).clear()
  }

  ownerHasLicense(value:boolean){
    value ? this.addOwnerLicense() : this.ownerLicenses.clear()
  }
}
