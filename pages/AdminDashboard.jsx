
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Settings, Home, LogOut, Mail } from "lucide-react"; // Added Mail icon
import { base44 } from "@/api/base44Client";
import AdminGuard from "../components/admin/AdminGuard";

function AdminDashboardContent() {
  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">מערכת ניהול תוכן</h1>
            <p className="text-gray-400">ORTAM AI Admin Panel</p>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl("Home")}>
              <Button variant="outline" className="bg-background text-slate-800 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-10 border-white/20 hover:bg-white/5">
                <Home className="ml-2 h-4 w-4" />
                חזרה לאתר
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-red-400/50 text-red-400 hover:bg-red-400/10"
              onClick={handleLogout}>

              <LogOut className="ml-2 h-4 w-4" />
              התנתקות
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Management */}
          <Link to={createPageUrl("ContentManager")}>
            <Card className="bg-slate-900/50 border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">ניהול תוכן</CardTitle>
                <CardDescription className="text-gray-400">
                  עריכת טקסטים וכותרות בכל דפי האתר
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  פתח עורך תוכן
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Media Management */}
          <Link to={createPageUrl("MediaManager")}>
            <Card className="bg-slate-900/50 border-white/10 hover:border-purple-400/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <Image className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">ניהול מדיה</CardTitle>
                <CardDescription className="text-gray-400">
                  העלאת ועריכת תמונות, וידאו ומסמכים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  פתח ספריית מדיה
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* NEW: Submissions Management */}
          <Link to={createPageUrl("SubmissionsManager")}>
            <Card className="bg-slate-900/50 border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">ניהול פניות</CardTitle>
                <CardDescription className="text-gray-400">
                  צפייה וניהול כל הפניות מהאתר
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  פתח ניהול פניות
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Settings */}
          <Card className="bg-slate-900/50 border-white/10 hover:border-orange-400/50 transition-all cursor-pointer h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-orange-400" />
              </div>
              <CardTitle className="text-white">הגדרות</CardTitle>
              <CardDescription className="text-gray-400">
                הגדרות כלליות של האתר
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled>

                בקרוב
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/30 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">דפים באתר</CardTitle>
              <p className="text-3xl font-bold text-cyan-400">6</p>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900/30 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">אלמנטי תוכן</CardTitle>
              <p className="text-3xl font-bold text-purple-400">-</p>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900/30 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">קבצי מדיה</CardTitle>
              <p className="text-3xl font-bold text-orange-400">-</p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
