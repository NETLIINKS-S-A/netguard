import { getEntitiesData } from "../Backend/Connection.js";
import { AppContent } from "../Shared/Settings/Misc.settings.js";
export async function filterData() {
    console.log("Starting test: Filter Data...");
    AppContent.innerHTML = `
    <h1 class="app_title">Filter data</h1>
    <div class="container">
        <div id="content"></div>
    </div>
    `;
    const GETDATA = await getEntitiesData("User");
    const content = document.getElementById("content");
    content.innerHTML = "Put your content here.";
    console.log(GETDATA);
}
