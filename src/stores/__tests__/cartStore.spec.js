import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "@/stores/cartStore"; // <-- !!

describe("Data Store Test Basic", () => {
  let store = null;

  beforeEach(() => {
    // create a fresh Pinia instance and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());

    // create an instance of the data store
    store = useCartStore();
  });

  it("initializes with no active cart items", () => {
    expect(store.allCartItemsArray.length).toEqual(0);
  });

  it("initializes with correct cart item template", () => {
    expect(store.cartItemTemplate).toEqual({
      id: null,
      productId: "",
      selectedOption: {},
      selectedExtras: {},
      cutlery: { name: "No", value: "No" },
      spiceLevel: { name: "Sin Picante", value: "Sin Picante" },
      comboDrink: {},
      quantity: 1,
      total: 0,
      comment: "",
    });
  });

  it("adding a cart items", () => {
    store.addCartItem(item_one);

    expect(store.allCartItemsArray.length).toEqual(1);
    expect(store.getProductById("-N8y-qIYotrrF-wkzB4o")).not.toBeUndefined();
    expect(store.allCartItemsArray[0].id).toEqual(0);

    store.addCartItem(item_two);

    expect(store.allCartItemsArray.length).toEqual(2);
    expect(store.getProductById("-N8y5uDdj0PJOqxCxWHQ")).not.toBeUndefined();
    expect(store.allCartItemsArray[1].id).toEqual(1);
  });
});

describe("Data Store Test Advanced", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCartStore();

    store.addCartItem(item_one);
    store.addCartItem(item_two);
  });

  describe("updates cart item", () => {
    it("updates only supplied props", () => {
      expect(store.allCartItemsArray[1].quantity).toEqual(1);
      store.updateCartItem(1, { quantity: 2 });
      expect(store.allCartItemsArray[1].quantity).toEqual(2);
    });

    it("throws error if supplied prop is not valid", () => {
      expect.assertions(1);
      try {
        store.updateCartItem(1, { invalid: 2 });
      } catch (error) {
        expect(error.message).toBe("Supplied prop is not valid");
      }
    });
  });

  it("finds cart items based on productId", () => {
    expect(store.getProductById("-N8y-qIYotrrF-wkzB4o").id).toEqual(0);
    expect(store.getProductById("-N8y-qIYotrrF-wkzB4o").productId).toEqual(
      "-N8y-qIYotrrF-wkzB4o"
    );
    expect(store.getProductById("-N8y-qIYotrrF-wkzB4o").total).toEqual(19500);
  });
});

const item_one = {
  comboDrink: {},
  comment: null,
  cutlery: { name: "No", value: "No" },
  productId: "-N8y-qIYotrrF-wkzB4o",
  quantity: 1,
  selectedExtras: {},
  selectedOption: {},
  spiceLevel: { name: "Sin Picante", value: "Sin Picante" },
  total: 19500,
};

const item_two = {
  comboDrink: {},
  comment: null,
  cutlery: { name: "No", value: "No" },
  productId: "-N8y5uDdj0PJOqxCxWHQ",
  quantity: 1,
  selectedExtras: {},
  selectedOption: {},
  spiceLevel: { name: "Sin Picante", value: "Sin Picante" },
  total: 28900,
};

const item_three = {
  comboDrink: {},
  comment: null,
  cutlery: { name: "No", value: "No" },
  productId: "-N8y57BatHCFqV-vVjw9",
  quantity: 1,
  selectedExtras: {},
  selectedOption: {},
  spiceLevel: { name: "Sin Picante", value: "Sin Picante" },
  total: 14900,
};
