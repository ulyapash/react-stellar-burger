import {
  bottomBun,
  burgerConstructor,
  burgerIngredients,
  emailField,
  ingredient,
  makeOrderButton,
  modal,
  modalCloseButton,
  orderName,
  orderNumber,
  passwordField,
  submitButton,
  topBun,
} from "../selectors";

describe("Order form", () => {
  beforeEach(() => {
    const email = "tester111111@gmail.com";
    const password = "111111";

    cy.visit("/login");
    cy.get(emailField).type(`${email}`);
    cy.get(passwordField).type(`${password}`);
    cy.get(submitButton).click();
  });

  it("should make order", () => {
    cy.get(ingredient + ":eq(1)").trigger("dragstart");
    cy.get(burgerConstructor).trigger("drop");

    cy.get(ingredient + ":eq(5)").trigger("dragstart");
    cy.get(burgerConstructor).trigger("drop");

    cy.get(ingredient + ":eq(7)").trigger("dragstart");
    cy.get(burgerConstructor).trigger("drop");

    cy.get(makeOrderButton).should("not.have.attr", "disabled");
    cy.get(makeOrderButton).click();
    cy.get(makeOrderButton).should("have.attr", "disabled");

    cy.get(modal, { timeout: 20000 }).should("exist");
    cy.get(orderNumber).should("not.be.empty");
    cy.get(orderName).should("not.be.empty");
    cy.get(modalCloseButton).click();

    cy.get(modal).should("not.exist");
    cy.get(topBun).should("not.exist");
    cy.get(bottomBun).should("not.exist");
    cy.get(burgerIngredients).should("not.exist");
  });
});
