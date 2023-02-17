const LEFT_CORNER = '╔';
const RIGHT_CORNER = '╗';
const LEFT_VERTICAL = '╠';
const RIGHT_VERTICAL = '╣';
const LEFT_BOTTOM_CORNER = '╚';
const RIGHT_BOTTOM_CORNER = '╝';
const HORIZONTAL = '════════════════════';
const VERTICAL = '║';
const CROSS = '╬';
const TOP_HORIZONTAL = '╦';
const BOTTOM_HORIZONTAL = '╩';

type TabelizeInput = {
  headers: string[];
  rows: string[][];
}

const BASE_COLUMN_PADDING = 18;

export default function tableize(input: TabelizeInput) {
  const { headers, rows } = input;

  let tableString = LEFT_CORNER;

  const numberOfColumns = headers.length;
  const numberOfRows = Math.max(...rows.map(row => row.length));
  let columnWidth = BASE_COLUMN_PADDING;

  const checkIfMoreCellsThanColumns = () => {
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfColumns; j++) {
        if (!rows[j]?.[i]) {
          throw new Error('Can not have more row cells than columns.')
        }
      }
    }
  };
  checkIfMoreCellsThanColumns();

  const getMaxColumnWidth = () => {
    headers.forEach((header) => {
      if (header.length > columnWidth) {
        columnWidth = header.length;
      }
    });
    rows.forEach((row) => {
      row.forEach((cell) => {
        if (cell.length > columnWidth) {
          columnWidth = cell.length;
        }
      });
    })
  };
  getMaxColumnWidth();


  const createMiddleRowBorder = () => {
    for (let i = 0; i < numberOfColumns; i++) {
      if (numberOfColumns === 1) {
        // is only one column
        tableString = `${tableString}${LEFT_VERTICAL}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_VERTICAL}\n`;
      } else if (i === 0) {
        // is first header
        tableString = `${tableString}${LEFT_VERTICAL}${HORIZONTAL.padEnd(columnWidth + 2)}`;
      } else if ((i + 1) === numberOfColumns) {
        // is last header
        tableString = `${tableString}${CROSS}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_VERTICAL}\n`;
      } else {
        // is middle header
        tableString = `${tableString}${CROSS}${HORIZONTAL.padEnd(columnWidth + 2)}`;
      }
    };
  };

  const createBottomBorder = () => {
    for (let i = 0; i < numberOfColumns; i++) {
      if (numberOfColumns === 1) {
        // is only one column
        tableString = `${tableString}${LEFT_BOTTOM_CORNER}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_BOTTOM_CORNER}\n`;
      } else if (i === 0) {
        // is first header
        tableString = `${tableString}${LEFT_BOTTOM_CORNER}${HORIZONTAL.padEnd(columnWidth + 2)}`;
      } else if ((i + 1) === numberOfColumns) {
        // is last header
        tableString = `${tableString}${BOTTOM_HORIZONTAL}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_BOTTOM_CORNER}\n`;
      } else {
        // is middle header
        tableString = `${tableString}${BOTTOM_HORIZONTAL}${HORIZONTAL.padEnd(columnWidth + 2)}`;
      }
    };
  };

  const createTopBorder = () => {
    for (let i = 0; i < numberOfColumns; i++) {
      if (numberOfColumns === 1) {
        // is only one column
        tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_CORNER}\n`;
      } else if (i === 0) {
        // is first header
        tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${TOP_HORIZONTAL}`;
      } else if ((i + 1) === numberOfColumns) {
        // is last header
        tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${RIGHT_CORNER}\n`;
      } else {
        // is middle header
        tableString = `${tableString}${HORIZONTAL.padEnd(columnWidth + 2)}${TOP_HORIZONTAL}`;
      }
    };
  }

  const createHeaders = () => {
    for (let i = 0; i < numberOfColumns; i++) {
      if (numberOfColumns === 1) {
        // is only one column
        tableString = `${tableString}${VERTICAL} ${headers[i]?.padEnd(columnWidth)} ${VERTICAL}\n`;
      } else if ((i + 1) === numberOfColumns) {
        // is last header
        tableString = `${tableString}${VERTICAL} ${headers[i]?.padEnd(columnWidth)} ${VERTICAL}\n`;
      } else {
        // is middle header
        tableString = `${tableString}${VERTICAL} ${headers[i]?.padEnd(columnWidth)} `;
      }
    };
  };

  const createRows = () => {
    for (let i = 0; i < numberOfColumns; i++) {
      for (let j = 0; j < numberOfRows; j++) {
        const row = rows[i]?.[j]?.padEnd(columnWidth) ?? ''.padEnd(columnWidth);
  
        if (numberOfRows === 1) {
          // is only one column
          tableString = `${tableString}${VERTICAL} ${row} ${VERTICAL}\n`;
        } else if ((j + 1) === numberOfRows) {
          // is last column
          tableString = `${tableString}${VERTICAL} ${row} ${VERTICAL}\n`;
        } else {
          // is middle header
          tableString = `${tableString}${VERTICAL} ${row} `;
        }
      }
      if ((i + 1) === numberOfColumns) {
        // is last column
        createBottomBorder()
      } else {
        createMiddleRowBorder()
      }
    };
  };

  // 1. Creates the top border
  createTopBorder();

  // 2. Creates the header row
  createHeaders()

  // 3. Creates the border beneath the header row
  createMiddleRowBorder()

  // 4. Creates the rows and applies a border beneath each row
  createRows()

  return tableString;
}
