import Delta from 'quill-delta';

export type Ops = Delta['ops'];

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
}

export { Delta };
