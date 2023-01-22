import { UIElement } from "../../../Types/GeneralTypes.js"

export class TableFunctions {
    public renderBadges(badges: UIElement): void {
        badges?.forEach((badge: any) => {
            if (badge?.innerText === "Enabled") {
                badge.classList.add("user_active")
                badge.innerText = "Activo"
            } else if (badge?.innerText === "Disabled") {
                badge.classList.add("user_inactive")
                badge.innerText = "Inactivo"
            }
        })
    }

    public async deleteEntity(): Promise<void> {
        console.log("This functions is under construction")
    }
}
