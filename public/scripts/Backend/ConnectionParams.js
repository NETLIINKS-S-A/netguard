// @filename: ConnectionParams.ts
import { login } from "../Shared/Functions/Login.js";
import { UserAgent, token } from "../Shared/Settings/Misc.js";
/**
 * @param mail
 * @param password
 */
export function connect(user) {
    async function generateToken() {
        const url = "https://backend.netliinks.com:443/oauth/token";
        const requestOptionParams = {
            method: "POST",
            body: `grant_type=password&username=${user.mail}&password=${user.password}`,
            headers: {
                Accept: "application/json",
                "User-agent": `${UserAgent}`,
                Authorization: "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF",
            }
        };
        fetch(url, requestOptionParams)
            .then((response) => response.json())
            .then((data) => {
            const loginInterface = document.getElementById("login");
            localStorage.setItem("access_token", token);
            if (data.error === "invalid_grant")
                alert("Credenciales incorrectas");
            else
                loginInterface.style.display = "none",
                    login.checkToken(),
                    window.location.reload();
        })
            .catch((error) => { throw new Error("Error: " + error); });
    }
}
