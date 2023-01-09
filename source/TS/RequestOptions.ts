// @filename: RequestOptions.ts
import { UI } from "./DomElements.js";

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

// fetch("https://backend.netliinks.com:443/rest/entities/Business/ab47dc9a-d05d-4e9e-65c5-089a6f0a7418", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
