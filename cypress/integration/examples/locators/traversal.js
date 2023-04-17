import  traversal from '../../pageObjects/traversal_locators.js'

describe('traversal locators test', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/traversal')
    })
    it('children() - get children and print', () => {
        traversal.getChildrenOfBreadcrumb()
    })
    it('children() - get count of children', () => {
        //cy.pause()
        traversal.getBreadcrumb().children().its('length').then(len => {
            cy.task("log", "no. of children :" + len)
        })
    })
    it('children() - get first child DOM element', () => {
        traversal.getBreadcrumb().children().first().should('contain', 'Home')
    })
    it('children() - get a DOM element at specific index', () => {
        traversal.getBreadcrumb().children().eq(1).should('contain', 'Library')
    })
    it('children() - get a DOM element at specific index - 1', () => {
        traversal.getBreadcrumb().children().eq(1).should('contain', 'Library')
    })

    it('children() - get last child DOM element', () => {
        traversal.getBreadcrumb().children().last().should('contain', 'Data')
    })
    it('children() - verify specific child DOM element', () => {
        traversal.getSpecificChildrenOfBreadcrumb().should('contain', 'Data')
    })

    it('print DOM elements using each method', () => {
        traversal.printDomElements()
    })

    it('print DOM elements using children()', () => {
        traversal.printDomElements_Children()
    })

    it('print DOM elements by index', () => {
        traversal.getDomElementsCount()
        .then(len => {
             cy.task("log", len)
              var randNum =  Math.floor(Math.random() * len);
             traversal.getDomElementbyIndex(randNum)
        })
    })

    it('parent() - get parent DOM element', () => {
        traversal.getParentDOMElement()
        .then(el => {
            cy.task("log", el.text())

        })
    })

    it('parent() - assert on parent DOM element', () => {
        traversal.getParentDOMElement().should('contain', 'highlight vestibulum')
    })

    it('parent() - get parent dom element using contains', () => {
        traversal.getParentDOMElementUsingContains()
        .then(el => {
            cy.task("log", el.text())
        })
    })

    // displays grandparent element vs parentuntil does not display grandparent element
    it('parents() - getAllParentsDOM', () => {
        traversal.getParentsOfDOM()
        .each(($el, index, $list) => {
            cy.task("log", $el.text().trim());
        });
    })

    // does not display grandparent element 
    it('parentsUntil() - getParentsUntilDOM', () => {
        traversal.getParentsUntilDOM()
        .each(($el, index, $list) => {
            cy.task("log", $el.text().trim());
        });
    })

    it('parentsUnitl() - checkParentsCount', () => {
        traversal.assertOnParentsUntilDOM()
    })

    it('parentsUnitl() - checkParentsCount', () => {
        traversal.clickChildfromParent()
    })

    it('closest() - get closest ancestor DOM element', () => {
        traversal.getClosestDOMofLi().then(e => {
            cy.task("log", e.text())
        })
    })

    it('closest() - get closest ancestor DOM element', () => {
        traversal.getClosestDOMofDiv().children().first().children().eq(0).then(e => {
            cy.task("log", "print first child of closest dom" + e.text())
        })
        traversal.getClosestDOMofDiv().children().first().children().eq(1).then(e => {
            cy.task("log", "print second child of closest dom" + e.text())
        })
    })

    it('closest() - assert on yieled attribute', () => {
        traversal.getClosestDOMofUl().should('have.class', 'list-group');
        traversal.getClosestDOMofUl()
        .should('contain', 'Events')
    })
    
})