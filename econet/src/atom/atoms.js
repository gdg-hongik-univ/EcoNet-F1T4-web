// atoms.js
import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const savedValue = localStorage.getItem("isLoggedIn");
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }
    },
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("isLoggedIn", JSON.stringify(newValue));
      });
    },
  ],
});
