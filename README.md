# Tableize string

This is a tiny package that takes in an input and returns a simple string table.

Example:
```ts
import tableize from 'tableize-string';

const data = {
  headers: ['Title', 'Author', 'Date'],
  rows: [
    ['The Hobbit', 'J.R.R. Tolkien', '1937'],
    ['The Lord of the Rings', 'J.R.R. Tolkien', '1954-1955'],
    ['The Silmarillion', 'J.R.R. Tolkien', '1977'],
  ],
}

const table = tableize(data);

console.log(table);
```

Output:
```md
╔═══════════════════════╦═══════════════════════╦═══════════════════════╗
║ Title                 ║ Author                ║ Date                  ║
╠═══════════════════════╬═══════════════════════╬═══════════════════════╣
║ The Hobbit            ║ J.R.R. Tolkien        ║ 1937                  ║
╠═══════════════════════╬═══════════════════════╬═══════════════════════╣
║ The Lord of the Rings ║ J.R.R. Tolkien        ║ 1954-1955             ║
╠═══════════════════════╬═══════════════════════╬═══════════════════════╣
║ The Silmarillion      ║ J.R.R. Tolkien        ║ 1977                  ║
╚═══════════════════════╩═══════════════════════╩═══════════════════════╝
```
