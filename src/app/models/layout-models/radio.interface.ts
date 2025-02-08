export interface IRadioInput {
    label: string,
    id: string,
    value: string | boolean | number,
    checked?: boolean,
    control?: string
}

export interface IFormStructure {
    insurancePurpose: {
        label: string,
        name: string
        radioButtons: IRadioInput[]
    },
    registrationType: {
        label: string,
        name: string
        radioButtons: IRadioInput[]
    }
}