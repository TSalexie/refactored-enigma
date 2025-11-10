'use client';

import { useState, useEffect } from 'react';
import { Page } from '@productivity-app/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PAGE_ICONS = ['📄', '📝', '📚', '💡', '🎯', '📊', '🔖', '✨', '🌟', '📌', '🎨', '🚀'];

interface PageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (page: Partial<Page>) => void;
  page?: Page;
  parentPageId?: string;
}

export function PageDialog({ open, onOpenChange, onSave, page, parentPageId }: PageDialogProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(PAGE_ICONS[0]);
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setIcon(page.icon || PAGE_ICONS[0]);
      setCoverUrl(page.cover_url || '');
    } else {
      setTitle('');
      setIcon(PAGE_ICONS[0]);
      setCoverUrl('');
    }
  }, [page, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pageData: Partial<Page> = {
      title,
      icon,
      cover_url: coverUrl || undefined,
      parent_page_id: parentPageId,
      is_published: false,
      order: 0,
    };

    if (page) {
      pageData.id = page.id;
    }

    onSave(pageData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{page ? 'Edit Page' : 'Create New Page'}</DialogTitle>
            <DialogDescription>
              {page
                ? 'Update the details of your page'
                : parentPageId
                ? 'Create a new sub-page'
                : 'Create a new page'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Icon Selector */}
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-6 gap-2">
                {PAGE_ICONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`p-2 text-2xl rounded-md border-2 transition-all hover:scale-110 ${
                      icon === emoji ? 'border-primary bg-primary/10' : 'border-transparent'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={500}
              />
            </div>

            {/* Cover URL (optional) */}
            <div className="space-y-2">
              <Label htmlFor="coverUrl">Cover Image URL (optional)</Label>
              <Input
                id="coverUrl"
                type="url"
                placeholder="https://..."
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
              />
              {coverUrl && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                  <img
                    src={coverUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '';
                      e.currentTarget.alt = 'Invalid image URL';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {page ? 'Update Page' : 'Create Page'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
