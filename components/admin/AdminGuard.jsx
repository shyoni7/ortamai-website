import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminGuard({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      
      // בדיקה שהמשתמש הוא admin
      if (currentUser.role !== 'admin') {
        setError("אין לך הרשאות גישה לעמוד זה");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }
      
      setUser(currentUser);
    } catch (err) {
      console.error("Auth error:", err);
      setError("נדרשת התחברות למערכת");
      // ניתוב לדף ההתחברות
      setTimeout(() => {
        base44.auth.redirectToLogin(window.location.pathname);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">טוען מערכת ניהול...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-right">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return children;
}