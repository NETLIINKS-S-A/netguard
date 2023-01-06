import { shortMonths, shortDays } from "../../DTNames.js";
import { InterfaceElement } from "../../Types.js";

export function renderAppDate() {
    // DOM elements
    const appMonth: InterfaceElement = document.getElementById("appMonth")
    const appDay: InterfaceElement = document.getElementById("appDay")
    const appTime: InterfaceElement = document.getElementById("appTime")

    // timing functions
    const dt: Date = new Date()
    const month: number = dt.getMonth()
    const day: number = dt.getDay()
    const date: number = dt.getDate()
    // hours
    let hh: string | number = dt.getHours()
    let mm: string | number = dt.getMinutes()
    let ss: string | number = dt.getSeconds()

    // get date names
    const monthOfYears: string = shortMonths[month]
    const dayOfWeeks: string = shortDays[day]

    // Format time to 00:00:00
    hh = hh < 10 ? `0${hh}` : hh
    mm = mm < 10 ? `0${mm}` : mm
    ss = ss < 10 ? `0${ss}` : ss

    let time = `${hh}:${mm}:${ss}`

    // styles
    appMonth.style.textTransform = "uppercase"
    appDay.style.textTransform = "uppercase"

    // render on app
    appMonth.innerHTML = monthOfYears
    appDay.innerHTML = dayOfWeeks
    appTime.innerHTML = time

    setInterval(renderAppDate, 1000)
}
