import Delta, { type AttributeMap } from 'quill-delta';

type TypedAttributes = AttributeMap & {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  script?: 'sub' | 'super';
  background?: string;
  color?: string;
  link?: string;
  code?: boolean;
  blockquote?: boolean;
  header?: 1 | 2 | 3 | 4 | 5 | 6;
  list?: 'ordered' | 'bullet' | 'check';
  indent?: number;
  align?: 'center' | 'right' | 'justify';
  direction?: 'rtl';
  font?: string;
  size?: string;
};

type Op = Delta['ops'][0] & {
  attributes: TypedAttributes;
};

export type Ops = Op[];

const parseDelta = (delta: Delta, attributes: TypedAttributes) => {};

export class RichTextParser {
  delta: Delta;

  constructor(opts: Ops) {
    const delta = new Delta(opts);
    this.delta = delta;
    console.log('DELTA', delta);
    delta.eachLine((line, attributes, index: number) => {
      console.log(line, attributes, index);
    });
  }
  // parse() {
  //   const lines = []
  //   this.delta.eachLine((line, attributes: TypedAttributes, index: number) => {

  //     line.ops.map((op) => {

  //     })
  //   });
  // }
}

export { Delta };
