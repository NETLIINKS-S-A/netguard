import { getEntitiesData } from "./lib.request.js";
export const customerNames = await getEntitiesData('Customer');
export const citadelsNames = await getEntitiesData('Citadel');
