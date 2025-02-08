import { AuthGuard } from './core/guards/auth/auth.guard';
import { Routes } from '@angular/router';
import { ERoutes } from './core/enums/routes.enum';
import { IRoutingData } from './models/routing.interface';
import { insuranceAdditionalData } from './core/guards/insuranceSteps/insurance-steps.guard';
import { appResolver } from './app.resolver';
import { AppComponent } from './app.component';

const insuranceShowRoutes: Routes = [
    {
        path: '',
        redirectTo: ERoutes.additionalData,
        pathMatch: 'full',
        data:{
            animation: 'additionalData',
        } as IRoutingData,
    },
    {
        path: ERoutes.additionalData,
        loadComponent: ()=> import ('./views/insurance-show-pages/additional-data-view/additional-data-view.component').then(m=> m.AdditionalDataViewComponent),
        data:{
            animation: 'additionalData',
        } as IRoutingData
    },
    {
        path: ERoutes.orderSummary,
        loadComponent: ()=> import ('./views/insurance-show-pages/order-summary/order-summary.component').then(m=> m.OrderSummaryComponent),
        data:{
            animation: ERoutes.orderSummary,
        } as IRoutingData
    },
    {
        path: ERoutes.compareOffers,
        loadComponent: ()=> import ('./views/insurance-show-pages/compare-offers/compare-offers.component').then(m=> m.CompareOffersComponent),
        data:{
            animation: ERoutes.compareOffers,
        } as IRoutingData
    },
]

const mainLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./views/home-view/home-view.component').then(m => m.HomeViewComponent),
                data:{
                    animation: 'home',
                } as IRoutingData
            },
            {
                path: ERoutes.about,
                loadComponent: () => import('./views/about-view/about-view.component').then(m => m.AboutViewComponent),
                data:{
                    animation: 'about',
                } as IRoutingData
            },
            {
                path: `${ERoutes.blogPage}/:slug`,
                loadComponent: () => import('./views/blog-single-view/blog-single-view.component').then(m => m.BlogSingleViewComponent),
                data:{
                    animation: 'blogPage',
                } as IRoutingData
            },
            {
                path: ERoutes.insuranceShow,
                loadComponent: () => import('./layouts/insurance-steps-layout/insurance-steps-layout.component').then(m => m.InsuranceStepsLayoutComponent),
                canActivate:[insuranceAdditionalData],
                children:[
                    ...insuranceShowRoutes
                ]
            },
        ]
    }
]

const profileLayoutRoutes : Routes = [
    {
        path: '',
        redirectTo: `${ERoutes.quotations}`,
        pathMatch: 'full',
    },
    {
        path: ERoutes.quotations,
        loadComponent: () => import('./views/profile-pages/quotations-view/quotations-view.component').then(m => m.QuotationsViewComponent),
        data:{
            animation: 'profileCards',
            title: 'views.profile.quotations.title',
        } as IRoutingData
    },
    {
        path: ERoutes.invoices,
        loadComponent: () => import('./views/profile-pages/invoices-view/invoices-view.component').then(m => m.InvoicesViewComponent),
        data:{
            animation: 'profileCards',
            title: 'views.profile.invoices.title',
        } as IRoutingData
    },
    {
        path: ERoutes.cards,
        loadComponent: () => import('./views/profile-pages/cards-view/cards-view.component').then(m => m.CardsViewComponent),
        data:{
            animation: 'profileCards',
            title: 'views.profile.cards.title',
        } as IRoutingData
    },
    {
        path: ERoutes.cars,
        loadComponent: () => import('./views/profile-pages/cars-view/cars-view.component').then(m => m.CarsViewComponent),
        data:{
            animation: 'profileCars',
            title: 'views.profile.cars.title',
        } as IRoutingData
    },
    {
        path: ERoutes.uncompletedOrders,
        loadComponent: () => import('./views/profile-pages/uncompleted-orders-view/uncompleted-orders-view.component').then(m => m.UncompletedOrdersViewComponent),
        data:{
            animation: 'profileUncompletedOrders',
            title: 'views.profile.uncompletedOrders.title',
        } as IRoutingData
    },
    {
        path: ERoutes.supportTicket,
        loadComponent: () => import('./views/profile-pages/support-tickets-view/support-tickets-view.component').then(m => m.SupportTicketsViewComponent),
        data:{
            animation: 'profileSupport',
            title: 'views.profile.supportTicket.title',
        } as IRoutingData
    },
    {
        path: ERoutes.personalInfo,
        loadComponent: () => import('./views/profile-pages/personal-info-view/personal-info-view.component').then(m => m.PersonalInfoViewComponent),
        data:{
            animation: 'profileInfo',
            title: 'views.profile.personalInfo.title',
        } as IRoutingData
    },
    {
        path: ERoutes.epayments,
        loadComponent: () => import('./views/profile-pages/e-payments-view/e-payments-view.component').then(m => m.EPaymentsViewComponent),
        data:{
            animation: 'profilePayments',
            title: 'views.profile.epayments.title',
        } as IRoutingData
    },
]

const breadcrumbLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/breadcrumb-layout/breadcrumb-layout.component').then(m => m.BreadcrumbLayoutComponent),
        children: [
            {
                path: ERoutes.contact,
                loadComponent: () => import('./views/contact-view/contact-view.component').then(m => m.ContactViewComponent),
                data:{
                    animation: 'contact',
                    title: 'views.contact.title'
                } as IRoutingData
            },
            {
                path: ERoutes.blog,
                loadComponent: () => import('./views/blog-view/blog-view.component').then(m => m.BlogViewComponent),
                data:{
                    animation: 'blog',
                    title: 'views.blog.title'
                } as IRoutingData
            },
            {
                path: ERoutes.privacyPolicy,
                loadComponent: () => import('./views/privacy-policy-view/privacy-policy-view.component').then(m => m.PrivacyPolicyViewComponent),
                data:{
                    animation: 'privacy policy',
                    title: 'views.privacyPolicy.privacyPolicy'
                } as IRoutingData
            },
            {
                path: ERoutes.termsConditions,
                loadComponent: () => import('./views/terms-conditions-view/terms-conditions-view.component').then(m => m.TermsConditionsViewComponent),
                data:{
                    animation: 'terms and conditions',
                    title: 'views.termsAndConditions.termsAndConditions'
                } as IRoutingData
            },
            {
                path: ERoutes.checkout,
                loadComponent: () => import('./views/payment-view/payment-view.component').then(m => m.PaymentViewComponent),
                canActivate:[insuranceAdditionalData],
                data:{
                    animation: 'Checkout',
                    title: 'views.checkout.checkout'
                } as IRoutingData
            },
            {
                path: ERoutes.paymentStatus,
                loadComponent: () => import('./views/payment-status-view/payment-status-view.component').then(m => m.PaymentStatusViewComponent),
                canActivate: [AuthGuard],
                data:{
                    animation: 'PayomentStatus',
                    title: 'views.paymentStatus.paymentStatus'
                } as IRoutingData
            },
            {
                path: ERoutes.profile,
                loadComponent: () => import('./layouts/profile-layout/profile-layout.component').then(m => m.ProfileLayoutComponent),
                canActivate: [AuthGuard],
                children:[
                    ...profileLayoutRoutes
                ],
                data:{
                    title: 'views.profile.title',
                    withLogoutRedirect: true,
                } as IRoutingData
            },
        ]
    }
]



export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        resolve:{data: appResolver},
        children:[
            ...mainLayoutRoutes,
            ...breadcrumbLayoutRoutes,
        ]
    }
];
