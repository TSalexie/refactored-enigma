'use client';

import { useState } from 'react';
import { Plus, Search, FileText, ChevronRight, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageDialog } from '@/components/pages/page-dialog';
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

export default function PagesIndexPage() {
  const { pages, addPage, updatePage, deletePage } = usePagesStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | undefined>();
  const [deletingPageId, setDeletingPageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleSavePage = (pageData: Partial<Page>) => {
    if (editingPage) {
      updatePage(editingPage.id, pageData);
    } else {
      addPage({
        user_id: 'current-user-id',
        title: pageData.title!,
        icon: pageData.icon,
        cover_url: pageData.cover_url,
        parent_page_id: pageData.parent_page_id,
        is_published: false,
        order: 0,
      });
    }
    setEditingPage(undefined);
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setDialogOpen(true);
    setActiveMenu(null);
  };

  const handleDelete = (id: string) => {
    deletePage(id);
    setDeletingPageId(null);
    setActiveMenu(null);
  };

  const handleNewPage = () => {
    setEditingPage(undefined);
    setDialogOpen(true);
  };

  // Filter pages
  const filteredPages = pages.filter((page) => {
    if (searchQuery) {
      return page.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Group pages by hierarchy
  const rootPages = filteredPages.filter((page) => !page.parent_page_id);
  const getSubPages = (parentId: string) => {
    return filteredPages.filter((page) => page.parent_page_id === parentId);
  };

  const PageItem = ({ page, level = 0 }: { page: Page; level?: number }) => {
    const subPages = getSubPages(page.id);

    return (
      <div>
        <div
          className="group flex items-center gap-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
          style={{ paddingLeft: `${level * 24 + 12}px` }}
        >
          {subPages.length > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-xl">{page.icon}</span>
          <Link
            href={`/dashboard/pages/${page.id}`}
            className="flex-1 font-medium hover:text-primary transition-colors"
          >
            {page.title}
          </Link>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setActiveMenu(activeMenu === page.id ? null : page.id)}
              className="p-1 hover:bg-secondary rounded"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Menu */}
          {activeMenu === page.id && (
            <div className="absolute right-4 mt-2 w-48 bg-card border rounded-lg shadow-lg p-1 z-10">
              <button
                onClick={() => handleEdit(page)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Page
              </button>
              <button
                onClick={() => setDeletingPageId(page.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Sub-pages */}
        {subPages.length > 0 && (
          <div>
            {subPages.map((subPage) => (
              <PageItem key={subPage.id} page={subPage} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pages</h1>
            <p className="text-muted-foreground">
              Create beautiful documents and organize your knowledge
            </p>
          </div>
          <Button onClick={handleNewPage}>
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Pages List */}
      {filteredPages.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? 'No pages found' : 'No pages yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Create your first page to start documenting'}
          </p>
          {!searchQuery && (
            <Button onClick={handleNewPage}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Page
            </Button>
          )}
        </div>
      ) : (
        <div className="border rounded-lg bg-card">
          {rootPages.map((page) => (
            <PageItem key={page.id} page={page} />
          ))}
        </div>
      )}

      {/* Statistics */}
      {filteredPages.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Pages</p>
            <p className="text-2xl font-bold">{filteredPages.length}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Root Pages</p>
            <p className="text-2xl font-bold">{rootPages.length}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Sub-pages</p>
            <p className="text-2xl font-bold">{filteredPages.length - rootPages.length}</p>
          </div>
        </div>
      )}

      {/* Page Dialog */}
      <PageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSavePage}
        page={editingPage}
      />

      {/* Delete Confirmation */}
      <Dialog open={!!deletingPageId} onOpenChange={() => setDeletingPageId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this page? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingPageId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingPageId && handleDelete(deletingPageId)}
            >
              Delete Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
