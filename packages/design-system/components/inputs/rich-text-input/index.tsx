'use client';

import { type Ops, RichTextParser, useQuill } from '@repo/rich-text';
import type React from 'react';
import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';

type RichTextInputProps = {
  initialValue?: Ops;
};

const Prose: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={cn('prose dark:prose-invert ', 'prose-a:text-primary')}>
      {children}
    </div>
  );
};

const TEST_VALUE: Ops = [
  {
    insert: 'const language = "JavaScript";',
  },
  {
    attributes: {
      'code-block': 'javascript',
    },
    insert: '\n',
  },
  {
    insert: 'console.log("I love " + language + "!");',
  },
  {
    attributes: {
      'code-block': 'javascript',
    },
    insert: '\n\n',
  },
  {
    insert: '\n',
  },
  {
    attributes: {
      bold: true,
    },
    insert: 'Hey ',
  },
  {
    attributes: {
      italic: true,
    },
    insert: 'Wassup',
  },
  {
    insert: '\n',
  },
];

export const RichTextInput = ({
  initialValue = TEST_VALUE,
}: RichTextInputProps) => {
  const { quill, quillRef } = useQuill({
    placeholder: 'Write something...',
  });

  // const [value, setValue] = useState(initialValue);
  const [value, setValue] = useState<Ops>(initialValue);

  useEffect(() => {
    if (quill && initialValue) {
      // quill.clipboard.dangerouslyPasteHTML(initialValue);
      const p = new RichTextParser(initialValue);
      quill.setContents(p.delta);
    }
  }, [quill, initialValue]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (_delta, _oldDelta, _source) => {
        // console.log('SOURCE', delta);
        console.log('Text change!');

        // console.log(quill.getText()); // Get text only
        const contents = quill.getContents();
        const parser = new RichTextParser(contents.ops);
        // console.log('CONTENTS', contents); // Get delta contents

        // contents.eachLine((line, attributes, index: number) => {
        //   console.log(line, attributes, index);
        // });
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef

        // console.log('LINES', quill.getLines());
        setValue(contents.ops);
        // setValue(quill.getSemanticHTML());
      });
    }
  }, [quill]);

  // console.log(value);

  return (
    <div className=" w-full ">
      <div ref={quillRef} />

      <Prose>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <div dangerouslySetInnerHTML={{ __html: value || '' }} />
      </Prose>
    </div>
  );
};
