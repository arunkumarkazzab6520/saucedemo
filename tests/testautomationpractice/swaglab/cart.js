
const { expect } = require('@playwright/test')

exports.cart = class cart
{
    constructor(page)
    {
        this.page = page
        this.productlist = page.locator('.inventory_item')
        this.shoppingcartlist = page.locator('.shopping_cart_badge')
    }
    
    async addProductsToCart(products)
    {
        for (const product of products)
            {
            const productCard = this.productlist.filter({has: this.page.getByText(product)})
            await productCard.getByRole('button', { name: 'Add to cart' }).click()
            }
            await expect(this.shoppingcartlist).toHaveText('2')
            console.log(`Cart count verified: ${products.length}`)
    }
}