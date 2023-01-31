import { getEntityData } from "../../../Libs/lib.request.js";
export class Visits {
    async render(items, table, rows, page) {
        table.innerHTML = "";
        page--;
        const start = rows * page;
        const end = start + rows;
        const arrayVisits = await items.slice(start, end);
        let index;
        for (index = 0; index < arrayVisits.length; index++) {
            const visit = arrayVisits[index];
            let row = document.createElement("tr");
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
            `;
            table.appendChild(row);
        }
    }
    async showInfo(controllers) {
        controllers.forEach((controller) => {
            // The entity
            let entityID = controller.dataset.id;
            controller.addEventListener('click', async () => {
                const GET_DATA = await getEntityData(entityID, 'Visit');
                const modalContainer = document.getElementById("modal-container");
                console.log(modalContainer);
                modalContainer.innerHTML = `
                <div class="modal" id="modal">
                    <div class="modal_dialog modal_body">
                        <h2 class="modal_title">Detalles</h2>

                        <div>
                            <p class="name">${GET_DATA._instanceName}</p>
                        </div>

                        <div class="modal_footer">
                            <button class="btn btn_success" id="close">Aceptar</button>
                        </div>
                    </div>
                </div>`;
                this.open();
                const closeButton = document.getElementById("close");
                closeButton?.addEventListener('click', () => {
                    const modal = document.getElementById("modal");
                    modal.classList.toggle("open");
                    modal.style.display = "none";
                    modal.remove();
                });
                console.log(GET_DATA);
            });
        });
    }
    cancel() { }
    open() {
        const modal = document.getElementById("modal");
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add("open");
        });
    }
}
export let VisitsControllers = new Visits();
