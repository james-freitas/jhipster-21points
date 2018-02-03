/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { SettingComponent } from '../../../../../../main/webapp/app/entities/setting/setting.component';
import { SettingService } from '../../../../../../main/webapp/app/entities/setting/setting.service';
import { Setting } from '../../../../../../main/webapp/app/entities/setting/setting.model';

describe('Component Tests', () => {

    describe('Setting Management Component', () => {
        let comp: SettingComponent;
        let fixture: ComponentFixture<SettingComponent>;
        let service: SettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [SettingComponent],
                providers: [
                    SettingService
                ]
            })
            .overrideTemplate(SettingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Setting(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.settings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
