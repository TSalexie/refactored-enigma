'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MoreVertical, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageDialog } from '@/components/pages/page-dialog';
import { RichTextEditor } from '@/components/editor/rich-text-editor';
import { usePagesStore } from '@/store/pages';
import { Page } from '@productivity-app/shared';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function PageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const { pages, updatePage, deletePage, addPage } = usePagesStore();
  const [pageDialogOpen, setPageDialogOpen] = useState(false);
  const [subPageDialogOpen, setSubPageDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [content, setContent] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const page = pages.find((p) => p.id === pageId);
  const subPages = pages.filter((p) => p.parent_page_id === pageId);

  // Load content (in real app, this would come from blocks)
  useEffect(() => {
    if (page) {
      // In a real app, we'd fetch blocks content here
      setContent('<p>Start writing your content here...</p>');
    }
  }, [page]);

  if (!page) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Page not found</p>
        <Link href="/dashboard/pages">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pages
          </Button>
        </Link>
      </div>
    );
  }

  const handleSavePage = (pageData: Partial<Page>) => {
    updatePage(pageId, pageData);
  };

  const handleSaveSubPage = (pageData: Partial<Page>) => {
    addPage({
      user_id: 'current-user-id',
      title: pageData.title!,
      icon: pageData.icon,
      cover_url: pageData.cover_url,
      parent_page_id: pageId,
      is_published: false,
      order: subPages.length,
    });
  };

  const handleDelete = () => {
    deletePage(pageId);
    router.push('/dashboard/pages');
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // In a real app, we'd save this to the backend/blocks
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/pages"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Pages
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSubPageDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Sub-page
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg p-1 z-10">
                    <button
                      onClick={() => {
                        setPageDialogOpen(true);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Page
                    </button>
                    <button
                      onClick={() => {
                        setDeleteDialogOpen(true);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Cover Image */}
        {page.cover_url && (
          <div className="w-full h-64 mb-8 rounded-lg overflow-hidden">
            <img
              src={page.cover_url}
              alt="Page cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-6xl">{page.icon}</span>
            <h1 className="text-4xl font-bold">{page.title}</h1>
          </div>
        </div>

        {/* Sub-pages */}
        {subPages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">SUB-PAGES</h2>
            <div className="grid grid-cols-2 gap-3">
              {subPages.map((subPage) => (
                <Link key={subPage.id} href={`/dashboard/pages/${subPage.id}`}>
                  <div className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{subPage.icon}</span>
                      <span className="font-medium">{subPage.title}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Rich Text Editor */}
        <RichTextEditor
          content={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
        />
      </div>

      {/* Dialogs */}
      <PageDialog
        open={pageDialogOpen}
        onOpenChange={setPageDialogOpen}
        onSave={handleSavePage}
        page={page}
      />

      <PageDialog
        open={subPageDialogOpen}
        onOpenChange={setSubPageDialogOpen}
        onSave={handleSaveSubPage}
        parentPageId={pageId}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{page.title}"? This action cannot be undone and
              all sub-pages will also be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
