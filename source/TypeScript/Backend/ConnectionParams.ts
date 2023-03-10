// @filename: ConnectionParams.ts

import { login } from "../Shared/Functions/Login.js";
import { UserAgent } from "../Shared/Settings/Misc.settings.js";

/**
 * @param mail
 * @param password
 */
export function connect(mail: string, password: string) {
    generateToken()
    async function generateToken(): Promise<void> {
        const url: string = "https://backend.netliinks.com:443/oauth/token"
        const requestOptions = {
            method: "POST",
            body: `grant_type=password&username=${mail}&password=${password}`,
            headers: {
                Accept: "application/json",
                "User-agent": `${UserAgent}`,
                Authorization:
                    "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF",
            }
        }

        fetch(url, requestOptions)
            .then((response: Response) => response.json())
            .then((data) => {
                const loginInterface = <HTMLElement>document.getElementById("login")
                localStorage.setItem("access_token", data.access_token as string)

                if (data.error === "invalid_grant") alert("Credenciales incorrectas")

                else
                    loginInterface.style.display = "none",
                        login.checkToken(),
                        window.location.reload()
            })
            .catch((error) => { throw new Error("Error: " + error) })
    }
}
