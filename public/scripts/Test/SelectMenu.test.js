// @filename: SelectMenu.test.ts
import { getEntitiesData } from "../Backend/Connection.js";
import { AppContent } from "../Shared/Settings/Misc.settings.js";
const datas = ['HTML', 'CSS', 'JavaScript', 'Figma', 'ReactJS', 'TypeScript', 'pug', 'SASS'];
export async function selectMenut() {
    const GUARD_DATA = await getEntitiesData("User");
    const BUSINESS_DATA = await getEntitiesData("Customer");
    const businessArray = await BUSINESS_DATA;
    let array = [];
    BUSINESS_DATA.forEach((data) => {
        array.push(data.name);
    });
    console.log(array);
    console.log(businessArray);
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
    `;
    const inputSelect = document.querySelector(".select");
    inputSelect?.addEventListener("click", () => {
        inputSelect.classList.toggle("select_active");
    });
    select(inputSelect, array);
}
// DROPDOWN INPUT
function select(input, datas) {
    const inputSelectArray = input?.querySelector(".select_options div");
    const inputSelect = input?.querySelector("#input");
    datas.forEach((data) => {
        inputSelectArray.innerHTML += `<div class="select_option">${data}</div>`;
    });
    inputSelect.value = inputSelectArray.firstChild.innerText;
    const inputOptions = inputSelectArray?.querySelectorAll(".select_option");
    inputOptions?.forEach((inputOption) => {
        const inputOptionContent = inputOption.innerText;
        inputOption.addEventListener("click", () => {
            inputSelect.value = inputOptionContent;
            console.log(inputSelect.value);
        });
    });
}
