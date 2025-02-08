import { ForgotPasswordComponentComponent } from "../../components/views-components/auth/forgot-password-component/forgot-password-component.component";
import { LoginComponentComponent } from "../../components/views-components/auth/login-component/login-component.component";
import { OtpComponentComponent } from "../../components/views-components/auth/otp-component/otp-component.component";
import { RegisterComponentComponent } from "../../components/views-components/auth/register-component/register-component.component";
import { ResetPasswordComponentComponent } from "../../components/views-components/auth/reset-password-component/reset-password-component.component";
import { IAuthDialog } from "../../models/layout-models/auth.interface";
import { EFormType } from "../enums/auth.enum";



export class AuthDialogFactory {
    createDialogContent(type: EFormType) {
        switch (type) {
            case EFormType.login:
                return new LoginDialog()

            case EFormType.register:
                return new RegisterDialog()

            case EFormType.forgotPassword:
                return new ForgotPasswordDialog()

            case EFormType.resetPassword:
                return new ResetPasswordDialog()

            case EFormType.otp:
                return new OtpDialog()

            default:
                return new LoginDialog()
        }
    }
}

export class LoginDialog implements IAuthDialog {
    currentComponent: EFormType = EFormType.login;
    title: string = 'views.auth.welcomeBack';
    subtitle: string = 'views.auth.enterPersonalInfo';
    buttonText: string = 'views.auth.newAccount';
    component  = LoginComponentComponent;
    headingText: string = 'views.auth.login'
}
export class RegisterDialog implements IAuthDialog {
    currentComponent: EFormType = EFormType.register;
    title: string = 'views.auth.welcome';
    subtitle: string = 'views.auth.registerAccount';
    buttonText: string = 'views.auth.login';
    component = RegisterComponentComponent;
    headingText: string = 'views.auth.newAccount'
}
export class ForgotPasswordDialog implements IAuthDialog {
    currentComponent: EFormType = EFormType.forgotPassword;
    title: string = 'views.auth.noProblem';
    subtitle: string = 'views.auth.ifForgot';
    buttonText: string = 'views.auth.login';
    component = ForgotPasswordComponentComponent;
    headingText: string = 'views.auth.forgotPassword'
}
export class ResetPasswordDialog implements IAuthDialog {
    currentComponent: EFormType = EFormType.resetPassword;
    title: string = 'views.auth.reset';
    subtitle: string = 'views.auth.resetDesc';
    buttonText: string = 'views.auth.login';
    component = ResetPasswordComponentComponent;
    headingText: string = 'views.auth.reset'
}
export class OtpDialog implements IAuthDialog {
    currentComponent: EFormType = EFormType.forgotPassword;
    title: string = 'views.auth.codeSent';
    subtitle: string = 'views.auth.enterCodeDesc';
    buttonText: string = 'views.auth.login';
    component = OtpComponentComponent;
    headingText: string = 'views.auth.enterCode'
}