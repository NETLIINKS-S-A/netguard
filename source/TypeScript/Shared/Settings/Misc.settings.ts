// @filename: Misc.ts
import { UIControl } from "../Libs/lib.types.g.js"

export const token = localStorage.getItem("access_token")
export const AppContainer: UIControl = document.getElementById("app")
export const AppWrapper: UIControl = document.getElementById("appWrapper")
export const AppContent: UIControl = document.getElementById("appContent")
export const date: UIControl = document.getElementById("appDate")
export const appTools: UIControl = document.getElementById("appTools")
export const appModalContainer: UIControl = document.getElementById("modal-content")
export const UserAgent: any = navigator.userAgent
