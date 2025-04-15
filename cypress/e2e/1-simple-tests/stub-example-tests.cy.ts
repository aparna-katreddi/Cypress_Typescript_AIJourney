

describe('API Stubbing Example', () => {
    it('should stub a free API and verify the response', () => {
      // Choose a free API endpoint (e.g., JSONPlaceholder)
      const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  
      // Stub the API request
      cy.intercept('GET', apiUrl, {
        statusCode: 200,
        body: {
          userId: 1,
          id: 1,
          title: 'Stubbed Title',
          body: 'Stubbed Body',
        },
      }).as('getPost'); // Alias for easier reference
  
      // Visit a dummy page to trigger the API call (or your actual page)
      //cy.visit('about:blank');
      cy.visit('cypress/fixtures/stubForm.html');
  
      // Make the API call (this would be in your application code)
      cy.request(apiUrl); // Simulate the API call
  
      // Wait for the stubbed request and verify the response
      cy.wait('@getPost',{timeout:25000}).then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body?.title).to.eq('Stubbed Title');
        expect(interception.response?.body.body).to.eq('Stubbed Body');
      });
  
      
    })
})


describe('Validate API Resonse ', () => {
  it('GET Request then validate response', () => {
    // Choose a free API endpoint (e.g., JSONPlaceholder)
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    cy.intercept('GET', apiUrl)
    cy.visit('cypress/fixtures/stubForm.html');
    cy.request(apiUrl).as('getPost')
      .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body?.title).to.eq('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
expect(response.body.body).to.eq(`quia et suscipit
suscipit recusandae consequuntur expedita et cum
reprehenderit molestiae ut ut quas totam
nostrum rerum est autem sunt rem eveniet architecto`);
    });

    
  })
})



describe('API Stubbing Example from fixture file', () => {
  it('should stub from fixture file a free API and verify the response', () => {
    // Choose a free API endpoint (e.g., JSONPlaceholder)
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    // Stub the API request
    cy.intercept('GET', apiUrl, {
      statusCode: 200,
      fixture: 'mock-posts-request-stub.json',
    }).as('getPost'); // Alias for easier reference

    // Visit a dummy page to trigger the API call (or your actual page)
    //cy.visit('about:blank');
    cy.visit('cypress/fixtures/stubForm.html');

    // Make the API call (this would be in your application code)
    cy.request(apiUrl); // Simulate the API call

    // Wait for the stubbed request and verify the response
    cy.wait('@getPost',{timeout:25000}).then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body?.title).to.eq('Stubbed Title From Fixture');
      expect(interception.response?.body.body).to.eq('Stubbed Body From Fixture');
    });

    
  })
})