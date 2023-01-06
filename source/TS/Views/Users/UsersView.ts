import { UI } from "../../DomElements.js"

export async function renderUsers() {
    const url = "https://backend.netliinks.com:443/rest/entities/Business?fetchPlan=full"

    const appContent = UI.App?.content
    appContent.innerHTML = `
        <h1 class="app_title">Usuarios</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tableBody">

            </tbody>
        </table>`
}
