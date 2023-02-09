// @filename: GuardsFunctions.ts
import { Modal } from "../../../Shared/Functions/Modal.js"
import { UIControl } from "../../../Shared/Libs/lib.types.g.js"

class NLFGuards extends Modal {
    public async new(): Promise<void> {
        const modalContainer: UIControl =
            document.getElementById("modal-content")

        modalContainer.innerHTML = `
            <div class="modal" id="modal">
                <div class="modal_dialog modal_body">
                    <h4 class="modal_title">Nuevo guardia</h4>
                        <form autocomplete="off" id="modal-form">
                            <div class="input_group">
                                <label for="guard-first-name" class="form_label">Nombre</label>
                                <input class="input"
                                    id="guard-first-name">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer"
                                    class="form_label">Empresa</label>

                                <input class="input"
                                    id="guard-customer">
                                </div>

                                <div class="input_group">
                                    <label for="guard-customer"
                                        class="form_label">ID</label>

                                    <input class="input" id="guard-customer">
                                </div>

                                <div class="input_group">
                                    <label for="guard-customer"
                                        class="form_label">Teléfono</label>

                                   <input class="input"
                                        id="guard-customer"
                                       maxlength="10">
                               </div>
                               <div class="input_group">
                                    <label class="form_label">Estado</label>
                                    <div class="select">
                                        <input type="text"
                                            id="input-select"
                                            class="input select_box"
                                            value="Activo">

                                        <div class="select_options" id="select_options">
                                         <div class="select_option">Activo</div>
                                         <div class="select_option">Inactivo</div>
                                     </div>
                                </div>
                            </div>
                         </form>

                         <div class="modal_footer">
                             <button class="btn" id="close">cancelar</button>
                             <button class="btn btn_success" id="submit">Actualizar</button>
                         </div>
                     </div>
                 </div>
        `
        this.open()

        document.getElementById("close")?.addEventListener("click", (): void => {
            this.close()
        })
    }

    public async edit(): Promise<void> {
        const modalContainer: UIControl =
            document.getElementById("modal-content")

        modalContainer.innerHTML = `
            <div class="modal" id="modal">
                <div class="modal_dialog modal_body">
                    <h4 class="modal_title">Editar guardia</h4>
                        <form autocomplete="off" id="modal-form">
                            <div class="input_group">
                                <label for="guard-first-name" class="form_label">Nombre</label>
                                <input class="input"
                                    id="guard-first-name"
                                    disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer"
                                    class="form_label">Empresa</label>

                                <input class="input"
                                    id="guard-customer"
                                    disabled="true">
                                </div>

                                <div class="input_group">
                                    <label for="guard-customer"
                                        class="form_label">ID</label>

                                    <input class="input" id="guard-customer">
                                </div>

                                <div class="input_group">
                                    <label for="guard-customer"
                                        class="form_label">Teléfono</label>

                                   <input class="input"
                                        id="guard-customer"
                                       maxlength="10">
                               </div>
                               <div class="input_group">
                                    <label class="form_label">Estado</label>
                                    <div class="select">
                                        <input type="text"
                                            id="input-select"
                                            class="input select_box"
                                            value="Activo">

                                        <div class="select_options" id="select_options">
                                         <div class="select_option">Activo</div>
                                         <div class="select_option">Inactivo</div>
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
                 </div>
        `
        this.open()

        document.getElementById("close")?.addEventListener("click", (): void => {
            this.close()
        })
    }
}

export const FNGuards: NLFGuards = new NLFGuards()
