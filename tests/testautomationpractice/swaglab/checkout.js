
const { expect } = require('@playwright/test')

exports.checkout = class checkout
{
    constructor(page)
    {
        this.page = page
        this.shoppingcartlst = page.locator('.shopping_cart_badge')
        this.checkoutbutton = page.locator('[data-test="checkout"]')
        this.firstname = page.getByPlaceholder('First Name')
        this.lastname = page.getByPlaceholder('Last Name')
        this.postalcode = page.getByPlaceholder('Zip/Postal Code')
        this.continueshoppingbutton = page.locator("//input[@id='continue']")
        this.finishbutton = page.locator("//button[@id='finish']")
        this.verifymsg = page.locator('.complete-header')
        this.homepagebutton = page.locator("//button[@id='back-to-products']")
        this.filterdropdownbox = page.locator("//select[@class='product_sort_container']")
        this.filteroptions=page.locator("//select[@class='product_sort_container']/option")
        this.orderMessage = this.page.getByText('Thank you for your order!')
    }
    
    async addProductsToCartbutton(fname,lname,pcode) 
    {
    await this.shoppingcartlst.click()
    await this.checkoutbutton.click()
    await this.firstname.fill(fname)
    await this.lastname.fill(lname)
    await this.postalcode.fill(pcode)
    await this.continueshoppingbutton.click()
    await this.finishbutton.click()
    await expect(this.orderMessage).toBeVisible()
    const msg = await this.orderMessage.textContent()
    console.log("Message verified: " + msg)
    await this.homepagebutton.click()
    }

    async selectFilter(filterName) 
    {
        const options = await this.filteroptions.all()
        for (const option of options) 
        {
            const text = (await option.textContent()).trim()
            if (text === filterName) 
            {
                await this.filterdropdownbox.selectOption({ label: text })
                console.log(`Selected Filter: ${text}`)
                break
            }
        }
        await this.page.locator("//button[@id='react-burger-menu-btn']").click()
        const logout = await this.page.locator("//a[@id='logout_sidebar_link']")
        await expect(logout).toHaveText("Logout")
        await this.page.waitForTimeout(3000)
        await logout.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/")
    }
}