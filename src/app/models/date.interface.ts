export interface IDateFactory{
    
}

export interface IDateService{
    months: IMonth[],
    years: number[],
    generateArrayOfYears():number[],
}

export interface IMonth{
    id: number,
    name: string
}