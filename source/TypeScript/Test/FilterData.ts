import { getEntitiesData } from "../Backend/Connection.js"
import { NLData } from "../Shared/Libs/lib.types.g.js"

export async function filterData(): Promise<void> {
    console.log("filter data is running...")

    const GETDATA: NLData = await getEntitiesData("User")

    GETDATA.forEach((data: NLData) => {
        console.log(data)
    })

}
let a: any = "lorem ipusm"
console.log(a instanceof String)

