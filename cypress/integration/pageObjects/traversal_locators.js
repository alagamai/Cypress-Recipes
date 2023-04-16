/// <reference types="cypress" />


const ELEMENTS_KS = {
    BREADCRUMB : '.traversal-breadcrumb.breadcrumb',
    CHILD_ELE : '.active',
    DOM_LIST:   '.traversal-list',
    DOM_ELE:  '.traversal-mark',
    HIGHLIGHT: 'highlight',
    GRAND_PARENT_ELE: 'blockquote',
    CHILD_ELE1: '.traversal-cite',
    PARENT_ELE: '.clothes-nav',
}

let cnt;

class traversal_locators {
    getBreadcrumb() {
        return cy.get(ELEMENTS_KS.BREADCRUMB)
    }

    getChildrenOfBreadcrumb() {
        this.getBreadcrumb().children().each(($e1, index, $list) => {
            cy.task("log", $e1.text())
        })
    }

    getSpecificChildrenOfBreadcrumb() {
        return this.getBreadcrumb().children(ELEMENTS_KS.CHILD_ELE)
    }

    getDomList() {
        return cy.get(ELEMENTS_KS.DOM_LIST)
    }

    printDomElements() {
        this.getDomList().each(($ele, indiex, $list) => {
            cy.task("log", "Listing DOM elements : " + $ele.text())
        })
    }

    printDomElements_Children() {
        this.getDomList().children().each(($ele, indiex, $list) => {
            cy.task("log", "Listing DOM elements : " + $ele.text())
        })
    }

    getDomElementsCount() {
        return this.getDomList().children().its('length')
    }

    getDomElementbyIndex(id) {
        this.getDomList().children().eq(id).invoke('text').then(t => {
            cy.task("log", t)
        })
    }
    
    getParentDOMElement() {
        return cy.get(ELEMENTS_KS.DOM_ELE).parent()
    }

    getParentDOMElementUsingContains() {
        return cy.contains(ELEMENTS_KS.HIGHLIGHT).parent()
    }

    getChildDom() {
        return cy.get(ELEMENTS_KS.CHILD_ELE1)
    }

    getParentsOfDOM() {
        return this.getChildDom().parents(ELEMENTS_KS.GRAND_PARENT_ELE)
    }
    getParentsUntilDOM() {
        return this.getChildDom().parentsUntil(ELEMENTS_KS.GRAND_PARENT_ELE)
    }

    assertOnParentsUntilDOM() {
        cy.get(ELEMENTS_KS.PARENT_ELE).find(ELEMENTS_KS.CHILD_ELE)
        .parentsUntil(ELEMENTS_KS.PARENT_ELE)
        .should('have.length', 2)
    }
}

module.exports = new traversal_locators()