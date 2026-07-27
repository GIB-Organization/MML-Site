export enum ELookupCategory{
    vehicleUses = 1,
    educations = 2,
    medicalConditions = 3,
    relationships = 4,
    drivingPercentages = 5,
    transmissionTypes = 6,
    parkingLocations = 7,
    mileages = 8,
    violations = 9,
    vehicleSpecifications = 18,
    // MMP (medical malpractice) categories - match backend LookupCategoryEnum exactly. These
    // numerically overlap with the car-domain members above (unused/dead code, left from the
    // Cars fork) - only the MMP names below are meaningful for this product.
    MainProfessions = 5,
    SubProfessions = 6,
    ExperiencePeriods = 7,
    Deductibles = 8,
    Declarations = 9,
}