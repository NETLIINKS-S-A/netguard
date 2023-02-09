// @filename: EmergecyFunctions.ts

import { Modal } from "../../../Shared/Functions/Modal.js"
import { getEntityData } from "../../../Backend/Connection.js"
import { UIControl } from "../../../Shared/Libs/lib.types.g.js"

class NLFEmergency extends Modal {
    private modalElement: UIControl = document.getElementById("modal-content")

    public async editor(entity: string): Promise<void> {
        let DATA: any = await getEntityData("User", entity)

        console.log(DATA)

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
        `
        this.open()
    }
}

export const FNEmergency: NLFEmergency = new NLFEmergency()
