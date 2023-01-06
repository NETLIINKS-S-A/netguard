import { shortMonths, shortDays } from "../../DTNames.js";
export function renderAppDate() {
    // DOM elements
    const appMonth = document.getElementById("appMonth");
    const appDay = document.getElementById("appDay");
    const appTime = document.getElementById("appTime");
    // timing functions
    const dt = new Date();
    const month = dt.getMonth();
    const day = dt.getDay();
    const date = dt.getDate();
    // hours
    let hh = dt.getHours();
    let mm = dt.getMinutes();
    let ss = dt.getSeconds();
    // get date names
    const monthOfYears = shortMonths[month];
    const dayOfWeeks = shortDays[day];
    // Format time to 00:00:00
    hh = hh < 10 ? `0${hh}` : hh;
    mm = mm < 10 ? `0${mm}` : mm;
    ss = ss < 10 ? `0${ss}` : ss;
    let time = `${hh}:${mm}:${ss}`;
    // styles
    appMonth.style.textTransform = "uppercase";
    appDay.style.textTransform = "uppercase";
    // render on app
    appMonth.innerHTML = monthOfYears;
    appDay.innerHTML = dayOfWeeks;
    appTime.innerHTML = time;
    setInterval(renderAppDate, 1000);
}
