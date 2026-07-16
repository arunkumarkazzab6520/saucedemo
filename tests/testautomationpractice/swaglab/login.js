const { expect } = require("@playwright/test")

exports.login = class login
{
    constructor(page)
    {
        this.page = page 
        //user name and password locators
        this.username = page.getByRole('textbox', { name: 'Username' })
        this.userpassword = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.locator("//input[@id='login-button']")
        this.errorMessage = page.locator('[data-test="error"]')
    }
    //login page url
    async url()
    {
        await this.page.goto('https://www.saucedemo.com/')
    }

    async textbox(name,password)
    {
        await expect(this.username).toBeVisible()
        await expect(this.username).toBeEditable()
        await expect(this.username).toBeEmpty()
        await this.username.fill(name)
        await expect(this.userpassword).toBeVisible()
        await expect(this.userpassword).toBeEditable()
        await expect(this.userpassword).toBeEmpty()
        await this.userpassword.fill(password)
        await expect(this.loginButton).toBeEnabled()
        await expect(this.loginButton).toBeVisible()
        await this.loginButton.click()
    }
    async clearFields()
    {
    await this.username.clear()
    await this.userpassword.clear()
    }
}