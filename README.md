DENO PARSE5
===========

[Parse5](https://github.com/inikulin/parse5) port to Deno.

## Examples

#### Parse Document

```ts
import { parse } from 'https://raw.githubusercontent.com/emsifa/deno-parse5/master/src/mod.ts';

const html = `
    <!DOCTYPE html>
    <html>
        <body>
            <h1>My First Heading</h1>
            <p>My first paragraph.</p>
        </body>
    </html>
`;

const document = parse(html);

console.log(document);
```

#### Parse Fragment

```ts
import { parseFragment } from 'https://raw.githubusercontent.com/emsifa/deno-parse5/master/src/mod.ts';

const fragment = parseFragment(`<p>Example paragraph with <strong>bold</strong> text</p>`);

console.log(fragment);
```