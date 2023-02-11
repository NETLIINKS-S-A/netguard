import { getEntitiesData } from "../Backend/Connection.js";
export async function filterData() {
    console.log("filter data is running...");
    const GETDATA = await getEntitiesData("User");
    GETDATA.forEach((data) => {
        console.log(data);
    });
}
let a = "lorem ipusm";
console.log(a instanceof String);
