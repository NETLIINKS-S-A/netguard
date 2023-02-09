// @filename: SelectMenu.test.ts

import { getEntitiesData } from "../Backend/Connection.js"
import { NLData, UIControl } from "../Shared/Libs/lib.types.g.js"
import { AppContent, appTools } from "../Shared/Settings/Misc.settings.js"


const datas = ['HTML', 'CSS', 'JavaScript', 'Figma', 'ReactJS', 'TypeScript', 'pug', 'SASS']

export async function selectMenut(): Promise<void> {
    const GUARD_DATA: NLData = await getEntitiesData("User")
    const BUSINESS_DATA: NLData = await getEntitiesData("Customer")


    const businessArray: any = await BUSINESS_DATA

    let array: any = []

    BUSINESS_DATA.forEach((data: any) => {
        array.push(data.name)
    })

    console.log(array)
    console.log(businessArray)


    // let guards: any = await guardUser.filter((data: any) => `${data.userType}`.includes("GUARD"))




    AppContent.innerHTML = `
         <div class="select filter" id="select">
             <input type="text"
                 class="input select_box"
                 id="input"
                 placeholder="Dropdown Menu"
                 readonly>

             <div class="select_options" id="select_options"><div></div></div>
         </div>
    `

    const inputSelect: UIControl = document.querySelector(".select")

    inputSelect?.addEventListener("click", () => {
        inputSelect.classList.toggle("select_active")
    })

    select(inputSelect, array)
}

// DROPDOWN INPUT
export function select(input: UIControl, datas?: any) {
    const inputSelectArray: UIControl = input?.querySelector(".select_options div")
    const inputSelect: UIControl = input?.querySelector("#input")

    datas.forEach((data: any) => {
        inputSelectArray.innerHTML += `<div class="select_option">${data}</div>`
    })

    inputSelect.value = inputSelectArray.firstChild.innerText

    const inputOptions: UIControl = inputSelectArray?.querySelectorAll(".select_option")

    inputOptions?.forEach((inputOption: any) => {
        const inputOptionContent: UIControl = inputOption.innerText

        inputOption.addEventListener("click", () => {
            inputSelect.value = inputOptionContent

            console.log(inputSelect.value)
        })
    })
}
