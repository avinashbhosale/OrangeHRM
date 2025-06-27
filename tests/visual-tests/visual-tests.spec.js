import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';

//Arrange

//Base URL
const URL = 'https://opensource-demo.orangehrmlive.com';

//Variables for Pages
let loginPage;
let homePage;

//Admin credentials
const adminUsername = 'Admin';
const adminPassword = 'admin123';

//Employee Details
const emp1FirstName = 'Orange1';
const emp1LastName = 'HRM1';
const emp1ID = 'HRM35364';
const emp1Username = 'orangehrm1';
const emp1Password = 'password123';

const emp2FirstName = 'Orange2';
const emp2LastName = 'HRM2';
const emp2ID = 'HRM353641';
const emp2Username = 'orangehrm2';
const emp2Password = 'password123';

test.beforeEach( async({page}) => {

    //Create page objects
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    //Visit the site URL
    await page.goto(URL);
}
);

//Describe block to group test cases together
test.describe('Orange HRM Visual Tests', async() => {

    //Act and Assert
    test('Admin Dashboard', async ({ page }) => {

        //Login as an Admin
        await loginPage.performLogin(adminUsername, adminPassword);

        await page.locator('span.oxd-userdropdown-tab').waitFor();

        //Area to be masked
        const maskArea = page.locator('span.oxd-userdropdown-tab');

        //Wait for the page to load fully
        await expect(page).toHaveScreenshot({ 
            maxDiffPixels: 100,
            mask: [maskArea],
            path: 'AdminDashboard.png'
        });
    });


    test('Employee Search', async ({ page }) => {

        //Login as an Admin
        await loginPage.performLogin(adminUsername, adminPassword);

        //Wait for the page to load fully
        await page.waitForLoadState('networkidle');

        //Assert to check the Admin link on the side bar
        await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible();

        //Go to the Employee List
        await homePage.goToEmployeeList();

        //Search for an Employee by name
        const count = await homePage.searchEmployeeName('orange');

        await page.waitForLoadState('load');

        //Wait for the page to load fully
        await expect(page).toHaveScreenshot({ 
            maxDiffPixels: 100,
            path: 'EmployeeSearch.png'
        });
    });

    //Act and Assert
    test('Add Emplyee Form', async ({ page }) => {

        //Login as an Admin
        await loginPage.performLogin(adminUsername, adminPassword);

        //Go to the Employee List
        await homePage.goToEmployeeList();

        await homePage.addEmployeeButton.click();

        await page.waitForTimeout(2000);

        await expect(page).toHaveScreenshot({ 
            maxDiffPixels: 100,
            path: 'AddEmployeeForm.png'
        });
    });

    //Act and Assert
    test('Employee Personal Details', async ({ page }) => {

        //Login as an Admin
        await loginPage.performLogin(adminUsername, adminPassword);

        //Go to the Employee List
        await homePage.goToEmployeeList();

        //Search for employee to see if the employee is already present
        await homePage.searchEmployeeName(emp1FirstName + ' ' + emp1LastName);
        if(await homePage.dropDownOptionSelector.filter({ hasText: emp1FirstName + ' ' + emp1LastName }).isVisible())
        {
            console.log("Employee is already created");
        }
        else
        {
            //Add Employee Details
            await homePage.addEmployeeDetails(emp1FirstName, emp1LastName, emp1ID);

            //Toggle Login Details creation button
            await homePage.toggleLoginDetailCreation();

            //Assert to chcek the login details form is visibile
            await expect(page.getByText('Username')).toBeVisible();

            //Create Login Details
            await homePage.createLoginDetails(emp1Username, emp1Password);

            //Save the Employee Details
            await homePage.saveEmployeeAddition();

            await page.waitForTimeout(5000);

            await expect(page).toHaveScreenshot({ 
                maxDiffPixels: 100,
                path: 'EmployeeDetails.png'
            });
        }
        
    });

    //Act and Assert
    test('Adding Supervisor', async({ page }) => {

        //Login as an Admin
        await loginPage.performLogin(adminUsername, adminPassword);

        //Go to the Employee List
        await homePage.goToEmployeeList();

        //Check if the employee1 is present else add employee1
        await homePage.employeeNameInput.fill(emp1FirstName + ' ' + emp1LastName);
        await page.waitForTimeout(3000);
        if(await homePage.dropDownOptionSelector.filter({ hasText: emp1FirstName + ' ' + emp1LastName }).isVisible())
        {
            console.log("Employee 1 is already created!");
        }
        else
        {
            await homePage.addEmployeeDetails(emp1FirstName, emp1LastName, emp1ID);
            await homePage.toggleLoginDetailCreation();
            await homePage.createLoginDetails(emp1Username, emp1Password);
            await homePage.saveEmployeeAddition();
            await expect(homePage.successToastMessage).toBeVisible();
        }

        //Go to the Employee List
        await homePage.goToEmployeeList();   

        //Check if the employee2 is present else add employee1
        await homePage.employeeNameInput.fill(emp2FirstName + ' ' + emp2LastName);
        await page.waitForTimeout(3000);
        if(await homePage.dropDownOptionSelector.filter({ hasText: emp2FirstName + ' ' + emp2LastName}).isVisible())
        {
            console.log("Employee 2 is already created!");
        }
        else
        {
            await homePage.addEmployeeDetails(emp2FirstName, emp2LastName, emp2ID);
            await homePage.toggleLoginDetailCreation();
            await homePage.createLoginDetails(emp2Username, emp2Password);
            await homePage.saveEmployeeAddition();
            await expect(homePage.successToastMessage).toBeVisible();
        }

        await page.waitForTimeout(3000);

        //Go to Report-To page for employee2
        if(await homePage.reportToLink.isVisible())
        {
            await homePage.goToReportToPage();
        }
        else 
        {
            await homePage.goToEmployeeList();
            await homePage.searchEmployeeName(emp2FirstName + ' ' + emp2LastName);
            await page.waitForTimeout(3000);
            await homePage.recordTableRows.first().click();
            await homePage.goToReportToPage();
        }
        
        //Add employee1 as the supervisor of employee2
        await homePage.addSupervisor(emp1FirstName + ' ' + emp1LastName);

        //Assert for successful addition of the supervisor
        await expect(homePage.successToastMessage).toBeVisible();

        await page.waitForTimeout(5000);

        await expect(page).toHaveScreenshot({ 
            maxDiffPixels: 100,
            path: 'Supervisor.png'
        });

    });

})