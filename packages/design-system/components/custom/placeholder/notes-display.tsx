import { NotebookIcon } from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import type { BasePlaceholderProps } from './types';

export const NotesDisplay = ({
  notes: rawNotes,
}: Pick<BasePlaceholderProps, 'notes'>) => {
  if (!rawNotes) return null;

  const notes = React.useMemo(() => {
    return rawNotes
      ?.split('\n')
      .map((note, index) => {
        return note.trim();
      })
      .join('\n');
  }, [rawNotes]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="absolute top-0 right-0">
          <Button size="icon" variant="ghost">
            <NotebookIcon className="size-4" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="prose prose-base">
          <Markdown>{notes}</Markdown>
        </div>
      </PopoverContent>
    </Popover>
  );
};
