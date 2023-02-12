import { getEntitiesData } from "../Backend/Connection.js"
import { NLData } from "../Shared/Libs/lib.types.g.js"

export async function filterData(): Promise<void> {
    console.log("Starting test: Filter Data...")

    const GETDATA: NLData = await getEntitiesData("User")

}