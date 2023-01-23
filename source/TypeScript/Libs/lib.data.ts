import { getEntitiesData } from "./lib.request.js";

export const customerNames: any = await getEntitiesData('Customer')
export const citadelsNames: any = await getEntitiesData('Citadel')
