import { writable } from "svelte/store";

// Stores 🏪
export const msalClientStore = writable()
export const accesstokenStore = writable('')
export const userStore = writable()
export const userRoles = writable([])
export const typingStore = writable()