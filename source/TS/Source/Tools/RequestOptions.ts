import { UI } from "../Sections/AppElements.js"

let requestHeader = new Headers()
requestHeader.append("Authorization", `Bearer ${UI.accessToken}`)
requestHeader.append("Cookie", "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF")

export let DTROptions: {} = {
    method: 'GET',
    headers: requestHeader,
    redirect: 'follow'
}
