export const newUserCypress = {
  username: "cypress",
  email: "cypress@test.com",
  password: "cypressPassword",
};

const mockLoginUser = {
  username: "devon",
  email: "devon@test.com",
  password: "password",
};

before(() => {
  cy.seedDB();
});

describe("register", () => {
  beforeEach(() => {
    cy.interceptDelay("POST", "http://localhost:5000/api/v1/auth/register").as(
      "userRegister"
    );
  });
  it("should show error creating a user with used username", () => {
    cy.visit("/register");
    cy.get("[name=username]").type(mockLoginUser.username);
    cy.get("[name=email]").type(newUserCypress.email);
    cy.get("[name=password]").type(newUserCypress.password);
    cy.get("[name=passwordConfirm]").type(newUserCypress.password);
    cy.get("[name=terms]").click();
    cy.get("form").submit();
    cy.get('[data-cy="submit"]').should("be.disabled");
    cy.wait("@userRegister");
    cy.get('[data-cy="submit"]').should("not.be.disabled");
    cy.getSnackbar("Error").should("exist");
  });
  it("should show error creating a user with used email", () => {
    cy.visit("/register");
    cy.get("[name=username]").type(newUserCypress.username);
    cy.get("[name=email]").type(mockLoginUser.email);
    cy.get("[name=password]").type(newUserCypress.password);
    cy.get("[name=passwordConfirm]").type(newUserCypress.password);
    cy.get("[name=terms]").click();
    cy.get("form").submit();
    cy.get('[data-cy="submit"]').should("be.disabled");
    cy.wait("@userRegister");
    cy.get('[data-cy="submit"]').should("not.be.disabled");
    cy.getSnackbar("Error").should("exist");
  });
  it("should validate form and show errors", () => {
    cy.visit("/register");
    cy.get("[name=username]").type("a");
    cy.get("[name=email]").type("this is not an email");
    cy.get("[name=password]").type("passwordOne");
    cy.get("[name=passwordConfirm]").type("passwordTwo");
    cy.get("form").submit();
    cy.getInputErrors().should("have.length", 3);
  });
  it("should match password and passwordConfirm", () => {
    cy.visit("/register");
    cy.get("[name=username]").type(newUserCypress.username);
    cy.get("[name=email]").type(newUserCypress.email);
    cy.get("[name=password]").type("passwordOne");
    cy.get("[name=passwordConfirm]").type("passwordTwo");
    cy.get("[name=terms]").click();
    cy.get("form").submit();
    cy.getInputErrors().should("have.length", 1);
  });
  it("should create a new user", () => {
    cy.visit("/register");
    cy.get("[name=username]").type(newUserCypress.username);
    cy.get("[name=email]").type(newUserCypress.email);
    cy.get("[name=password]").type(newUserCypress.password);
    cy.get("[name=passwordConfirm]").type(newUserCypress.password);
    cy.get("[name=terms]").click();
    cy.get("form").submit();
    cy.get('[data-cy="submit"]').should("be.disabled");
    cy.wait("@userRegister");
    cy.get('[data-cy="submit"]').should("not.be.disabled");
    cy.url().should("include", "/activate-account");
  });
});

describe("login", () => {
  it("should show error with bad credentials", () => {
    cy.interceptDelay("POST", "http://localhost:5000/api/v1/auth/login").as(
      "userLogin"
    );
    cy.visit("/login");
    cy.get("[name=username]").type("testing");
    cy.get("[name=password]").type("testing");
    cy.get("form").submit();
    cy.get("button[type=submit]").should("be.disabled");
    cy.wait("@userLogin");
    cy.getSnackbar("Error").should("exist");
    cy.url().should("include", "/login");
  });
  it("should login with correct credentials", () => {
    cy.interceptDelay("POST", "http://localhost:5000/api/v1/auth/login").as(
      "userLogin"
    );
    cy.visit("/login");
    cy.get("[name=username]").type(mockLoginUser.username);
    cy.get("[name=password]").type(mockLoginUser.password);
    cy.get("form").submit();
    cy.get("button[type=submit]").should("be.disabled");
    cy.wait("@userLogin").then(({ response }) => {
      cy.url().should("include", response.body.redirect);
      cy.getCookie("access_token").should("exist");
    });
  });
});
