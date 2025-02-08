import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EQueryParams } from '../enums/routes.enum';

export function navigateToCurrentRouteWithNewQueryParams(route:ActivatedRoute, router:Router, redirectRoute:string) {
    const extras: NavigationExtras = {
        relativeTo: route,
        queryParams: { [EQueryParams.redirectTo]: redirectRoute },
        queryParamsHandling: 'merge'
    };
    router.navigate([], extras);
}