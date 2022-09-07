describe("Home page", () => {
  it("should render", () => {
    cy.visit("http://localhost:3000/");
  });
  // it("should render the h1", () => {
  //   cy.visit("http://localhost:3000");
  //   cy.get("h1").contains("Welcome to Next.js");
  // });
});
