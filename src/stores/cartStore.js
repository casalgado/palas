import { defineStore } from "pinia";

/* 

state.cartItems is an object
the keys represent the id of each value,
the values are the cartItem objects.

The CartItem Object is of the form:

{
  id: Number,
  productId: String,
  selectedOption: String,
  selectedExtras: Object,
  quantity: Number,
  total: Number,
  directToCart: Boolean,
},

*/

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cartItems: {},
    signedIn: false,
    template: {
      id: null,
      productId: "",
      selectedOption: {},
      selectedSecondOptions: {},
      selectedExtras: {},
      cutlery: { name: "No", value: "No" },
      spiceLevel: { name: "No Aplica", value: "No Aplica" },
      comboDrink: {},
      quantity: 1,
      total: 0,
      comment: "",
    },
  }),
  getters: {
    cartItemTemplate: (state) => state.template,
    allCartItemsArray: (state) =>
      Object.values(state.cartItems).filter((e) => e.quantity > 0),
    nextId: (state) => Object.keys(state.cartItems).length,
    getProductById: (state) => {
      return (productId) =>
        state.allCartItemsArray.find((e) => e.productId == productId);
    },
    getCartTotal: (state) =>
      Object.values(state.cartItems)
        .filter((e) => e.quantity > 0)
        .reduce((prev, curr) => prev + curr.total * curr.quantity, 0),
    getNumberOfCartItems: (state) => state.allCartItemsArray.length,
    userSignedIn: (state) => state.signedIn,
  },
  actions: {
    addCartItem(cartItem) {
      const id = this.nextId;
      cartItem.id = id;
      this.cartItems[cartItem.id] = cartItem;
      this.persistCart();
    },
    updateCartItem(id, props) {
      console.log(id);
      console.log(props);
      Object.keys(props).forEach((prop) => {
        if (Object.keys(this.cartItemTemplate).includes(prop)) {
          this.cartItems[id][prop] = props[prop];
        } else {
          throw new Error("Supplied prop is not valid");
        }
      });
      this.persistCart();
    },
    updateCart(cartItem) {
      this.cartItems[cartItem.id] = cartItem;
      this.persistCart();
    },
    updateUserAuth(login) {
      this.signedIn = login;
    },
    persistCart() {
      localStorage.setItem("Cart", JSON.stringify(this.cartItems));
    },
    emptyCart() {
      localStorage.setItem("Cart", JSON.stringify({}));
      this.cartItems = {};
    },
    loadCart() {
      if (localStorage.getItem("Cart")) {
        const savedCart = JSON.parse(localStorage.getItem("Cart"));
        console.log("load");
        console.log(savedCart);
        if (Object.values(savedCart).filter((e) => e.quantity > 0).length > 0) {
          this.cartItems = savedCart;
        } else {
          this.emptyCart();
        }
      }
    },
  },
});
