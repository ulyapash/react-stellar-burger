import {
  ingredient,
  burgerConstructor,
  topBun,
  bottomBun,
  burgerIngredients,
} from "../selectors";

describe("Constructor DnD", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Dragging ingredient in the constructor", () => {
    it("should add ingredient to the burger ingredients", () => {
      cy.get(ingredient + ":eq(1)").trigger("dragstart");
      cy.get(burgerConstructor).should("exist");
      cy.get(burgerConstructor).trigger("drop");

      cy.get(topBun).should("exist");
      cy.get(bottomBun).should("exist");

      cy.get(ingredient + ":eq(5)").trigger("dragstart");
      cy.get(burgerConstructor).trigger("drop");

      cy.get(ingredient + ":eq(7)").trigger("dragstart");
      cy.get(burgerConstructor).trigger("drop");

      cy.get(burgerIngredients).should("not.be.empty");
    });
  });
});
