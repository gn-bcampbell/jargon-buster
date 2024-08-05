// @ts-nocheck
import * as XLSX from "xlsx"; //https://docs.sheetjs.com/docs/getting-started/examples/import/

type SearchItem = {
    category: string,
    term: string,
    acronym: string,
    definition: string,
}[]

export async function SheetData() {
    /* parse workbook */
    const url = "jargon_and_acronyms.xlsx";
    const file = await (await fetch(url)).arrayBuffer();
    const workbook = XLSX.read(file);
    /* get sheet names */
    const sheetNames = workbook.SheetNames;

    /* get first worksheet */
    const worksheet = workbook.Sheets[sheetNames[0]];
    const raw_data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

    return convertToSearchItems(raw_data)
}

function convertToSearchItems(data: (string | undefined)[][]): SearchItem {
    return data.map((item) => {
        return {
            acronym: item[0] || '',
            category: item[1] || '',
            term: item[2] || '',
            definition: item[3] || '',
        };
    });
}