// @filename: DragAndDropFiles.test.ts

import { AppContent } from "../Shared/Settings/Misc.js"

// Shared libraries
import { color_ } from "../Shared/Libs/lib.color.g.js";
import { UIControl } from "../Shared/Libs/lib.types.g.js"

export function dragAndDrop(): void {
    AppContent.innerHTML = `
        <h1> Drag and drop files</h1>

        <br><br><br><br><br><br>

        <div class="container">
            <div class="drop_zone"
                id="drop-zone">
                    Arrastre sus archivos aquí

                    <br>

                    <input
                        type="file"
                        id="file-upload"
                        accept="text/csv">
            </div>

            <h3 id="table-preview">Vista previa</h3>
            <div id="demotable"></div>

            <div class="drop_result monospace">
            </div>
        </div>
    `

    const dropZone = <HTMLElement>document.getElementById("drop-zone")

    dropZone.addEventListener("dragover", (e): void => {
        e.preventDefault()
        changeStyle(e.target, color_.blue.b500)
    })

    dropZone.addEventListener("dragleave", (e): void => {
        e.preventDefault()
        changeStyle(e.target, color_.gray.g400)
    })

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault()
        changeStyle(e.target, color_.gray.g400)
        loadFile(e.dataTransfer?.files[0])
    })

    const fileElement: UIControl = document.getElementById("file-upload")

    fileElement.addEventListener("change", (e: any) => {
        loadFile(e.dataTransfer?.files[0])
    })

    function changeStyle(obj: UIControl, color: string): void {
        obj.style.color = color
        obj.style.border = `1px dashed ${color}`
    }

    function loadFile(file: any) {
        const reader: FileReader = new FileReader()

        reader.readAsText(file)

        // progressbar
        reader.addEventListener("progress", (e) => {
            let load = (e.loaded / file.size * 100)
        })

        reader.addEventListener("load", (e) => {
            // @ts-ignore
            createTable(e.currentTarget.result)
            // @ts-ignore
            createJSON(e.currentTarget.result)
        })
    }

    let demoTable = document.getElementById("demotable")

    function createTable(data: any): void {
        const allRows = data.split(/\r?\n|\r/)
        let table = "<table>"

        for (let row = 0; row < allRows.length; row++) {
            if (row === 0) {
                table += "<thead>"
                table += "<tr>"
            } else {
                table += "<tr>"
            }

            const cellsRow = allRows[row].split(";");

            for (let rowCell = 0; rowCell < cellsRow.length; rowCell++) {
                if (row === 0) {
                    table += "<th>"
                    table += cellsRow[rowCell]
                    table += "</th>"
                }

                else {
                    table += "<td>"
                    table += cellsRow[rowCell]
                    table += "</td>"
                }
            }

            if (row === 0) {
                table += "</tr>"
                table += "</thead>"
                table += "<tbody>"
            }

            else {
                table += "</tr>"
            }
        }

        table += "</tbody>"
        table += "</table>"

        // @ts-ignore
        demoTable.innerHTML = table
    }

    function createJSON(data: any): void {
        const allRows = data.split(/\r?\n|\r/)
        let table = "<table>"

        for (let row = 0; row < allRows.length; row++) {
            if (row === 0) {
                table += "<thead>"
                table += "<tr>"
            } else {
                table += "<tr>"
            }

            const cellsRow = allRows[row].split(";");

            for (let rowCell = 0; rowCell < cellsRow.length; rowCell++) {
                if (row === 0) {
                    table += "<th>"
                    table += cellsRow[rowCell]
                    table += "</th>"
                }

                else {
                    table += "<td>"
                    table += cellsRow[rowCell]
                    table += "</td>"
                }
            }

            if (row === 0) {
                table += "</tr>"
                table += "</thead>"
                table += "<tbody>"
            }

            else {
                table += "</tr>"
            }
        }

        table += "</tbody>"
        table += "</table>"

        // @ts-ignore
        demoTable.innerHTML = table
    }

}

