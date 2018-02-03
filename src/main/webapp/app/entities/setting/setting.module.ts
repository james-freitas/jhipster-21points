import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointsSharedModule } from '../../shared';
import { TwentyOnePointsAdminModule } from '../../admin/admin.module';
import {
    SettingService,
    SettingPopupService,
    SettingComponent,
    SettingDetailComponent,
    SettingDialogComponent,
    SettingPopupComponent,
    SettingDeletePopupComponent,
    SettingDeleteDialogComponent,
    settingRoute,
    settingPopupRoute,
    SettingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...settingRoute,
    ...settingPopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointsSharedModule,
        TwentyOnePointsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SettingComponent,
        SettingDetailComponent,
        SettingDialogComponent,
        SettingDeleteDialogComponent,
        SettingPopupComponent,
        SettingDeletePopupComponent,
    ],
    entryComponents: [
        SettingComponent,
        SettingDialogComponent,
        SettingPopupComponent,
        SettingDeleteDialogComponent,
        SettingDeletePopupComponent,
    ],
    providers: [
        SettingService,
        SettingPopupService,
        SettingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsSettingModule {}
