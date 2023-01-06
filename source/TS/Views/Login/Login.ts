import { UI } from "../../DomElements.js"
import { InterfaceElement } from "../../Types.js"
import { renderAppInterface } from "../AppView/AppView.js"

/**
 * @function login
 */

export function login<T>(mail: T, password: T) {
    generateToken()

    async function generateToken() {
        const url: string = "https://backend.netliinks.com:443/oauth/token"

        const requestOptions = {
			method: "POST",
			body: `grant_type=password&username=${mail}&password=${password}`,
			headers: {
				"Accept" : "application/json",
				"User-agent" : `${UI.UserAgent}`,
				"Authorization" : "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
				"Content-Type" : "application/x-www-form-urlencoded",
				"Cookie": "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF"
			}
		}

        fetch(url, requestOptions)
            .then((response: Response) => response.json())
            .then((data) => {
                const  login = UI.Login?.login
                localStorage.setItem("accessToken", data.access_token)

                if (data.error === "invalid_grant")
                    alert("Credenciales incorrectas")
                else
                    login.style.display = "none",
                    checkTokenValidation(),
                    renderAppInterface()
            }).catch((error) => console.error("Error: " + error))
    }
}

export function checkTokenValidation(): void {
    const AccessToken = UI.accessToken
    const app: InterfaceElement = UI.App.app
    const login: InterfaceElement = UI.Login?.login

        if (!AccessToken)
            app.style.display = "none"
        else if (AccessToken === "undefined")
            console.error("Error: access token is undefined")
        else if (AccessToken == null)
            console.error("Error: access token is null")
        else
            app.style.display = "block",
            login.style.display = "none",
            renderAppInterface()

    // if (!AccessToken)
    //     app.style.display = "none"
    // else if (AccessToken === "undefined")
    //     app.style.display = "none"
    // else if (AccessToken)
    //     app.style.display = "block",
    //     renderAppInterface(),
    //     console.log("rendered")
    // else
    //     login.style.display = "none"
}
