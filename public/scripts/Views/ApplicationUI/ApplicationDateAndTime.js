// @filename: AppDate.ts
import { shortMonths, shortDays } from "../../Libs/lib.date.js";
export function renderAppDate() {
    // DOM elements
    const appMonth = document.getElementById("appMonth");
    // const appDay: UIControl = document.getElementById("appDay")
    const appDate = document.getElementById("appDayDate");
    // timing functions
    const dt = new Date();
    const month = dt.getMonth();
    const day = dt.getDay();
    const date = dt.getDate();
    // get date names
    const monthOfYears = shortMonths[month];
    const dayOfWeeks = shortDays[day];
    // styles
    appMonth.style.textTransform = "uppercase";
    // appDay.style.textTransform = "uppercase"
    // render on app
    appMonth.innerHTML = monthOfYears;
    // appDay.innerHTML = dayOfWeeks
    appDate.innerHTML = date;
}
