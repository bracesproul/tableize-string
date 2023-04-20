"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let HORIZONTAL = '════════════════════';
const SINGLE_HORIZONTAL = '═';
const LEFT_CORNER = '╔';
const RIGHT_CORNER = '╗';
const LEFT_VERTICAL = '╠';
const RIGHT_VERTICAL = '╣';
const LEFT_BOTTOM_CORNER = '╚';
const RIGHT_BOTTOM_CORNER = '╝';
const VERTICAL = '║';
const CROSS = '╬';
const TOP_HORIZONTAL = '╦';
const BOTTOM_HORIZONTAL = '╩';
const BASE_COLUMN_PADDING = 18;
function tableize(input) {
    const { headers, rows } = input;
    const headerAsStrings = headers.map(header => header.toString());
    const rowsAsStrings = rows.map(row => row.map(cell => cell.toString()));
    let tableString = LEFT_CORNER;
    const numberOfColumns = headerAsStrings.length;
    const numberOfRows = Math.max(...rows.map(row => row.length));
    let columnWidth = BASE_COLUMN_PADDING;
    // Checks if there are more row cells than columns.
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            if (!rows[j]?.[i]) {
                throw new Error('Can not have more row cells than columns.');
            }
        }
    }
    // Gets the longest string length in the headers and rows
    headerAsStrings.forEach((header) => {
        if (header.length > columnWidth) {
            columnWidth = header.length;
        }
    });
    rowsAsStrings.forEach((row) => {
        row.forEach((cell) => {
            if (cell.length > columnWidth) {
                columnWidth = cell.length;
            }
        });
    });
    if (columnWidth > BASE_COLUMN_PADDING) {
        HORIZONTAL = HORIZONTAL.padEnd(columnWidth + 2, SINGLE_HORIZONTAL);
    }
    ;
    const createMiddleRowBorder = () => {
        for (let i = 0; i < numberOfColumns; i++) {
            if (numberOfColumns === 1) {
                // is only one column
                tableString = `${tableString}${LEFT_VERTICAL}${HORIZONTAL}${RIGHT_VERTICAL}\n`;
            }
            else if (i === 0) {
                // is first header
                tableString = `${tableString}${LEFT_VERTICAL}${HORIZONTAL}`;
            }
            else if ((i + 1) === numberOfColumns) {
                // is last header
                tableString = `${tableString}${CROSS}${HORIZONTAL}${RIGHT_VERTICAL}\n`;
            }
            else {
                // is middle header
                tableString = `${tableString}${CROSS}${HORIZONTAL}`;
            }
        }
        ;
    };
    // 1. Creates the top border
    for (let i = 0; i < numberOfColumns; i++) {
        if (numberOfColumns === 1) {
            // is only one column
            tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_CORNER}\n`;
        }
        else if (i === 0) {
            // is first header
            tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${TOP_HORIZONTAL}`;
        }
        else if ((i + 1) === numberOfColumns) {
            // is last header
            tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_CORNER}\n`;
        }
        else {
            // is middle header
            tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${TOP_HORIZONTAL}`;
        }
    }
    ;
    // 2. Creates the header row
    for (let i = 0; i < numberOfColumns; i++) {
        if (numberOfColumns === 1) {
            // is only one column
            tableString = `${tableString}${VERTICAL} ${headerAsStrings[i]?.padEnd(columnWidth)} ${VERTICAL}\n`;
        }
        else if ((i + 1) === numberOfColumns) {
            // is last header
            tableString = `${tableString}${VERTICAL} ${headerAsStrings[i]?.padEnd(columnWidth)} ${VERTICAL}\n`;
        }
        else {
            // is middle header
            tableString = `${tableString}${VERTICAL} ${headerAsStrings[i]?.padEnd(columnWidth)} `;
        }
    }
    ;
    // 3. Creates the border beneath the header row
    createMiddleRowBorder();
    // 4. Creates the rows and applies a border beneath each row
    for (let i = 0; i < numberOfColumns; i++) {
        for (let j = 0; j < numberOfRows; j++) {
            const row = rowsAsStrings[i]?.[j]?.padEnd(columnWidth) ?? ''.padEnd(columnWidth);
            if (numberOfRows === 1) {
                // is only one column
                tableString = `${tableString}${VERTICAL} ${row} ${VERTICAL}\n`;
            }
            else if ((j + 1) === numberOfRows) {
                // is last column
                tableString = `${tableString}${VERTICAL} ${row} ${VERTICAL}\n`;
            }
            else {
                // is middle header
                tableString = `${tableString}${VERTICAL} ${row} `;
            }
        }
        if ((i + 1) === numberOfColumns) {
            // Is last column, create bottom border
            for (let i = 0; i < numberOfColumns; i++) {
                if (numberOfColumns === 1) {
                    // is only one column
                    tableString = `${tableString}${LEFT_BOTTOM_CORNER}${HORIZONTAL}${RIGHT_BOTTOM_CORNER}\n`;
                }
                else if (i === 0) {
                    // is first header
                    tableString = `${tableString}${LEFT_BOTTOM_CORNER}${HORIZONTAL}`;
                }
                else if ((i + 1) === numberOfColumns) {
                    // is last header
                    tableString = `${tableString}${BOTTOM_HORIZONTAL}${HORIZONTAL}${RIGHT_BOTTOM_CORNER}\n`;
                }
                else {
                    // is middle header
                    tableString = `${tableString}${BOTTOM_HORIZONTAL}${HORIZONTAL}`;
                }
            }
            ;
        }
        else {
            createMiddleRowBorder();
        }
    }
    ;
    return tableString;
}
exports.default = tableize;
//# sourceMappingURL=index.js.map