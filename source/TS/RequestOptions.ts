// @filename: RequestOptions.ts
import { UI } from "./DOMElements.js";

let requestHeader: Headers = new Headers()
requestHeader.append("Authorization", `Bearer ${UI.accessToken}`)
requestHeader.append("Content-Type", "application/json");
requestHeader.append("Cookie", "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF")

export async function getData(url: RequestInfo) {
    let GetRequestOption: {} = {
        method: 'GET',
        headers: requestHeader,
        redirect: 'follow'
    }

    const response : Response = await fetch(url, GetRequestOption)
    return await response.json()
}

export async function updateData(url: string, raw: any) {
    let PostRequestOption: {} = {
      method: 'PUT',
      headers: requestHeader,
      body: raw,
      redirect: 'follow'
    }

    await fetch(url, PostRequestOption)
            .then(Response => Response.json())
}
