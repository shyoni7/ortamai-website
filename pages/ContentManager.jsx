import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Plus, Edit, Trash2, Save, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminGuard from "../components/admin/AdminGuard";

function ContentManagerContent() {
  const queryClient = useQueryClient();
  const [editingContent, setEditingContent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");

  const { data: contents, isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list('-created_date'),
    initialData: []
  });

  const { data: mediaFiles } = useQuery({
    queryKey: ['media'],
    queryFn: () => base44.entities.Media.list('-created_date'),
    initialData: []
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Content.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      setIsDialogOpen(false);
      setEditingContent(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Content.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      setIsDialogOpen(false);
      setEditingContent(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Content.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      page: formData.get('page'),
      section: formData.get('section'),
      content_type: formData.get('content_type'),
      content_he: formData.get('content_he') || '',
      content_en: formData.get('content_en') || '',
      media_id: formData.get('media_id') || null,
      description: formData.get('description'),
      is_active: true
    };

    if (editingContent) {
      updateMutation.mutate({ id: editingContent.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const pages = [
  { value: 'Home', label: 'דף הבית' },
  { value: 'Incubator', label: 'חממה טכנולוגית' },
  { value: 'Academy', label: 'אקדמיית AI' },
  { value: 'Placement', label: 'מרכז השמה' },
  { value: 'About', label: 'אודות' },
  { value: 'Contact', label: 'צור קשר' }];


  // סקשנים נפוצים לכל דף
  const commonSections = {
    Home: [
    { value: 'hero_title', label: 'כותרת ראשית' },
    { value: 'hero_subtitle', label: 'כותרת משנה' },
    { value: 'hero_video', label: 'סרטון/גיף ראשי' },
    { value: 'stats_title', label: 'כותרת סטטיסטיקות' },
    { value: 'value_props_title', label: 'כותרת יתרונות' }],

    Incubator: [
    { value: 'hero_title', label: 'כותרת ראשית' },
    { value: 'hero_subtitle', label: 'כותרת משנה' },
    { value: 'offerings_title', label: 'כותרת שירותים' }],

    Academy: [
    { value: 'hero_title', label: 'כותרת ראשית' },
    { value: 'hero_subtitle', label: 'כותרת משנה' },
    { value: 'programs_title', label: 'כותרת תוכניות' }],

    Placement: [
    { value: 'hero_title', label: 'כותרת ראשית' },
    { value: 'hero_subtitle', label: 'כותרת משנה' },
    { value: 'process_title', label: 'כותרת תהליך' }],

    About: [
    { value: 'hero_title', label: 'כותרת ראשית' },
    { value: 'mission_text', label: 'טקסט המשימה' }],

    Contact: [
    { value: 'hero_title', label: 'כותרת ראשית' },
    { value: 'hero_subtitle', label: 'כותרת משנה' }]

  };

  const filteredContents = contents.filter((c) => c.page === selectedPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">ניהול תוכן</h1>
            <p className="text-gray-400">עריכת טקסטים, כותרות ומדיה בדפי האתר</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  onClick={() => setEditingContent(null)}>
                  <Plus className="ml-2 h-4 w-4" />
                  הוסף תוכן חדש
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingContent ? 'עריכת תוכן' : 'הוספת תוכן חדש'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="page" className="text-white">דף</Label>
                      <Select name="page" defaultValue={editingContent?.page || 'Home'}>
                        <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                          <SelectValue placeholder="בחר דף" />
                        </SelectTrigger>
                        <SelectContent>
                          {pages.map((page) =>
                          <SelectItem key={page.value} value={page.value}>{page.label}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content_type" className="text-white">סוג תוכן</Label>
                      <Select name="content_type" defaultValue={editingContent?.content_type || 'text'}>
                        <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">טקסט</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="url">URL</SelectItem>
                          <SelectItem value="media">מדיה (תמונה/וידאו)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="section" className="text-white">מזהה איזור</Label>
                    <Input
                      id="section"
                      name="section"
                      defaultValue={editingContent?.section}
                      placeholder="לדוגמה: hero_title, hero_video"
                      className="bg-slate-800 border-white/10 text-white"
                      required />

                    <p className="text-xs text-gray-500 mt-1">
                      דוגמאות: hero_title, hero_subtitle, hero_video, section_title
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">תיאור</Label>
                    <Input
                      id="description"
                      name="description"
                      defaultValue={editingContent?.description}
                      placeholder="למה משמש התוכן הזה?"
                      className="bg-slate-800 border-white/10 text-white" />

                  </div>

                  <div>
                    <Label htmlFor="content_he" className="text-white">תוכן בעברית</Label>
                    <Textarea
                      id="content_he"
                      name="content_he"
                      defaultValue={editingContent?.content_he}
                      rows={4}
                      className="bg-slate-800 border-white/10 text-white"
                      placeholder="לדוגמה: כותרת, טקסט, URL" />

                  </div>

                  {/* Media Selection */}
                  <div>
                    <Label htmlFor="media_id" className="text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      בחר קובץ מדיה (אופציונלי)
                    </Label>
                    <Select name="media_id" defaultValue={editingContent?.media_id || ''}>
                      <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                        <SelectValue placeholder="ללא קובץ מדיה" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={null}>ללא קובץ מדיה</SelectItem>
                        {mediaFiles.map((media) =>
                        <SelectItem key={media.id} value={media.id}>
                            {media.file_type === 'image' ? '🖼️' : '🎥'} {media.title}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      אם בחרת "מדיה" בסוג תוכן, בחר כאן את הקובץ מהספרייה
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    disabled={createMutation.isPending || updateMutation.isPending}>
                    <Save className="ml-2 h-4 w-4" />
                    {editingContent ? 'עדכן' : 'הוסף'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Link to={createPageUrl("AdminDashboard")}>
              <Button variant="outline" className="bg-background text-gray-800 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-10 border-white/20 hover:bg-white/5">
                <ArrowRight className="ml-2 h-4 w-4" />
                חזרה
              </Button>
            </Link>
          </div>
        </div>

        {/* Page Tabs */}
        <Tabs value={selectedPage} onValueChange={setSelectedPage} className="mb-8">
          <TabsList className="bg-slate-900/50 border border-white/10">
            {pages.map((page) =>
            <TabsTrigger
              key={page.value}
              value={page.value}
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                {page.label}
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>

        {/* Content List */}
        <div className="grid grid-cols-1 gap-4">
          {isLoading ?
          <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
              <p className="text-gray-400">טוען תכנים...</p>
            </Card> :
          filteredContents.length === 0 ?
          <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                <p className="text-gray-400">עדיין אין תכנים בדף {pages.find((p) => p.value === selectedPage)?.label}.</p>
                <p className="text-gray-500 text-sm mt-2">התחל בהוספת תוכן חדש!</p>
              </Card> :
          filteredContents.map((content) => {
            const linkedMedia = content.media_id ? mediaFiles.find((m) => m.id === content.media_id) : null;

            return (
              <Card key={content.id} className="bg-slate-900/50 border-white/10">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg flex items-center gap-2">
                            {content.section}
                            {content.content_type === 'media' && <ImageIcon className="w-4 h-4 text-cyan-400" />}
                          </CardTitle>
                          {content.description &&
                      <p className="text-gray-400 text-sm mt-1">{content.description}</p>
                      }
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-gray-400">
                              {content.content_type}
                            </span>
                            {linkedMedia &&
                        <span className="text-xs bg-cyan-900/30 px-2 py-1 rounded text-cyan-400">
                                📎 {linkedMedia.title}
                              </span>
                        }
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                        size="sm"
                        variant="outline"
                        className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                        onClick={() => {
                          setEditingContent(content);
                          setIsDialogOpen(true);
                        }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                        size="sm"
                        variant="outline"
                        className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                        onClick={() => {
                          if (confirm('האם למחוק את התוכן הזה?')) {
                            deleteMutation.mutate(content.id);
                          }
                        }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {linkedMedia && linkedMedia.file_type === 'image' &&
                  <div className="mb-4">
                          <img src={linkedMedia.file_url} alt={linkedMedia.title} className="w-full max-w-md rounded-lg" />
                        </div>
                  }
                      {content.content_he &&
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                          <p className="text-gray-300 whitespace-pre-wrap">{content.content_he}</p>
                        </div>
                  }
                    </CardContent>
                  </Card>);

          })
          }
        </div>
      </div>
    </div>);

}

export default function ContentManager() {
  return (
    <AdminGuard>
      <ContentManagerContent />
    </AdminGuard>);

}