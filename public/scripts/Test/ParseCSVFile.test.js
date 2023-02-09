// @filename: ParseCSVFile.test.ts
export default class ParseCSV {
    constructor(fileData) {
        this.demoTable = document.getElementById("demotable");
        this.fileData = fileData;
    }
    createTable(fileData) {
        let data = this.fileData;
        console.log(fileData);
    }
}
