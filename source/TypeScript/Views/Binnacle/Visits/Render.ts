// @filename: VisitsRenderData.ts
import { getEntityData } from "../../../Libs/lib.request.js"
import { UIViewAsync, UIControl } from "../../../Libs/lib.types"

export class Visits {
    public async render(items: any, table: UIControl, rows: number, page: number): UIViewAsync {
        table.innerHTML = ""
        page--

        const start: number = rows * page
        const end: number = start + rows
        const arrayVisits: [] = await items.slice(start, end)
        let index: number

        for (index = 0; index < arrayVisits.length; index++) {
            const visit: any = arrayVisits[index]
            let row: UIControl = document.createElement("tr")
            row.innerHTML = `
            <tr>
                <td>${visit.firstLastName}</td>
                <td>${visit.dni}</td>
                <td>${visit.creationDate}</td>
                <td>${visit.creationTime}</td>
                <td>${visit.visitState.name}</td>
                <td>${visit.user.firstName}</td>
                <td><button class="btn btn_table_info" data-id="${visit.id}"><i class="fa-solid fa-list"></i></button></td>
            </tr>
            `

            table.appendChild(row)
        }
    }

    public async showInfo(controllers: UIControl): UIViewAsync {

        controllers.forEach((controller: UIControl) => {
            // The entity
            let entityID: string = controller.dataset.id

            controller.addEventListener('click', async (): Promise<void> => {
                const arrayVisitsInformation: any = await getEntityData(entityID, 'Visit')

                const modalContainer: UIControl = document.getElementById("modal-container")
                console.log(modalContainer)

                modalContainer.innerHTML = `
                <div class="modal visit_information" id="modal">
                    <div class="modal_dialog modal_body">
                        <h2 class="modal_title">Detalles</h2>

                        <div class="info_2_cols">
                            <img src="./public/pictures/picture_placeholder.png">
                            <div class="info_block">
                                <div class="info_group">
                                    <p><b>Nombre:</b></p>
                                    <p class="name">${arrayVisitsInformation.firstName} ${arrayVisitsInformation.firstLastName} ${arrayVisitsInformation.secondLastName}</p>
                                </div>
                                <div class="info_group">
                                    <p><b>CI:</b></p>
                                    <p class="name">${arrayVisitsInformation.dni}</p>
                                </div>
                                <div class="info_group">
                                    <p><b>Estado:</b></p>
                                    <p class="name">${arrayVisitsInformation.firstName} ${arrayVisitsInformation.firstLastName} ${arrayVisitsInformation.secondLastName}</p>
                                </div>
                                <div class="info_group">
                                    <p><b>Nombre:</b></p>
                                    <p class="name">${arrayVisitsInformation.firstName} ${arrayVisitsInformation.firstLastName} ${arrayVisitsInformation.secondLastName}</p>
                                </div>
                            </div>
                        </div>

                        <div class="modal_footer">
                            <button class="btn btn_success" id="close">Aceptar</button>
                        </div>
                    </div>
                </div>`
                this.open()

                const closeButton = document.getElementById("close")
                closeButton?.addEventListener('click', () => {
                    const modal: UIControl = document.getElementById("modal")
                    modal.classList.toggle("open")
                    modal.style.display = "none"
                    modal.remove()
                })

                console.log(arrayVisitsInformation)
            })
        })
    }

    private cancel(): void { }

    private open(): void {
        const modal: UIControl = document.getElementById("modal")
        modal.style.display = "block"
        setTimeout((): void => {
            modal.classList.add("open")
        })
    }
}

export let VisitsControllers: Visits = new Visits()
