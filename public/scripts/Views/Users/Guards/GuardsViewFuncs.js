import { customerNames } from "../../../Libs/lib.data.js";
import { getEntityData } from "../../../Libs/lib.request.js";
class TBLFn {
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
    async edit(controllers) {
        controllers.forEach((controller) => {
            // get entity
            const entityID = controller.dataset.id;
            // add functionality
            controller.addEventListener("click", async () => {
                const arrayGuards = await getEntityData(entityID, "User");
                const modalContainer = document.getElementById("modal-container");
                modalContainer.innerHTML = `
                <div class="modal" id="modal">
                    <div class="modal_dialog modal_body">
                        <h4 class="modal_title">Editar guardia</h4>

                    </div>
                </div>`;
                this.open();
            });
        });
    }
    open() {
        const modal = document.getElementById("modal");
        modal.style.display = "block";
        setTimeout(() => modal.classList.add("open"), 300);
    }
}
export let TableFn = new TBLFn();
