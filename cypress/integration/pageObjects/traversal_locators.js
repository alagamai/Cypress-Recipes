/// <reference types="cypress" />


const ELEMENTS_KS = {
    BREADCRUMB : '.traversal-breadcrumb.breadcrumb',
    CHILD_ELE : '.active',
    DOM_LIST:   '.traversal-list'
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
            cy.task("log", $ele.text())
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
    
}

module.exports = new traversal_locators()