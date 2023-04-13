/// <reference types="cypress" />


const ELEMENTS_W_CLASS = {
    SEARCH_BAR : '.search-keyword',
    ADD_QTY : '.increment',
    SEARCH_PRODUCT : '.product-action',
}
const ELEMENTS_W_IMMD_CHILD = {
    // right arrow is used to reach immediate child of parent 
    ADD_TO_CART_BUTTON : ':nth-child(1) > .product-action > button',
    ITEM_COUNTER: ':nth-child(1) > :nth-child(3) > strong'
}
let cnt;

class greenCart_locators {
    getSearchBar() {
        return cy.get(ELEMENTS_W_CLASS.SEARCH_BAR)
    }

    searchForBrocolli() {
        this.getSearchBar().type('Brocolli')
    }

    selectProductBrocolli() {
        return cy.get(ELEMENTS_W_IMMD_CHILD.ADD_TO_CART_BUTTON)
    }

    checkProductCount() {
        return cy.get(ELEMENTS_W_IMMD_CHILD.ITEM_COUNTER).invoke('text').then((text) => {
            expect(text).to.equal('1');
            cy.task("log", text)
            this.cnt = text;
        })
         
    }

    addToCart() {
        this.selectProductBrocolli().click()
    }

    verify_product_added_to_cart() {
        this.searchForBrocolli()
        //const cnt = this.getProductCount()
        this.addToCart()
        this.checkProductCount()
    }
}

module.exports = new greenCart_locators()