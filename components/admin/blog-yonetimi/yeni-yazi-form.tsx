"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostStore } from "@/store/usePostStore";
import { Editor } from "@/components/admin/editor";

export function YeniYaziForm() {
  const { title, content, setTitle, setContent } = usePostStore();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Başlık</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yazı başlığı"
        />
      </div>
      <div>
        <Label htmlFor="content">İçerik</Label>
        <Editor
          value={content}
          onChange={setContent}
          placeholder="İçerik yazın..."
        />
      </div>
    </div>
  );
}
