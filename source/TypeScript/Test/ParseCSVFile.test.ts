// @filename: ParseCSVFile.test.ts

import { UIControl } from "../Shared/Libs/lib.types.g";

export default class ParseCSV {
    private demoTable: UIControl = document.getElementById("demotable")

    public fileData: UIControl

    constructor(fileData: UIControl) {
        this.fileData = fileData
    }

    public createTable(fileData: any) {
        let data = this.fileData

        console.log(fileData)
    }
}
