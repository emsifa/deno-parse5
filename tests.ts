import * as parse5 from "./src/mod.ts";
import { assertStrictEq, assertEquals } from "https://deno.land/std/testing/asserts.ts";

const assertNodeTree = (document: any, expected: any) => {
  for (let key in expected) {
    if (key === "childNodes") {
      if (typeof document.childNodes !== "undefined") {
        assertEquals(document.childNodes.length, expected[key].length);
        document.childNodes.forEach((node: any, i: number) => {
          assertNodeTree(node, expected[key][i]);
        });
      }
    } else {
      assertEquals(document[key], expected[key]);
    }
  }
};

Deno.test('Regression - DOCTYPE empty fields (GH-236)', () => {
  const document = parse5.parse('<!DOCTYPE>');
  const doctype: any = document.childNodes[0];

  assertStrictEq(doctype.name, '');
  assertStrictEq(doctype.publicId, '');
  assertStrictEq(doctype.systemId, '');
});

Deno.test('Parsing default example from ASTExplorer', () => {
  const htmlString = `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
      </body>
    </html>
  `
  .trim();

  const document: parse5.Document = parse5.parse(htmlString);
  assertNodeTree(document, {
    "nodeName": "#document",
    "mode": "no-quirks",
    "childNodes": [
      {
        "nodeName": "#documentType",
        "name": "html",
        "publicId": "",
        "systemId": "",
      },
      {
        "nodeName": "html",
        "tagName": "html",
        "attrs": [],
        "namespaceURI": "http://www.w3.org/1999/xhtml",
        "childNodes": [
          {
            "nodeName": "head",
            "tagName": "head",
            "attrs": [],
            "namespaceURI": "http://www.w3.org/1999/xhtml",
            "childNodes": [],
          },
          {
            "nodeName": "body",
            "tagName": "body",
            "attrs": [],
            "namespaceURI": "http://www.w3.org/1999/xhtml",
            "childNodes": [
              {
                "nodeName": "#text",
                "value": "\n        ",
              },
              {
                "nodeName": "h1",
                "tagName": "h1",
                "attrs": [],
                "namespaceURI": "http://www.w3.org/1999/xhtml",
                "childNodes": [
                  {
                    "nodeName": "#text",
                    "value": "My First Heading",
                  }
                ],
              },
              {
                "nodeName": "#text",
                "value": "\n        ",
              },
              {
                "nodeName": "p",
                "tagName": "p",
                "attrs": [],
                "namespaceURI": "http://www.w3.org/1999/xhtml",
                "childNodes": [
                  {
                    "nodeName": "#text",
                    "value": "My first paragraph.",
                  }
                ],
              },
              {
                "nodeName": "#text",
              }
            ],
          }
        ],
      }
    ]
  });
});
