'use client' // This registers <Editor> as a Client Component

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  // Renders the editor instance using a React component.
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <BlockNoteView editor={editor} className="min-h-96  border p-4" />
    </div>
  );
}
