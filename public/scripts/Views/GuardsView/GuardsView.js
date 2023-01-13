// @filename: GuardsView.ts
import { getEntitiesData } from "../../RequestOptions.js";
export async function renderGuards() {
    let GET_DATA = await getEntitiesData("User");
    let arrayGuard = GET_DATA
        // @ts-ignore
        .filter(data => `${data.userType}`
        .includes("GUARD"));
    console.log(GET_DATA);
}
