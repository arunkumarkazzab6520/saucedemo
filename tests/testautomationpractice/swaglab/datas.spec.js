import { test, expect } from '@playwright/test'
import { login } from './login'
import { cart } from './cart'
import { checkout } from './checkout'

test('test', async ({ page }) => 
{
        const data = new login (page)
        const cartPage = new cart(page)
        const checkoutpage = new checkout(page)
        await data.url()
        const username_passwords = [{username: "standard_user",password: "secret_sauce1",success: false},
                                    {username: "standard_user1",password: "secret_sauce",success: false},
                                    {username: "standard_user",password: "secret_sauce",success: true}]
        for (const [index,item] of username_passwords.entries()) 
        {
            await data.textbox(item.username, item.password)
            if (!item.success) 
                {
                    await expect(data.errorMessage).toContainText("Epic sadface: Username and password do not match any user in this service")
                    console.log(`Attempt ${index + 1}: Login Failed`)
                    await data.clearFields()
                } 
                else 
                {
                    await expect(page).toHaveURL(/inventory.html/)
                    console.log(`Attempt ${index + 1}: Login Successful`)
                }
        }
        const products = ["Sauce Labs Backpack","Sauce Labs Bike Light"]
        await cartPage.addProductsToCart(products)
        await checkoutpage.addProductsToCartbutton("arun","kumar","636029")
        await checkoutpage.selectFilter("Price (low to high)")
})