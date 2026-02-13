'use client';
import React, { useState, useEffect } from 'react';
import { 
  Search, Eye, Trash2, Mail, Phone, X, 
  ChevronLeft, ChevronRight, Inbox, 
  Clock, AlertCircle, CheckCircle2, MoreHorizontal,
  TriangleAlert, Loader2
} from 'lucide-react';
import { juseAuth } from '../providers/AuthProvider';
import {useRouter} from 'next/navigation';
const AdminContactView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;
const { user, loading: authLoading } = useAuth();
const router = useRouter();
  // ---------- log user state ----------
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/");
      }
    }
  }, [authLoading, user, router]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search
      });
      const res = await fetch(`/api/contact?${queryParams}`);
      const result = await res.json();
      if (res.ok) {
        setData(result.submissions);
        setTotalPages(result.pagination.totalPages);
        setTotalItems(result.pagination.total);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 300);
    return () => clearTimeout(timer);
  }, [page, search]);

  const confirmDelete = async () => {
    if (!submissionToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/contact?id=${submissionToDelete._id}`, { method: 'DELETE' });
      if (res.ok) {
        setData(data.filter(item => item._id !== submissionToDelete._id));
        setSubmissionToDelete(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Contact Inquiries</h1>
            <p className="text-slate-500 mt-1 text-sm md:text-lg">Central hub for all website leads.</p>
          </div>
          <StatCard icon={<Inbox size={20}/>} label="Total Records" value={totalItems} />
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="hidden sm:flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 md:px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Sender</th>
                  <th className="hidden sm:table-cell px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Contact</th>
                  <th className="hidden lg:table-cell px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Preview</th>
                  <th className="hidden md:table-cell px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                  <th className="px-4 md:px-8 py-4 text-right text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? <Skeletons /> : data.length === 0 ? <EmptyState /> : data.map((sub) => (
                  <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="h-9 w-9 md:h-11 md:w-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {sub.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-700 text-sm md:text-base">{sub.name}</div>
                          <div className="sm:hidden text-[11px] text-slate-400 font-medium">{sub.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-8 py-6">
                      <div className="text-sm font-semibold text-slate-600">{sub.email}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{sub.phone || 'No phone'}</div>
                    </td>
                    <td className="hidden lg:table-cell px-8 py-6 max-w-[200px]">
                      <p className="text-sm text-slate-500 truncate">{sub.message}</p>
                    </td>
                    <td className="hidden md:table-cell px-8 py-6 whitespace-nowrap text-sm font-medium text-slate-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                      <div className="flex justify-end gap-1 md:gap-2">
                        {/* Always visible icons with subtle background for better touch targets */}
                        <button 
                          onClick={() => setSelectedSubmission(sub)} 
                          className="p-2 md:p-2.5 text-slate-500 hover:text-indigo-600 bg-slate-50 md:bg-transparent hover:bg-indigo-50 rounded-xl transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => setSubmissionToDelete(sub)} 
                          className="p-2 md:p-2.5 text-slate-500 hover:text-rose-600 bg-slate-50 md:bg-transparent hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-4 md:py-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-black text-slate-400 tracking-widest uppercase order-2 sm:order-1">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2 order-1 sm:order-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-30 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Detail View Modal --- */}
      {selectedSubmission && (
        <ModalLayout onClose={() => setSelectedSubmission(null)}>
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl md:rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl md:text-2xl">
                {selectedSubmission.name.charAt(0)}
              </div>
              <div className="pr-8">
                <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">{selectedSubmission.name}</h2>
                <p className="text-slate-500 font-medium text-sm md:text-lg truncate max-w-[200px] md:max-w-none">{selectedSubmission.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-10">
              <DetailBox label="Phone Number" value={selectedSubmission.phone || 'Not provided'} />
              <DetailBox label="Time Received" value={new Date(selectedSubmission.createdAt).toLocaleString()} />
            </div>

            <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-slate-100">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 md:mb-4 block">Inquiry Message</label>
              <p className="text-slate-700 leading-relaxed text-base md:text-xl font-medium italic">"{selectedSubmission.message}"</p>
            </div>

            <div className="mt-8 md:mt-10">
              <a href={`mailto:${selectedSubmission.email}`} className="w-full md:w-auto inline-block text-center bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                Reply via Email
              </a>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* --- Delete Modal --- */}
      {submissionToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TriangleAlert size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Delete Inquiry?</h3>
              <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
                Permanent deletion of inquiry from <span className="text-slate-900 font-bold">{submissionToDelete.name}</span>.
              </p>
              <div className="space-y-3">
                <button 
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? <Loader2 className="animate-spin" size={18} /> : "Confirm Delete"}
                </button>
                <button 
                  disabled={isDeleting}
                  onClick={() => setSubmissionToDelete(null)}
                  className="w-full py-4 bg-white text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all border border-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helpers ---

const ModalLayout = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
      <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
        <X size={24} />
      </button>
      {children}
    </div>
  </div>
);

const DetailBox = ({ label, value }) => (
  <div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2">{label}</h4>
    <p className="text-slate-800 font-bold text-sm md:text-lg">{value}</p>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white px-6 py-4 rounded-[24px] border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-slate-900 leading-none mt-0.5">{value}</p>
    </div>
  </div>
);

const Skeletons = () => (
  [...Array(5)].map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-8 py-6"><div className="h-10 w-10 bg-slate-100 rounded-xl"></div></td>
      <td className="hidden sm:table-cell px-8 py-6"><div className="h-4 bg-slate-100 rounded w-32"></div></td>
      <td className="hidden lg:table-cell px-8 py-6"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
      <td className="hidden md:table-cell px-8 py-6"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
      <td className="px-8 py-6 text-right"><div className="h-10 w-24 bg-slate-50 rounded-xl ml-auto"></div></td>
    </tr>
  ))
);

const EmptyState = () => (
  <tr>
    <td colSpan="5" className="px-8 py-20 text-center">
      <div className="max-w-xs mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mb-4"><Inbox size={32} /></div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Inbox Empty</h3>
        <p className="text-slate-400 text-sm">New leads will appear here automatically.</p>
      </div>
    </td>
  </tr>
);

export default AdminContactView;