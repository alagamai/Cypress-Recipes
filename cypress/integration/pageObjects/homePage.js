// create class and export it 

const ELEMENTS = {
    USERNAME_INPUT: '[name="name"]:nth-child(2)',
    EMAIL_INPUT: '[name="email"]',
    PASSWORD_INPUT: '[type="password"]',
    LOGIN_BUTTON: '#loginBtn',
    CHECKBOX_SELECT: '#exampleCheck1',
};

class homePage {

    getName() {
        return cy.get(ELEMENTS.USERNAME_INPUT)

    }

    getEmail() {
        return cy.get(ELEMENTS.EMAIL_INPUT)
    }

    getPassword() {
        return cy.get(ELEMENTS.PASSWORD_INPUT)

    }
    enterPassword(pwd) {
        this.getPassword().type(pwd)

    }
    enterEmail(email) {
        this.getEmail().type(email)

    }

    getCheckbox() {
        return cy.get(ELEMENTS.CHECKBOX_SELECT)

    }

    getGenderDropdown() {
        return cy.get('#exampleFormControlSelect1')
    }

    setGender(gender) {
        this.getGenderDropdown().select(gender)
    }

    getEmpStatus(status) {
        if (status == 'Student')
        return cy.get('#inlineRadio1')
        else 
        return cy.get('#inlineRadio2')

    }


    setEmpStatus(empStatus) {
         this.getEmpStatus(empStatus).click()
    }

    selectDoB() {
        cy.get('[type="date"]').click()
    }

    enterName(name) {
        const nameEle = this.getName()
        nameEle.type(name)
    }

  

}

// classs is exported ; instantiate beofre use
//export default homePage
// class is exported and instantiated 
module.exports = new homePage()  