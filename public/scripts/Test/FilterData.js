import { getEntitiesData } from "../Backend/Connection.js";
export async function filterData() {
    console.log("Starting test: Filter Data...");
    const GETDATA = await getEntitiesData("User");
}
