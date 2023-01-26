// @filename: AppDate.ts
import { shortMonths, shortDays } from "../../Libs/lib.date.js"
import { UIElement } from "../../Libs/lib.types.js"

export function renderAppDate() {
    // DOM elements
    const appMonth: UIElement = document.getElementById("appMonth")
    // const appDay: UIElement = document.getElementById("appDay")
    const appDate: UIElement = document.getElementById("appDayDate")

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

// function renderAppTime() {
//     const appTime: UIElement = document.getElementById("appTime")
//     const dt: Date = new Date()

//     // hours
//     let hh: string | number = dt.getHours()
//     let mm: string | number = dt.getMinutes()
//     let ss: string | number = dt.getSeconds()

//     // Format time to 00:00:00
//     hh = hh < 10 ? `0${hh}` : hh
//     mm = mm < 10 ? `0${mm}` : mm
//     ss = ss < 10 ? `0${ss}` : ss

//     let time = `${hh}:${mm}:${ss}`

//     appTime.innerHTML = time
// }
