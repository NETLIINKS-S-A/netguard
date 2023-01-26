// @filename: lib.tools.ts
import { FNPHTMLElement } from "../Types/FunctionParameterTypes.js"
import { UIElement } from "./lib.types.js"

export const $color = {
    PRIMARY: "#54B3A4",
    primary: {
        p100: "#E0FBED",
        p200: "#C2F7E0",
        p300: "#9EE8CE",
        p400: "#7ED1BC",
        p500: "#54B3A4",
        p600: "#3D9993",
        p700: "#2A7E80",
        p800: "#1A5E67",
        p900: "#104655"
    },

    GREEN: "#5CBC4F",
    green: {
        g100: "#EBFBDE",
        g200: "#D3F8BE",
        g300: "#AFEA99",
        g400: "#8BD679",
        g500: "#5CBC4F",
        g600: "#3DA139",
        g700: "#27872B",
        g800: "#196D23",
        g900: "#0F5A1E"
    },

    BLUE: "#2877FF",
    blue: {
        b100: "#D3EAFF",
        b200: "#A9D2FF",
        b300: "#7EB7FF",
        b400: "#5D9FFF",
        b500: "#2877FF",
        b600: "#1D5BDB",
        b700: "#1443B7",
        b800: "#0C2F93",
        b900: "#07207A"
    },

    YELLOW: "#DDCD30",
    yellow: {
        y100: "#FFF8CC",
        y200: "#FFEF99",
        y300: "#FFE467",
        y400: "#FFDA41",
        y500: "#DDCD30",
        y600: "#D0CF21",
        y700: "#B78701",
        y800: "#936900",
        y900: "#7A5400"
    },

    RED: "#FF523F",
    red: {
        r100: "#FFE8D8",
        r200: "#FFCCB2",
        r300: "#FFA98B",
        r400: "#FF886F",
        r500: "#FF523F",
        r600: "#DB312E",
        r700: "#B71F29",
        r800: "#931426",
        r900: "#7A0C24"
    },

    SLATEGRAY: "#94A2B8",
    slategray: {
        s100: "#F7FBFC",
        s200: "#F1F5F9",
        s300: "#E2E8F0",
        s400: "#CCD5E1",
        s500: "#94A2B8",
        s600: "#64738C",
        s700: "#475469",
        s800: "#324255",
        s900: "#1E293B"
    },

    GRAY: "#9AA3AE",
    gray: {
        g100: "#F8FAFA",
        g200: "#F4F4F6",
        g300: "#E5E6EC",
        g400: "#D1D5DB",
        g500: "#9AA3AE",
        g600: "#6B7280",
        g700: "#4C5563",
        g800: "#374151",
        g900: "#1F2937"
    },

    ZING: "#A1A1AA",
    zing: {
        z100: "#FAFAFA",
        z200: "#F4F4F5",
        z300: "#E4E4E7",
        z400: "#D4D4D8",
        z500: "#A1A1AA",
        z600: "#71717A",
        z700: "#52525B",
        z800: "#3F3F46",
        z900: "#27272A"
    },

    NEUTRAL: "#A3A3A3",
    neutral: {
        n100: "#FAFAFA",
        n200: "#F5F5F5",
        n300: "#E5E4E5",
        n400: "#D4D4D4",
        n500: "#A3A3A3",
        n600: "#737373",
        n700: "#525252",
        n800: "#404040",
        n900: "#272626"
    },

    STONE: "#A8A29F",
    stone: {
        s100: "#FAFAF9",
        s200: "#F5F5F4",
        s300: "#E7E5E4",
        s400: "#D5D3D1",
        s500: "#A8A29F",
        s600: "#78716B",
        s700: "#56534F",
        s800: "#44403B",
        s900: "#292524"
    }
}

export const $font = {
    size: {
        small: "10px",
        mid: "12px",
        normal: "14px",
        large: "16px"
    },

    weigth: {
        normal: 400,
        semibold: 500,
        bold: 600,
        extraBold: 700,
        black: 800
    },

    cap: {
        lowercase: "lowercase",
        normal: "normal",
        uppercase: "uppercase"
    }
}

/**
 *
 * @param items - All db data
 * @param wrapper - Here render pagination
 * @param rowsPerPage - rows to show
 * @param currentPage - Actual page (1)
 * @param tableBody - the table body
 */
export function pagination(
    items: [],
    wrapper: UIElement,
    rowsPerPage: number,
    currentPage: number,
    tableBody?: UIElement,
    displayFunc?: any
): void {
    wrapper.innerHTML = ""
    let pageCount = Math.ceil(items.length / rowsPerPage)

    let btn: UIElement
    for (let i = 1; i < pageCount + 1; i++) {
        btn = setupButtons(
            i,
            items,
            currentPage,
            tableBody,
            rowsPerPage,
            displayFunc
        )
        wrapper.appendChild(btn)
    }

    truncatePagination(wrapper)
}

/**
 *
 * @param page
 * @param items
 * @param currentPage
 * @param tableBody
 * @returns button
 */
function setupButtons(
    page: FNPHTMLElement,
    items: [],
    currentPage: number,
    tableBody: UIElement,
    rowsPerPage: number,
    displayData: any
): void {
    const button: UIElement = document.createElement("button")
    button.innerText = page

    if (currentPage == page) button.classList.add("isActive")

    button.addEventListener("click", () => {
        currentPage = page
        displayData(items, tableBody, rowsPerPage, currentPage)

        let currentButton: UIElement = document.querySelector(
            ".pagination button.isActive"
        )
        currentButton.classList.remove("isActive")
        button.classList.add("isActive")
    })

    return button
}

async function truncatePagination(w: any): Promise<void> {
    const paginationWrapper: HTMLElement | any = w

    console.log(paginationWrapper)
}
