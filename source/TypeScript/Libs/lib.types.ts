// @filename: lib.types.ts
// Author: Poll Castillo <acastillo@gmail.com>
// Colaborators:

export * from "./lib.types.js"

export type UIView = void
export type UIViewAsync = Promise<any>
export type UIControl = HTMLElement | null | any
export type UIApplication = HTMLAllCollection | HTMLElement | any
