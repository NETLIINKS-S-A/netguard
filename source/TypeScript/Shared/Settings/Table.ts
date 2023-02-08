// filename: Table.ts

/**
 * Limit size of table data
 */
type Rows = number
type Row = HTMLElement | null
type PaginationPage = number

interface TableSettings {
    rows: Rows,
    paginationPage: PaginationPage
}

export const tableSettings = {
    Rows: 16,
    paginationPage: 1
}
