import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Setting e2e test', () => {

    let navBarPage: NavBarPage;
    let settingDialogPage: SettingDialogPage;
    let settingComponentsPage: SettingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Settings', () => {
        navBarPage.goToEntity('setting');
        settingComponentsPage = new SettingComponentsPage();
        expect(settingComponentsPage.getTitle()).toMatch(/twentyOnePointsApp.setting.home.title/);

    });

    it('should load create Setting dialog', () => {
        settingComponentsPage.clickOnCreateButton();
        settingDialogPage = new SettingDialogPage();
        expect(settingDialogPage.getModalTitle()).toMatch(/twentyOnePointsApp.setting.home.createOrEditLabel/);
        settingDialogPage.close();
    });

    it('should create and save Settings', () => {
        settingComponentsPage.clickOnCreateButton();
        settingDialogPage.setWeeklyGoalInput('5');
        expect(settingDialogPage.getWeeklyGoalInput()).toMatch('5');
        settingDialogPage.setWeightUnitsInput('5');
        expect(settingDialogPage.getWeightUnitsInput()).toMatch('5');
        settingDialogPage.userSelectLastOption();
        settingDialogPage.save();
        expect(settingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SettingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-setting div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SettingDialogPage {
    modalTitle = element(by.css('h4#mySettingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    weeklyGoalInput = element(by.css('input#field_weeklyGoal'));
    weightUnitsInput = element(by.css('input#field_weightUnits'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWeeklyGoalInput = function(weeklyGoal) {
        this.weeklyGoalInput.sendKeys(weeklyGoal);
    }

    getWeeklyGoalInput = function() {
        return this.weeklyGoalInput.getAttribute('value');
    }

    setWeightUnitsInput = function(weightUnits) {
        this.weightUnitsInput.sendKeys(weightUnits);
    }

    getWeightUnitsInput = function() {
        return this.weightUnitsInput.getAttribute('value');
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
