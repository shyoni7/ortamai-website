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
import { ArrowRight, Upload, Trash2, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminGuard from "../components/admin/AdminGuard";

function MediaManagerContent() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: () => base44.entities.Media.list('-created_date'),
    initialData: []
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Media.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      setIsDialogOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Media.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    }
  });

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.target);
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const fileType = formData.get('file_type');
    const pageUsage = formData.get('page_usage');

    try {
      // העלאת הקובץ
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      // שמירה ב-DB
      await createMutation.mutateAsync({
        title,
        file_url,
        file_type: fileType,
        description,
        page_usage: pageUsage,
        tags: []
      });

      e.target.reset();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('שגיאה בהעלאת הקובץ');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      default:
        return '📁';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">ניהול מדיה</h1>
            <p className="text-gray-400">העלאת וניהול קבצי מדיה</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                  <Upload className="ml-2 h-4 w-4" />
                  העלה קובץ חדש
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-white">העלאת קובץ חדש</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div>
                    <Label htmlFor="file" className="text-white">בחר קובץ</Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      className="bg-slate-800 border-white/10 text-white"
                      required />

                  </div>

                  <div>
                    <Label htmlFor="title" className="text-white">כותרת</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="שם הקובץ"
                      className="bg-slate-800 border-white/10 text-white"
                      required />

                  </div>

                  <div>
                    <Label htmlFor="file_type" className="text-white">סוג קובץ</Label>
                    <Select name="file_type" defaultValue="image">
                      <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">תמונה</SelectItem>
                        <SelectItem value="video">וידאו</SelectItem>
                        <SelectItem value="document">מסמך</SelectItem>
                        <SelectItem value="other">אחר</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="page_usage" className="text-white">שימוש בדף</Label>
                    <Input
                      id="page_usage"
                      name="page_usage"
                      placeholder="לדוגמה: Home, Incubator"
                      className="bg-slate-800 border-white/10 text-white" />

                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">תיאור</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="תיאור הקובץ"
                      rows={3}
                      className="bg-slate-800 border-white/10 text-white" />

                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    disabled={uploading}>

                    <Upload className="ml-2 h-4 w-4" />
                    {uploading ? 'מעלה...' : 'העלה קובץ'}
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

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ?
          <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
              <p className="text-gray-400">טוען קבצים...</p>
            </Card> :
          mediaFiles.length === 0 ?
          <Card className="bg-slate-900/50 border-white/10 p-8 text-center col-span-full">
              <p className="text-gray-400">עדיין אין קבצי מדיה. התחל בהעלאת קובץ חדש!</p>
            </Card> :

          mediaFiles.map((media) =>
          <Card key={media.id} className="bg-slate-900/50 border-white/10 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getFileTypeIcon(media.file_type)}</span>
                      <CardTitle className="text-white text-base">{media.title}</CardTitle>
                    </div>
                    <Button
                  size="sm"
                  variant="outline"
                  className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                  onClick={() => {
                    if (confirm('האם למחוק את הקובץ הזה?')) {
                      deleteMutation.mutate(media.id);
                    }
                  }}>

                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Preview */}
                  {media.file_type === 'image' &&
              <div className="w-full h-48 bg-slate-800 rounded-lg overflow-hidden">
                      <img
                  src={media.file_url}
                  alt={media.title}
                  className="w-full h-full object-cover" />

                    </div>
              }

                  {/* Details */}
                  {media.description &&
              <p className="text-gray-400 text-sm">{media.description}</p>
              }
                  
                  {media.page_usage &&
              <p className="text-gray-500 text-xs">דף: {media.page_usage}</p>
              }

                  {/* URL Copy */}
                  <div className="flex gap-2">
                    <Input
                  value={media.file_url}
                  readOnly
                  className="bg-slate-800 border-white/10 text-white text-xs flex-1" />

                    <Button
                  size="sm"
                  variant="outline" className="bg-background text-slate-800 px-3 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 border-white/20 hover:bg-white/5"





                  onClick={() => copyToClipboard(media.file_url)}>

                      {copiedUrl === media.file_url ?
                  <Check className="h-4 w-4" /> :

                  <Copy className="h-4 w-4" />
                  }
                    </Button>
                  </div>
                </CardContent>
              </Card>
          )
          }
        </div>
      </div>
    </div>);

}

export default function MediaManager() {
  return (
    <AdminGuard>
      <MediaManagerContent />
    </AdminGuard>);

}