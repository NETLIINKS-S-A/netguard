// @filename: EmergecyFunctions.ts
import { Modal } from "../../../Shared/Functions/Modal.js";
import { getEntityData } from "../../../Backend/Connection.js";
class NLFEmergency extends Modal {
    constructor() {
        super(...arguments);
        this.modalElement = document.getElementById("modal-content");
    }
    async editor(entity) {
        let DATA = await getEntityData("User", entity);
        console.log(DATA);
        this.modalElement.innerHTML = `
            <div class="modal" id="modal">
                <div class="modal_dialog modal_body" style="max-width: 450px !important">
                    <h2 class="modal_title">
                        Editar
                        <span id="entityName"
                            class="modal_title-name">
                                ${DATA.name}
                        </span>
                    </h2>

                    <form></form>
                </div>
            </div>
        `;
        this.open();
    }
}
export const FNEmergency = new NLFEmergency();
