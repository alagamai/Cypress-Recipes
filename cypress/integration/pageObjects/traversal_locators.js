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
    TRAVERSAL_BADGE: '.traversal-badge',
    CLOSEST_DOM_LI: 'li',
    CLOSEST_DOM_DIV: 'div',
    CLOSEST_DOM_UL: 'ul',
    TRAVERSAL_PILLS: '.nav-pills .active',
    NAV_ELE : '.nav',
    BIRDS_GROUP_DOM: '.birds',
    BIRDS_GROUP_CHILD_DOM: '.birds .active',
    FOOD_LIST_DOM: '.foods-list',
    NUTS: '#nuts',
    ALMONDS: 'almonds'
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

    getChildDom1() {
        return cy.get(ELEMENTS_KS.CHILD_ELE1)
    }

    getParentsOfDOM() {
        return this.getChildDom1().parents(ELEMENTS_KS.GRAND_PARENT_ELE)
    }
    getParentsUntilDOM() {
        return this.getChildDom1().parentsUntil(ELEMENTS_KS.GRAND_PARENT_ELE)
    }

    assertOnParentsUntilDOM() {
        cy.get(ELEMENTS_KS.PARENT_ELE).find(ELEMENTS_KS.CHILD_ELE)
        .parentsUntil(ELEMENTS_KS.PARENT_ELE)
        .should('have.length', 2)
    }

    clickChildfromParent() {
            cy.get(ELEMENTS_KS.PARENT_ELE).find(ELEMENTS_KS.CHILD_ELE)
            .contains('Pants').click()
    }

    getClosestDOMofLi() {
        return cy.get(ELEMENTS_KS.TRAVERSAL_BADGE).closest('li')
    }

    getClosestDOMofDiv() {
        return cy.get(ELEMENTS_KS.TRAVERSAL_BADGE).closest('div')
    }

    getClosestDOMofUl() {
        return cy.get(ELEMENTS_KS.TRAVERSAL_BADGE).closest('ul')
    }

    getTraversalPills() {
        return cy.get(ELEMENTS_KS.TRAVERSAL_PILLS)
    }

    getNavElement() {
        return cy.get(ELEMENTS_KS.NAV_ELE)
    }
    getBirdsGroupDom() {
        return cy.get(ELEMENTS_KS.BIRDS_GROUP_DOM)
    }

    getChildOfBirdsGroupDom() {
        return cy.get(ELEMENTS_KS.BIRDS_GROUP_CHILD_DOM)
    }
    findChildDomofBitdsGroup() {
        return this.getBirdsGroupDom().find(ELEMENTS_KS.CHILD_ELE)
    }
    getFoodList() {
        return cy.get(ELEMENTS_KS.FOOD_LIST_DOM)
    }
    findNutsfromFoodList() {
        return cy.get(ELEMENTS_KS.FOOD_LIST_DOM).find(ELEMENTS_KS.NUTS)
    }
}

module.exports = new traversal_locators()