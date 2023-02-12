// @filename: DragAndDropFiles.test.ts
import { AppContent } from "../Shared/Settings/Misc.settings.js";
import Color from "../Shared/Libs/lib.color.g.js";
export function dragAndDrop() {
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
    `;
    const dropZone = document.getElementById("drop-zone");
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        changeStyle(e.target, Color.blue.b500);
    });
    dropZone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        changeStyle(e.target, Color.gray.g400);
    });
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        changeStyle(e.target, Color.gray.g400);
        loadFile(e.dataTransfer?.files[0]);
    });
    const fileElement = document.getElementById("file-upload");
    fileElement.addEventListener("change", (e) => {
        loadFile(e.dataTransfer?.files[0]);
    });
    function changeStyle(obj, color) {
        obj.style.color = color;
        obj.style.border = `1px dashed ${color}`;
    }
    function loadFile(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        // progress bar
        // reader.addEventListener("progress", (e) => {
        //     let load = (e.loaded / file.size * 100)
        // })
        reader.addEventListener("load", (e) => {
            // @ts-ignore
            createTable(e.currentTarget.result);
            // @ts-ignore
            createJSON(e.currentTarget.result);
        });
    }
    let demoTable = document.getElementById("demotable");
    function createTable(data) {
        const allRows = data.split(/\r?\n|\r/);
        let table = "<table>";
        for (let row = 0; row < allRows.length; row++) {
            if (row === 0) {
                table += "<thead>";
                table += "<tr>";
            }
            else {
                table += "<tr>";
            }
            const cellsRow = allRows[row].split(";");
            for (let rowCell = 0; rowCell < cellsRow.length; rowCell++) {
                if (row === 0) {
                    table += "<th>";
                    table += cellsRow[rowCell];
                    table += "</th>";
                }
                else {
                    table += "<td>";
                    table += cellsRow[rowCell];
                    table += "</td>";
                }
            }
            if (row === 0) {
                table += "</tr>";
                table += "</thead>";
                table += "<tbody>";
            }
            else {
                table += "</tr>";
            }
        }
        table += "</tbody>";
        table += "</table>";
        // @ts-ignore
        demoTable.innerHTML = table;
    }
    function createJSON(data) {
        const allRows = data.split(/\r?\n|\r/);
        let table = "<table>";
        for (let row = 0; row < allRows.length; row++) {
            if (row === 0) {
                table += "<thead>";
                table += "<tr>";
            }
            else {
                table += "<tr>";
            }
            const cellsRow = allRows[row].split(";");
            for (let rowCell = 0; rowCell < cellsRow.length; rowCell++) {
                if (row === 0) {
                    table += "<th>";
                    table += cellsRow[rowCell];
                    table += "</th>";
                }
                else {
                    table += "<td>";
                    table += cellsRow[rowCell];
                    table += "</td>";
                }
            }
            if (row === 0) {
                table += "</tr>";
                table += "</thead>";
                table += "<tbody>";
            }
            else {
                table += "</tr>";
            }
        }
        table += "</tbody>";
        table += "</table>";
        // @ts-ignore
        demoTable.innerHTML = table;
    }
}
