/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { SettingDetailComponent } from '../../../../../../main/webapp/app/entities/setting/setting-detail.component';
import { SettingService } from '../../../../../../main/webapp/app/entities/setting/setting.service';
import { Setting } from '../../../../../../main/webapp/app/entities/setting/setting.model';

describe('Component Tests', () => {

    describe('Setting Management Detail Component', () => {
        let comp: SettingDetailComponent;
        let fixture: ComponentFixture<SettingDetailComponent>;
        let service: SettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [SettingDetailComponent],
                providers: [
                    SettingService
                ]
            })
            .overrideTemplate(SettingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Setting(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.setting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
