// @filename: AppDate.ts
import { shortMonths, shortDays } from "../../Shared/Libs/lib.date.g.js"
import { UIControl } from "../../Shared/Libs/lib.types.g"

export function renderAppDate() {
    // DOM elements
    const appMonth: UIControl = document.getElementById("appMonth")
    // const appDay: UIControl = document.getElementById("appDay")
    const appDate: UIControl = document.getElementById("appDayDate")

    // timing functions
    const dt: Date = new Date()
    const month: number = dt.getMonth()
    const day: number = dt.getDay()
    const date: number = dt.getDate()

    // get date names
    const monthOfYears: string = shortMonths[month]
    const dayOfWeeks: string = shortDays[day]

    // styles
    appMonth.style.textTransform = "uppercase"
    // appDay.style.textTransform = "uppercase"

    // render on app
    appMonth.innerHTML = monthOfYears
    // appDay.innerHTML = dayOfWeeks
    appDate.innerHTML = date
}
