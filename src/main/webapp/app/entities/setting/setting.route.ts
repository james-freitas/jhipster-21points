import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SettingComponent } from './setting.component';
import { SettingDetailComponent } from './setting-detail.component';
import { SettingPopupComponent } from './setting-dialog.component';
import { SettingDeletePopupComponent } from './setting-delete-dialog.component';

@Injectable()
export class SettingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const settingRoute: Routes = [
    {
        path: 'setting',
        component: SettingComponent,
        resolve: {
            'pagingParams': SettingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'setting/:id',
        component: SettingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const settingPopupRoute: Routes = [
    {
        path: 'setting-new',
        component: SettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'setting/:id/edit',
        component: SettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'setting/:id/delete',
        component: SettingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
