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
            console.log(el.text())
        })
    })

    it('parent() - assert on parent DOM element', () => {
        traversal.getParentDOMElement().should('contain', 'highlight vestibulum')
    })

    it('parent() - get parent dom element using contains', () => {
        traversal.getParentDOMElementUsingContains()
        .then(el => {
            cy.task("log", el.text())
            console.log(el.text())
        })
    })

    // displays grandparent element vs parentuntil does not display grandparent element
    it('parents() - getAllParentsDOM', () => {
        traversal.getParentsOfDOM()
        .each(($el, index, $list) => {
            cy.task("log", $el.text().trim());
            console.log($el.text())
        });
    })

    // does not display grandparent element 
    it('parentsUntil() - getParentsUntilDOM', () => {
        traversal.getParentsUntilDOM()
        .each(($el, index, $list) => {
            cy.task("log", $el.text().trim());
            console.log($el.text())
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
            console.log(e.text())
        })
    })

    it('closest() - get closest ancestor DOM element', () => {
        traversal.getClosestDOMofDiv().children().first().children().eq(0).then(e => {
            cy.task("log", "print first child of closest dom" + e.text())
            console.log(e.text())
        })
        traversal.getClosestDOMofDiv().children().first().children().eq(1).then(e => {
            cy.task("log", "print second child of closest dom" + e.text())
            console.log(e.text())
        })
    })

    it('closest() - assert on yieled attribute', () => {
        traversal.getClosestDOMofUl().should('have.class', 'list-group');
        traversal.getClosestDOMofUl()
        .should('contain', 'Events')
    })
    
    it('siblings() - get all siblings dom elements of selected element', () => {
        traversal.getTraversalPills().siblings()
        .each($el => {
            cy.task("log", "Sibling text : " + $el.text())
            cy.log($el.text())
        })

    })

    it('siblings() - locate specific sibling element and click', () => {
        traversal.getTraversalPills()
        .siblings().contains('Messages').click()
    })

    it('siblings() - assert on parent of sibling', () => {
        traversal.getTraversalPills()
        .siblings().contains('Messages').parent()
        .should('have.prop', 'tagName', 'LI')

    })

    it('siblings() - access ancestor of sibling', () => {
        traversal.getTraversalPills()
        .siblings().contains('Messages').parents(traversal.getNavElement())
        .should('have.class', 'traversal-pills')
    })

    it('prev() - get previous sibling DOM element', () => {
        traversal.getChildOfBirdsGroupDom()
        .prev().should('contain', 'Lorikeets' )
    })

    it('prevall() - get previous sibling DOM element', () => {
        traversal.findChildDomofBitdsGroup()
        .prevAll().each(($el, indiex, $list) => {
            cy.task("log", $el.text())
        })
    })

    it('prevUntil() - get prev doms until specified selecttor', () => {
        traversal.findNutsfromFoodList().prevUntil('#veggies').each(el => {
            cy.task("log", el.text())
        })
    })

    it('prevUntil() - get prev doms until specified selecttor', () => {
        traversal.getFoodList().contains('almonds').prevUntil('#veggies').each(el => {
            cy.task("log", el.text())
        })
    })

})