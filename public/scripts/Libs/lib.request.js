// @filename: RequestOptions.ts
import { UI } from "./lib.dom.js";
let requestHeader = new Headers();
requestHeader.append("Authorization", `Bearer ${UI.accessToken}`);
requestHeader.append("Content-Type", "application/json");
requestHeader.append("Cookie", "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF");
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
    const url = `https://backend.netliinks.com:443/rest/entities/${entities}?fetchPlan=full`;
    return await getData(url);
}
/**
 * @function getEntityData()
 * @description Obtiene un elemento de la entidad que lo contiene
 *
 * @param entities - El nombre de la entidad a acceder
 * @param entity - Nombre del elemento dentro de la entidad
*/
export async function getEntityData(entity, entities) {
    const url = `https://backend.netliinks.com:443/rest/entities/${entities}/${entity}`;
    return await getData(url);
}
