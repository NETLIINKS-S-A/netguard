// @filename: RequestOptions.ts
import { UI } from "./lib.dom.js"

let requestHeader: Headers = new Headers()
requestHeader.append("Authorization", `Bearer ${UI.accessToken}`)
requestHeader.append("Content-Type", "application/json")
requestHeader.append("Cookie", "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF")

const BACKEND_ENTITIES_URL: string = "https://backend.netliinks.com:443/rest/entities/"

export async function getData(url: RequestInfo) {
    let GetRequestOption: {} = {
        method: "GET",
        headers: requestHeader,
        redirect: "follow",
    }

    const response: Response = await fetch(url, GetRequestOption)
    return await response.json()
}

export async function updateData(url: string, raw: any) {
    const fetchData: any = {
        url: url,
        PostRequestOption: {
            method: "PUT",
            headers: requestHeader,
            body: raw,
            redirect: "follow",
        },
    }

    let controller = new AbortController()
    await fetch(fetchData, {
        cache: "force-cache",
        mode: "same-origin",
        signal: controller.signal,
    }).then((Response) => Response.json())
}

/**
 * @function getEntitiesData()
 * @description Obtiene los datos completos de las entidades usando fetchPlans
 *
 * @param entities - El nombre de la entidad a acceder
*/
export async function getEntitiesData(entities: string): Promise<void> {
    const url = `${BACKEND_ENTITIES_URL}${entities}?fetchPlan=full`
    return await getData(url)
}

/**
 * @function getEntityData()
 * @description Obtiene un elemento de la entidad que lo contiene
 *
 * @param entities - El nombre de la entidad a acceder
 * @param entity - Nombre del elemento dentro de la entidad
*/
export async function getEntityData(
    entities: string,
    entity: string
): Promise<void> {
    const url = `${BACKEND_ENTITIES_URL}${entities}/${entity}?fetchPlan=full`
    return await getData(url)
}

export async function postNewData(entity: string, raw: any): Promise<void> {
    const postData: any = {
        url: `${BACKEND_ENTITIES_URL}${entity}`,
        requestOptions: {
            method: "POST",
            headers: requestHeader,
            body: raw,
            redirect: "follow"
        }
    }

    fetch(postData)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}
