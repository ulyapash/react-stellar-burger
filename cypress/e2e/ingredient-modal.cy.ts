import {
  ingredient,
  modal,
  modalCloseButton,
  modalHeading,
} from "../selectors";

describe("Ingredient modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open modal with the ingredient info", () => {
    cy.get(ingredient + ":eq(5)").click();

    cy.get(modalHeading).should("contain.text", "Детали ингредиента");

    cy.get(modalCloseButton).click();
    cy.get(modal).should("not.exist");
  });
});
