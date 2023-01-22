export class TableFunctions {
    renderBadges(badges) {
        badges?.forEach((badge) => {
            if (badge?.innerText === "Enabled") {
                badge.classList.add("user_active");
                badge.innerText = "Activo";
            }
            else if (badge?.innerText === "Disabled") {
                badge.classList.add("user_inactive");
                badge.innerText = "Inactivo";
            }
        });
    }
    async deleteEntity() {
        console.log("This functions is under construction");
    }
}
