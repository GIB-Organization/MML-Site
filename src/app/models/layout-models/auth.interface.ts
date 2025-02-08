import { Component } from "@angular/core";
import { EFormType } from "../../core/enums/auth.enum";

export interface IAuthDialog {
    title: string,
    subtitle: string,
    buttonText: string,
    component: any,
    currentComponent: EFormType,
    headingText: string
}