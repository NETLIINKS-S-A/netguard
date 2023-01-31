import { customerNames } from "../../../Libs/lib.data.js";
export class TableFunctions {
    renderBadges(badges) {
        badges?.forEach((badge) => {
            if (badge?.innerText === "Enabled") {
                badge.classList.add("user_active");
                badge.innerText = "Activo";
            }
            else if (badge?.innerText === "Disabled") {
                badge.classList.add("user_inactive");
                badge.innerText = "Inactivo";
            }
        });
    }
    async deleteEntity() {
        const entityName = document.getElementById("entity-name");
        entityName.innerHTML = "l";
    }
    async filterDataByCustomer(select, container, selectInput, currentCustomer) {
        let CNames = customerNames;
        container.innerHTML = ''; // clear template
        for (let i = 0; i < CNames.length; i++) {
            container.innerHTML += `
            <div class="select_option" id="${CNames.id}">${CNames[i].name}</div>`;
            // Get first value as default value into select filter
            selectInput.value = CNames[0].name;
        }
        const selectOPtions = await container.querySelectorAll('div');
        // Open options on click
        select.addEventListener('click', () => select.classList.toggle("select_active"));
        selectOPtions.forEach((option, i) => {
            i++;
            option.addEventListener('click', async () => {
                selectInput.value = await selectOPtions[i - 1].innerHTML;
                currentCustomer = selectInput.value;
                console.log(currentCustomer);
            });
        });
    }
}
