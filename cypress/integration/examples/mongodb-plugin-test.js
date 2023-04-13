// connect cypress via mongodb plugin 
// fetch documents from myData colleciton - db.myData.find()
describe('MongoDB connection', () => {
  it('connects cypress via mongodb successfully', () => {
    const array = [];
    cy.task('connect:mongodb').then((results) => {
      //results.forEach(element => {
        array.push(results)
        cy.task("log", 'Successfully connected to MongoDB. Printing document list');
        cy.task("log", array)

    })
  });

});

