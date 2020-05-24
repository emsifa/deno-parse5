export type DocumentMode = "no-quirks" | "quirks" | "limited-quirks";

export interface Node {
  nodeName: string;
  childNodes?: Node[];
}

export interface CommentNode {
  data: string;
  nodeName: "#comment";
  parentNode: Node;
  sourceCodeLocation?: Location;
}

export interface TextNode {
  nodeName: "#text";
  parentNode: Node;
  sourceCodeLocation: Location;
  value: string;
}

export interface Document extends Node {
  mode: DocumentMode;
  nodeName: "#document";
  childNodes: Node[];
}

export interface DocumentFragment extends Node {
  childNodes: Node[];
  nodeName: "#document-fragment";
}

export interface DocumentType {
  name: string;
  nodeName: "#documentType";
  publicId: string;
  systemId: string;
}

export interface Location {
  endCol: number;
  endOffset: number;
  endLine: number;
  startCol: number;
  startOffset: number;
  startLine: number;
}

export interface StartTagLocation {
  attrs: {
    [attributeName: string]: Location;
  };
  endCol: number;
  endOffset: number;
  endLine: number;
  startCol: number;
  startOffset: number;
  startLine: number;
}

export interface EndLocation {
  endCol: number;
  endOffset: number;
  endLine: number;
  endTag: Location;
}

export interface ElementLocation {
  attrs: {
    [attributeName: string]: Location;
  };
  endCol: number;
  endOffset: number;
  endLine: number;
  endTag: Location;
  startCol: number;
  startOffset: number;
  startLine: number;
  startTag: StartTagLocation;
}

export interface Attribute {
  name: string;
  value: string;
  namespace?: string;
  prefix?: string;
}

export interface Element extends Node {
  attrs: Attribute[];
  namespaceURI: string;
  nodeName: string;
  parentNode: Node;
  sourceCodeLocation?: ElementLocation;
}

export interface ParserOptions {
  sourceCodeLocationInfo?: boolean;
  scriptingEnabled?: boolean;
  treeAdapter: TreeAdapter;
}

export interface SerializerOptions {
  treeAdapter?: TreeAdapter;
}

export interface TreeAdapter {
  adoptAttributes(recipient: Element, attrs: Attribute[]): void;
  appendChild(parentNode: Node, newNode: Node): void;
  createCommentNode(data: string): CommentNode;
  createDocument(): Document;
  createDocumentFragment(): DocumentFragment;
  createElement(tagName: string, namespaceURI: string, attrs: Attribute[]): Element;
  detachNode(node: Node): void;
  getAttrList(element: Element): Attribute[];
  getChildNodes(node: Node): Node[];
  getCommentNodeContent(commentNode: CommentNode): string;
  getDocumentMode(recipient: Element, attrs: Attribute[]): void;
  getDocumentTypeNodeName(document: Document): DocumentMode;
  getDocumentTypeNodePublicId(doctypeNode: DocumentType): string;
  getDocumentTypeNodeSystemId(doctypeNode: DocumentType): string;
  getFirstChild(node: Node): Node;
  getNamespaceURI(element: Element): string;
  getNodeSourceCodeLocation(node: Node): Location | ElementLocation;
  getParentNode(node: Node): Node;
  getTagName(element: Element): string;
  getTemplateContent(templateElement: Element): DocumentFragment;
  getTextNodeContent(textNode: TextNode): string;
  insertBefore(parentNode: Node, newNode: Node, referenceNode: Node): void;
  insertText(parentNode: Node, text: string): void;
  insertTextBefore(parentNode: Node, text: string, referenceNode: Node): void;
  isCommentNode(node: Node): boolean;
  isDocumentTypeNode(node: Node): boolean;
  isElementNode(node: Node): boolean;
  isTextNode(node: Node): boolean;
  setDocumentMode(document: Document, mode: DocumentMode): void;
  setDocumentType(document: Document, name: string, publicId: string, systemId: string): void;
  setNodeSourceCodeLocation(node: Node, location: Location | ElementLocation): void;
  setTemplateContent(templateElement: Element, contentElement: DocumentFragment): void;
  updateNodeSourceCodeLocation(node: Node, endLocation: EndLocation): void;
}

export function parse(html: string, options?: ParserOptions): Document;
export function parseFragment(context: Element, html: string, options?: ParserOptions): DocumentFragment;
export function parseFragment(html: string, options?: ParserOptions): DocumentFragment;
export function serialize(node: Node, options?: SerializerOptions): string;
