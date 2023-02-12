import { getEntitiesData } from "../../Backend/Connection"
import { UIControl } from "../Libs/lib.types.g.js"

export function select(input: UIControl, datas?: any) {
    const inputSelectArray: UIControl = input?.querySelector(".select_options div")
    const inputSelect: UIControl = input?.querySelector("#input")

    datas.forEach((data: any) => {
        console.log(datas)
        inputSelectArray.innerHTML += `<div class="select_option" data-id="">${data}</div>`
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
