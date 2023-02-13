// @filename: Global.ts
import AccentColor from "../Libs/lib.accent.color.g.js";
let currentTheme = localStorage.getItem("user_theme");
currentTheme === null ? localStorage.setItem("user_theme", "light_theme") : localStorage.getItem("user_theme");
export const interfaceSettings = {
    accentColor: AccentColor.Primary,
    sidebarSize: "normal",
    theme: currentTheme
};
