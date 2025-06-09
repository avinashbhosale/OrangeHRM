import { getCurrentDate, getFutureDate } from "./Utils/dateUtils";

export class HomePage {

    //Constructor
    constructor(page) {
        this.page = page;

        //Locator for PIM
        this.pimLink = page.getByRole('link', { name: 'PIM' });
        
        //Locator for Dashboard heading
        this.dashboardHeading = page.locator('h6.oxd-topbar-header-breadcrumb-module');

        //Locator for My info page
        this.myInfoLink = page.getByRole('link', { name: 'My Info'});

        //Locator for Employee search
        this.employeeListLink = page.getByRole('link', { name: 'Employee List' });
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
        this.empIDInput = page.locator('.oxd-form input.oxd-input');
        this.employeeSearchButton = page.getByRole('button', { name: 'Search' });

        //Locators for Records Table
        this.recordTableRows = page.locator('div.oxd-table-body div.oxd-table-row');
        this.recordText = page.locator('div.orangehrm-horizontal-padding span.oxd-text--span');
        this.infoToastMessage = page.locator('div.oxd-toast--info');

        //Locators for Adding an Employee
        this.addEmployeeButton = page.getByRole('link', { name: 'Add Employee' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIDInput = page.getByRole('textbox').nth(4);
        this.createLoginDetailsToggle = page.locator('form span');
        this.employeeUsernameInput = page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input');
        this.employeeStatusEnabled = page.locator('label').filter({ hasText: 'Enabled' }).locator('span');
        this.employeeStatusDisabled = page.locator('label').filter({ hasText: 'Disabled' }).locator('span');
        this.employeePasswordInput = page.locator('input[type="password"]').first();
        this.employeeConfirmPasswordInput = page.locator('input[type="password"]').nth(1);
        this.cancelEmployeeAdditionButton = page.getByRole('button', { name: 'Cancel' });
        this.saveEmployeeAdditonButton = page.getByRole('button', { name: 'Save' });
        this.successToastMessage = page.locator('div.oxd-toast--success');

        //Locators for User Profile Drop Down
        this.userDropDown = page.locator('p.oxd-userdropdown-name');
        this.logoutLink = page.locator('a[role="menuitem"]').filter({ hasText: 'Logout' });

        //Locator for My Info page
        this.otherID = page.locator('(//div/input)[6]');
        this.nationalityDropDown = page.locator('.oxd-select-text-input').nth(0);
        this.maritalStatusDropDown = page.locator('.oxd-select-text-input').nth(1);
        this.dropDownOptionSelector = page.locator('div[role="option"] span');
        this.savePersonalDetailsButton = page.locator('form').filter({ hasText: 'Employee Full' }).getByRole('button');

        //Locator for Report-To page
        this.reportToLink = page.getByRole('link', { name: 'Report-to' });
        this.addSupervisorButton = page.locator('button.oxd-button--text').first();
        this.supervisorNameInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
        this.supervisorReportMethodDropdown = page.locator('div.oxd-select-text-input').first();
        this.supervisorSaveButton = page.locator('button[type=submit]'); 

        //Locators for Leave Page
        this.leavePageLink = page.getByRole('link', { name: 'Leave' });
        this.myLeaveLink = page.getByRole('link', { name: 'My Leave' });
        this.applyLeaveLink = page.getByRole('link', { name: 'Apply' });
        this.leaveTypeDropdown = page.locator('div.oxd-select-text-input');
        this.fromDateDropdown = page.locator('div.oxd-date-input input').first();
        this.toDateDropdown = page.locator('div.oxd-date-input input').last();
        this.leaveComments = page.locator('div > textarea');
        this.leaveApplyButton = page.locator('div.oxd-form-actions > button'); 

        //Locators for Leave Entitlements
        this.entitlementsMenu = page.getByText('Entitlements', { exact: true });
        this.entitlementsMenuLinks = page.locator('ul.oxd-dropdown-menu a');
        this.entitlementsEmployeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.entitlementsLeaveTypeDropdown = page.locator('div.oxd-select-text-input').first();
        this.entitlementsLeavePeriodDropdown = page.locator('div.oxd-select-text-input').last();
        this.entitlementsInput = page.getByRole('textbox').nth(2);
        this.entitlementsSaveButton = page.getByRole('button', { name: 'Save' });
        this.entitlementsConfirmPopup = page.locator('div.orangehrm-modal-header');
        this.entitlementsConfirmButton = page.locator('div.orangehrm-modal-footer button.oxd-button--secondary');

        //Locators for Leave Approval
        this.leaveListLink = page.getByRole('link', { name: 'Leave List' });
        this.leaveSearchButton = page.getByRole('button', { name: 'Search' });
        this.leaveApproveButton = page.locator('button.oxd-button--label-success').first();
        this.leaveApprovalConfirmButton = page.getByRole('button', { name: ' Yes, Confirm '});
    }

    //Method to go to the Employee List
    async goToEmployeeList() {

        await this.pimLink.click();
        await this.employeeListLink.click();
    }

    //Method to search for Employee by name and return the count of rows found in eomployee table
    async searchEmployeeName(name) {

        await this.employeeNameInput.click();
        await this.employeeNameInput.fill(name);
        await this.employeeSearchButton.click();

        await this.page.waitForLoadState('networkidle');

        const count = await this.recordTableRows.count();
        return count;
    }

    //Method to search for Employee by ID and return the count of rows found in employee table
    async searchEmployeeID(id) {

        await this.employeeNameInput.click();
        await this.empIDInput.fill(id);           
        await this.employeeSearchButton.click();

        await this.page.waitForLoadState('networkidle');

        const count = await this.recordTableRows.count();
        return count;
    }

    //Method to add employee details
    async addEmployeeDetails(firstName, lastName, id) {

        await this.addEmployeeButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIDInput.fill(id);

    }

    //Method to toggle the login detail creation
    async toggleLoginDetailCreation() {

        await this.createLoginDetailsToggle.click();
    }

    //Method for create login details for employee while adding an employee
    async createLoginDetails(username, password) {

        await this.employeeUsernameInput.click();
        await this.employeeUsernameInput.fill(username);
        await this.employeeStatusEnabled.click();
        await this.employeePasswordInput.fill(password);
        await this.employeeConfirmPasswordInput.fill(password);

    }

    //Method to save the employee addition
    async saveEmployeeAddition() {

        await this.saveEmployeeAdditonButton.click();
    }

    //Method to cancel the employee addition
    async cancelEmployeeAddition() {

        await this.cancelEmployeeAdditionButton.click();
    }

    //Method to add Leave Entitlements
    async addLeaveEntitlements(employeeName, numberOfDays) {

        await this.leavePageLink.click();
        await this.entitlementsMenu.click();
        await this.entitlementsMenuLinks.filter( { hasText: 'Add Entitlements' }).click();

        await this.entitlementsEmployeeName.fill(employeeName);
        await this.dropDownOptionSelector.filter({ hasText: employeeName}).click();
        await this.entitlementsLeaveTypeDropdown.click();
        await this.dropDownOptionSelector.filter({ hasText: 'CAN - Personal' }).click();
        await this.entitlementsInput.fill(numberOfDays);

        await this.entitlementsSaveButton.click();

        await this.entitlementsConfirmButton.click();
    }

    //Method to log out
    async performLogout() {

        await this.userDropDown.click();
        await this.logoutLink.click();
    }

    //Method to go to My Info page
    async goToMyInfo() {

        await this.myInfoLink.click();
    }

    //Method to update profile Details
    async updateMyPersonalInfo() {

        await this.otherID.click();
        await this.otherID.fill('test231');
        await this.nationalityDropDown.click();
        await this.dropDownOptionSelector.filter({ hasText: 'Indian' }).click();
        await this.maritalStatusDropDown.click();
        await this.dropDownOptionSelector.filter({ hasText: 'Single' }).click();
        await this.savePersonalDetailsButton.click();
    }

    //Method to apply for Leave
    async applyForLeaves(leaveType, numberOfDays) {
        
        await this.leavePageLink.click();
        await this.applyLeaveLink.click();
        await this.page.waitForTimeout(3000);
        await this.leaveTypeDropdown.click();
        await this.dropDownOptionSelector.filter({ hasText: leaveType}).click();

        //Generate date using dateUtils functions
        const fromDate = getCurrentDate();
        const toDate = getFutureDate(numberOfDays);

        await this.fromDateDropdown.clear();
        await this.fromDateDropdown.fill(fromDate);
        await this.toDateDropdown.clear();
        await this.toDateDropdown.fill(toDate);
        await this.leaveComments.fill('Test');

        await this.leaveApplyButton.click();
    }

    //Method for Approving Leaves
    async approveLeaves(employeeName) {

        await this.leavePageLink.click();
        await this.leaveListLink.click();

        await this.employeeNameInput.click();
        await this.employeeNameInput.fill(employeeName);
        await this.page.waitForTimeout(3000);
        await this.dropDownOptionSelector.filter({ hasText: employeeName}).click();
        await this.leaveSearchButton.click();
        const row = await this.recordTableRows.filter({ has: this.page.locator('div.oxd-table-cell div'), hasText: employeeName});

        await row.locator('button.oxd-button--label-success').click();
    }

    //Method to go to Report-To page
    async goToReportToPage() {

        await this.reportToLink.click();
    }

    //Method to add supervisor
    async addSupervisor(employeeName) {

        await this.addSupervisorButton.click();
        await this.supervisorNameInput.fill(employeeName);
        await this.page.waitForTimeout(3000);
        await this.dropDownOptionSelector.filter({ hasText: employeeName}).click();
        await this.supervisorReportMethodDropdown.click();
        await this.dropDownOptionSelector.getByText('Direct', {exact: true}).click();
        await this.supervisorSaveButton.click();
    }
}