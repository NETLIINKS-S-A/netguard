// @filename: Connection.ts
import { token } from "../Shared/Settings/Misc.settings.js";
let requestHeader = new Headers();
requestHeader.append("Authorization", `Bearer ${token}`);
requestHeader.append("Content-Type", "application/json");
requestHeader.append("Cookie", "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF");
const BACKEND_ENTITIES_URL = "https://backend.netliinks.com:443/rest/entities/";
export async function getData(url) {
    let GetRequestOption = {
        method: "GET",
        headers: requestHeader,
        redirect: "follow",
    };
    const response = await fetch(url, GetRequestOption);
    return await response.json();
}
export async function updateData(url, raw) {
    const fetchData = {
        url: url,
        PostRequestOption: {
            method: "PUT",
            headers: requestHeader,
            body: raw,
            redirect: "follow",
        },
    };
    let controller = new AbortController();
    await fetch(fetchData, {
        cache: "force-cache",
        mode: "same-origin",
        signal: controller.signal,
    }).then((Response) => Response.json());
}
/**
 * @function getEntitiesData()
 * @description Obtiene los datos completos de las entidades usando fetchPlans
 *
 * @param entities - El nombre de la entidad a acceder
 */
export async function getEntitiesData(entities) {
    const url = `${BACKEND_ENTITIES_URL}${entities}?fetchPlan=full`;
    return await getData(url);
}
/**
 * @function getEntityData()
 * @description Obtiene un elemento de la entidad que lo contiene
 *
 * @param entities - El nombre de la entidad a acceder
 * @param entity - Nombre del elemento dentro de la entidad
 */
export async function getEntityData(entities, entity) {
    const url = `${BACKEND_ENTITIES_URL}${entities}/${entity}?fetchPlan=full`;
    return await getData(url);
}
var raw = JSON.stringify({
    lastName: "Vaca",
    secondLastName: "Orrala",
    isSuper: false,
    email: "danny.vaca@mail.com",
    temp: "",
    isWebUser: false,
    active: true,
    firstName: "Danny",
    state: {
        id: "60885987-1b61-4247-94c7-dff348347f93",
    },
    phone: "0986778119",
    userType: "CUSTOMER",
    username: "danny.vaca@mail.com",
});
export async function postNewData(entity, raw) {
    const postData = {
        url: `${BACKEND_ENTITIES_URL}${entity}`,
        requestOptions: {
            method: "POST",
            headers: requestHeader,
            body: raw,
            redirect: "follow",
        },
    };
    console.log(postData);
    fetch(postData)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}
