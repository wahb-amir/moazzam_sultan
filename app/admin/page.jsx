'use client';
import React, { useState, useEffect } from 'react';
import { 
  Search, Eye, Trash2, Mail, Phone, X, 
  ChevronLeft, ChevronRight, Inbox, 
  Clock, AlertCircle, CheckCircle2, MoreHorizontal 
} from 'lucide-react';

const AdminContactView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Pagination & Search State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    setData(data.filter(item => item._id !== id));
    try {
      await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Top Header & Stats --- */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Inquiries</h1>
              <p className="text-slate-500 mt-2 text-lg">Manage and respond to your latest site leads.</p>
            </div>
            
            <div className="flex gap-4">
              <StatCard icon={<Inbox size={20}/>} label="Total" value={totalItems} color="blue" />
            </div>
          </div>
        </div>

        {/* --- Main Dashboard Container --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                placeholder="Search by name, email or keyword..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Database
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 border-b border-slate-100">Sender</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 border-b border-slate-100">Contact Details</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 border-b border-slate-100">Preview</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 border-b border-slate-100">Received</th>
                  <th className="px-6 py-4 text-right text-[13px] font-semibold text-slate-500 border-b border-slate-100">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <Skeletons />
                ) : data.length === 0 ? (
                  <EmptyState />
                ) : (
                  data.map((sub) => (
                    <tr key={sub._id} className="group hover:bg-slate-50/50 transition-all cursor-default">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            {sub.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-700">{sub.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-slate-600 font-medium">{sub.email}</div>
                        {sub.phone && <div className="text-xs text-slate-400 mt-0.5">{sub.phone}</div>}
                      </td>
                      <td className="px-6 py-5 max-w-[240px]">
                        <p className="text-sm text-slate-500 truncate">{sub.message}</p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">
                        {new Date(sub.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <button onClick={() => setSelectedSubmission(sub)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => handleDelete(sub._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Professional Pagination */}
          <div className="px-6 py-5 bg-white border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{(page - 1) * limit + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(page * limit, totalItems)}</span> of {totalItems}
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 disabled:opacity-40 transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Detailed View Modal --- */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  {selectedSubmission.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedSubmission.name}</h2>
                  <p className="text-slate-500">{selectedSubmission.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSubmission(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</h4>
                  <p className="text-slate-700 font-medium">{selectedSubmission.phone || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Submitted On</h4>
                  <p className="text-slate-700 font-medium">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Message Content</h4>
                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                  "{selectedSubmission.message}"
                </p>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400 italic font-medium">Auto-saved to CRM</span>
              <a 
                href={`mailto:${selectedSubmission.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                <Mail size={18} /> Reply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[140px]">
    <div className={`p-2 rounded-xl bg-${color}-50 text-${color}-600`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-extrabold text-slate-900">{value}</p>
    </div>
  </div>
);

const Skeletons = () => (
  [...Array(6)].map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-5"><div className="h-10 w-10 bg-slate-100 rounded-full"></div></td>
      <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-32 mb-2"></div><div className="h-3 bg-slate-50 rounded w-24"></div></td>
      <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-48"></div></td>
      <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
      <td className="px-6 py-5"></td>
    </tr>
  ))
);

const EmptyState = () => (
  <tr>
    <td colSpan="5" className="px-6 py-20 text-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="p-4 bg-slate-50 rounded-full text-slate-300"><Inbox size={48} /></div>
        <p className="text-slate-500 font-medium text-lg">No inquiries found yet.</p>
        <p className="text-slate-400 text-sm">Once users fill out your form, they'll appear here.</p>
      </div>
    </td>
  </tr>
);

export default AdminContactView;