const mockUserActivateAccount = {
  username: "joe",
  email: "joe@test.com",
  password: "password",
};
const mockUserOnboarding = {
  username: "johns",
  password: "password",
  profile: {
    firstname: "johns",
    lastname: "box",
    birthdate: "20/12/2000",
  },
};

before(() => {
  cy.seedDB();
});

describe("user enable account", () => {
  beforeEach(() => {
    cy.login(
      mockUserActivateAccount.username,
      mockUserActivateAccount.password
    );
  });
  it("should resend email activation link and disable button", () => {
    cy.intercept("GET", "http://localhost:5000/api/v1/user/account").as(
      "account"
    );
    cy.intercept(
      "POST",
      "http://localhost:5000/api/v1/auth/activation-code"
    ).as("activationCode");
    cy.visit("/activate-account");
    cy.url().should("include", "/activate-account");
    cy.getCookie("access_token").should("exist");

    cy.wait("@account");
    cy.get("button")
      .contains("link")
      .parent("button")
      .should("not.be.disabled")
      .click();
    cy.get("span").contains(mockUserActivateAccount.email).should("exist");

    cy.wait("@activationCode");
    cy.getSnackbar("Success").should("exist");
    cy.get("button").contains("link").parent("button").should("be.disabled");
  });
  it("should show error with invalid activation code", () => {
    cy.interceptDelay(
      "POST",
      "http://localhost:5000/api/v1/auth/activate-account?code=4321"
    ).as("activateAccount");
    cy.visit("/activation?code=4321");
    cy.url().should("include", "/activation");
    cy.get("h1").should("exist");
    cy.wait("@activateAccount");
    cy.getSnackbar("Error").should("exist");
  });
  it("should activate the account and be redirected to onboarding", () => {
    cy.interceptDelay(
      "POST",
      "http://localhost:5000/api/v1/auth/activate-account?code=1234"
    ).as("activateAccount");
    cy.visit("/activation?code=1234");
    cy.url().should("include", "/activation");
    cy.get("h1").should("exist");
    cy.wait("@activateAccount");
    cy.url().should("include", "/onboarding/info");
    cy.get("form").should("exist");
  });
});

describe("onboarding personal information", () => {
  beforeEach(() => {
    cy.login(mockUserOnboarding.username, mockUserOnboarding.password);
  });

  it("should show form errors", () => {
    cy.visit("/onboarding/info");
    cy.get("[name=firstname]").type("f");
    cy.get("[name=lastname]").type("o");
    cy.get("[name=birthdate]").type("1");
    cy.get("button[type=submit]").should("be.disabled");
    cy.getInputErrors().should("have.length", 3);
  });
  it("should send personal information correctly", () => {
    cy.interceptDelay(
      "PUT",
      "http://localhost:5000/api/v1/user/onboarding/info"
    ).as("onboardingPersonal");
    cy.visit("/onboarding/info");
    cy.get("[name=firstname]").type(mockUserOnboarding.profile.firstname);
    cy.get("[name=lastname]").type(mockUserOnboarding.profile.lastname);
    cy.get("[name=birthdate]").type(mockUserOnboarding.profile.birthdate);
    cy.get("button[type=submit]").should("be.enabled").click();
    cy.get("button[type=submit]").should("not.be.enabled");
    cy.wait("@onboardingPersonal");
    cy.url().should("include", "/onboarding/gender");
    cy.getSnackbar("Success").should("exist");
  });
});
