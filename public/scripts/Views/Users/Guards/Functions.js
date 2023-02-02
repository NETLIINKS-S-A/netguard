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
        container.innerHTML = ""; // clear template
        for (let i = 0; i < CNames.length; i++) {
            container.innerHTML += `
            <div class="select_option" id="${CNames.id}">${CNames[i].name}</div>`;
            // Get first value as default value into select filter
            selectInput.value = CNames[0].name;
        }
        const selectOPtions = await container.querySelectorAll("div");
        // Open options on click
        select.addEventListener("click", () => select.classList.toggle("select_active"));
        selectOPtions.forEach((option, i) => {
            i++;
            option.addEventListener("click", async () => {
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

                        <form autocomplete="off" id="modal-form">
                            <div class="input_group">
                                <label for="guard-first-name" class="form_label">Nombre</label>
                                <input class="input" id="guard-first-name" value="${arrayGuards.firstName} ${arrayGuards.lastName} ${arrayGuards.secondLastName}" readonly disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer" class="form_label">Empresa</label>
                                <input class="input" id="guard-customer" value="${arrayGuards.customer.name}" readonly disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer" class="form_label">ID</label>
                                <input class="input" id="guard-customer" value="${arrayGuards.username}" readonly disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer" class="form_label">Teléfono</label>
                                <input class="input" id="guard-customer" value="${arrayGuards.phone}" maxlength="10">
                            </div>

                            <div class="input_group">
                                <label class="form_label">Estado</label>

                                <div class="select">
                                    <input type="text" id="input-select" class="input select_box" value="Activo" readonly>
                                    <div class="select_options" id="select_options">
                                        <div class="select_option" data-status="active">Activo</div>
                                        <div class="select_option" data-status="inactive">Inactivo</div>
                                    </div>
                                </div>
                            </div>

                        </form>

                        <div class="modal_footer">
                            <button class="btn" id="close">cancelar</button>
                            <button class="btn btn_warning" id="reset">Reiniciar</button>
                            <button class="btn btn_success" id="submit">Actualizar</button>
                        </div>
                    </div>
                </div>`;
                this.open();
                console.log(arrayGuards);
                const closeButton = document.getElementById("close");
                closeButton?.addEventListener("click", () => {
                    const modal = document.getElementById("modal");
                    modal.classList.toggle("open");
                    modal.style.display = "none";
                    modal.remove();
                });
                let customerStatus;
                const select = document.querySelector(".select");
                const selectInput = document.getElementById("input-select");
                const selectOptions = document.querySelectorAll(".select_option");
                select.addEventListener("click", () => {
                    select.classList.toggle("select_active");
                });
                selectOptions.forEach((option) => {
                    option.addEventListener("click", async () => {
                        if (option.dataset.status == "active")
                            customerStatus = true;
                        else
                            customerStatus = false;
                        selectInput.value = option.innerText;
                    });
                });
            });
        });
    }
    open() {
        const modal = document.getElementById("modal");
        modal.style.display = "block";
        setTimeout(() => modal.classList.add("open"), 250);
    }
}
export let TableFn = new TBLFn();
