import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Mail, Phone, Building, Briefcase, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import AdminGuard from "../components/admin/AdminGuard";

function SubmissionsManagerContent() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("contacts");

  // Fetch all submission types
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => base44.entities.ContactSubmission.list('-created_date'),
    initialData: []
  });

  const { data: consultations, isLoading: consultationsLoading } = useQuery({
    queryKey: ['consultations'],
    queryFn: () => base44.entities.ConsultationRequest.list('-created_date'),
    initialData: []
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => base44.entities.JobListing.list('-created_date'),
    initialData: []
  });

  // Update status mutations
  const updateContactMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.ContactSubmission.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] })
  });

  const updateConsultationMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.ConsultationRequest.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['consultations'] })
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.JobListing.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] })
  });

  const getStatusBadge = (status) => {
    const styles = {
      new: "bg-blue-100 text-blue-800",
      pending: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      in_review: "bg-yellow-100 text-yellow-800",
      contacted: "bg-green-100 text-green-800",
      active: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
      filled: "bg-purple-100 text-purple-800"
    };
    const labels = {
      new: "חדש",
      pending: "ממתין",
      in_progress: "בטיפול",
      in_review: "בבדיקה",
      contacted: "נוצר קשר",
      active: "פעיל",
      closed: "סגור",
      filled: "אוייש"
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">ניהול פניות</h1>
            <p className="text-gray-400">כל הפניות מהאתר במקום אחד</p>
          </div>
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <ArrowRight className="ml-2 h-4 w-4" />
              חזרה
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-slate-900/50 border border-white/10">
            <TabsTrigger value="contacts" className="gap-2">
              <Mail className="w-4 h-4" />
              יצירת קשר ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="consultations" className="gap-2">
              <FileText className="w-4 h-4" />
              הזמנות ייעוץ ({consultations.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="w-4 h-4" />
              משרות ({jobs.length})
            </TabsTrigger>
          </TabsList>

          {/* Contact Submissions */}
          <TabsContent value="contacts" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {contactsLoading ? (
                <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                  <p className="text-gray-400">טוען...</p>
                </Card>
              ) : contacts.length === 0 ? (
                <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                  <p className="text-gray-400">אין פניות יצירת קשר</p>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-slate-900/50 border-white/10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white text-lg">{contact.name}</CardTitle>
                              {getStatusBadge(contact.status)}
                            </div>
                            <p className="text-gray-400 text-sm">
                              נשלח ב-{new Date(contact.created_date).toLocaleDateString('he-IL')}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400/50 text-green-400 hover:bg-green-400/10"
                            onClick={() => updateContactMutation.mutate({ 
                              id: contact.id, 
                              status: contact.status === 'contacted' ? 'closed' : 'contacted' 
                            })}
                          >
                            {contact.status === 'contacted' ? 'סגור' : 'סמן כנוצר קשר'}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${contact.email}`} className="hover:text-cyan-400">
                              {contact.email}
                            </a>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${contact.phone}`} className="hover:text-cyan-400">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          {contact.company && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <Building className="w-4 h-4" />
                              {contact.company}
                            </div>
                          )}
                        </div>
                        {contact.message && (
                          <div className="bg-slate-800/50 p-4 rounded-lg">
                            <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Consultation Requests */}
          <TabsContent value="consultations" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {consultationsLoading ? (
                <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                  <p className="text-gray-400">טוען...</p>
                </Card>
              ) : consultations.length === 0 ? (
                <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                  <p className="text-gray-400">אין הזמנות ייעוץ</p>
                </Card>
              ) : (
                consultations.map((consultation) => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-slate-900/50 border-white/10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white text-lg">{consultation.business_name}</CardTitle>
                              {getStatusBadge(consultation.status)}
                            </div>
                            <p className="text-gray-400 text-sm">
                              נשלח ב-{new Date(consultation.created_date).toLocaleDateString('he-IL')}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400/50 text-green-400 hover:bg-green-400/10"
                            onClick={() => updateConsultationMutation.mutate({ 
                              id: consultation.id, 
                              status: consultation.status === 'contacted' ? 'closed' : 'contacted' 
                            })}
                          >
                            {consultation.status === 'contacted' ? 'סגור' : 'סמן כנוצר קשר'}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${consultation.email}`} className="hover:text-cyan-400">
                              {consultation.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${consultation.phone}`} className="hover:text-cyan-400">
                              {consultation.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Building className="w-4 h-4" />
                            {consultation.business_field}
                          </div>
                        </div>

                        <div className="bg-slate-800/50 p-4 rounded-lg space-y-3 text-sm">
                          {consultation.employees_count && (
                            <p className="text-gray-300">
                              <strong className="text-gray-200">מספר עובדים:</strong> {consultation.employees_count}
                            </p>
                          )}
                          {consultation.resource_consuming_tasks && (
                            <div>
                              <strong className="text-gray-200">משימות שגוזלות משאבים:</strong>
                              <p className="text-gray-400 mt-1 whitespace-pre-wrap">{consultation.resource_consuming_tasks}</p>
                            </div>
                          )}
                          {consultation.external_vendors && (
                            <div>
                              <strong className="text-gray-200">ספקים חיצוניים:</strong>
                              <p className="text-gray-400 mt-1 whitespace-pre-wrap">{consultation.external_vendors}</p>
                            </div>
                          )}
                          {consultation.competitors && (
                            <div>
                              <strong className="text-gray-200">מתחרים:</strong>
                              <p className="text-gray-400 mt-1 whitespace-pre-wrap">{consultation.competitors}</p>
                            </div>
                          )}
                          {consultation.business_links && (
                            <div>
                              <strong className="text-gray-200">קישורים לעסק:</strong>
                              <p className="text-gray-400 mt-1">{consultation.business_links}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Job Listings */}
          <TabsContent value="jobs" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {jobsLoading ? (
                <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                  <p className="text-gray-400">טוען...</p>
                </Card>
              ) : jobs.length === 0 ? (
                <Card className="bg-slate-900/50 border-white/10 p-8 text-center">
                  <p className="text-gray-400">אין משרות</p>
                </Card>
              ) : (
                jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-slate-900/50 border-white/10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white text-lg">{job.position_title}</CardTitle>
                              {getStatusBadge(job.status)}
                            </div>
                            <p className="text-cyan-400 font-medium">{job.company_name}</p>
                            <p className="text-gray-400 text-sm">
                              נשלח ב-{new Date(job.created_date).toLocaleDateString('he-IL')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                              onClick={() => updateJobMutation.mutate({ 
                                id: job.id, 
                                status: job.status === 'active' ? 'filled' : 'active' 
                              })}
                            >
                              {job.status === 'active' ? 'סמן כאוייש' : 'סמן כפעיל'}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${job.contact_email}`} className="hover:text-cyan-400">
                              {job.contact_email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${job.contact_phone}`} className="hover:text-cyan-400">
                              {job.contact_phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Building className="w-4 h-4" />
                            {job.contact_person}
                          </div>
                        </div>

                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <strong className="text-gray-200 block mb-2">דרישות התפקיד:</strong>
                          <p className="text-gray-400 whitespace-pre-wrap">{job.position_requirements}</p>
                        </div>

                        {job.profile_file_url && (
                          <div className="flex items-center gap-3 p-3 bg-cyan-900/20 border border-cyan-400/30 rounded-lg">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            <div className="flex-1">
                              <p className="text-cyan-400 font-medium">קובץ פרופיל משרה מצורף</p>
                            </div>
                            <a href={job.profile_file_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                                <Download className="w-4 h-4 ml-2" />
                                הורדה
                              </Button>
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function SubmissionsManager() {
  return (
    <AdminGuard>
      <SubmissionsManagerContent />
    </AdminGuard>
  );
}