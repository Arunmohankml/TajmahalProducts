"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Archive,
} from "lucide-react";
import { ClientInquiry } from "@/lib/tajmahal_db";
import { tajmahalDb } from "@/lib/tajmahal_db";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadInquiries();
    const handleUpdate = () => loadInquiries();
    window.addEventListener("tajmahal_inquiries_updated", handleUpdate);
    return () => window.removeEventListener("tajmahal_inquiries_updated", handleUpdate);
  }, []);

  const loadInquiries = async () => {
    const list = await tajmahalDb.getInquiries();
    setInquiries(list);
    setLoading(false);
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.productTitle.toLowerCase().includes(search.toLowerCase()) ||
      inq.productCode.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search);

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (id: string, status: ClientInquiry["status"]) => {
    await tajmahalDb.updateInquiryStatus(id, status);
    await loadInquiries();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this inquiry record?")) {
      await tajmahalDb.deleteInquiry(id);
      await loadInquiries();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#C6A25E]/20 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1713]">
            Buyer Inquiries & Quote Requests
          </h1>
          <p className="text-xs text-[#6B6152] mt-1">
            Direct buyer requests received from the website enquiry forms and WhatsApp dispatch
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[#F7F1E1] border border-[#C6A25E]/30 text-xs text-[#201C15] font-medium self-start sm:self-auto">
          Total Inquiries: <strong className="text-[#1F4E3D]">{inquiries.length}</strong>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-[#C6A25E]/20">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#6B6152]" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, or carpet code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F7F1E1]/50 border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#F7F1E1]/50 border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New ({inquiries.filter((i) => i.status === "new").length})</option>
            <option value="quoted">Quoted ({inquiries.filter((i) => i.status === "quoted").length})</option>
            <option value="replied">Replied ({inquiries.filter((i) => i.status === "replied").length})</option>
            <option value="archived">Archived ({inquiries.filter((i) => i.status === "archived").length})</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table / List */}
      <div className="bg-white rounded-2xl border border-[#C6A25E]/20 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#6B6152]">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B6152]">
            No inquiry records found. When clients submit quote requests from the site, they will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#182620] text-[#E8D39D] font-medium border-b border-[#C6A25E]/30">
                <tr>
                  <th className="py-3 px-4">Client Contact</th>
                  <th className="py-3 px-4">Carpet Requested</th>
                  <th className="py-3 px-4 hidden md:table-cell">Desired Dimensions</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Notes</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C6A25E]/15">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#F7F1E1]/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0F1713] text-sm">{inq.clientName}</div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-[#6B6152] mt-0.5">
                        <Mail className="w-3 h-3 text-[#C6A25E]" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.phone && (
                        <div className="flex items-center space-x-1.5 text-[11px] text-[#6B6152]">
                          <Phone className="w-3 h-3 text-[#C6A25E]" />
                          <span>{inq.phone}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-[#0F1713]">{inq.productTitle}</div>
                      <div className="font-mono text-[11px] text-[#C6A25E]">{inq.productCode}</div>
                      <div className="text-[10px] text-[#6B6152]">{inq.collectionName}</div>
                    </td>

                    <td className="py-3 px-4 hidden md:table-cell text-[#6B6152]">
                      {inq.requestedSize || "Standard Dimensions"}
                    </td>

                    <td className="py-3 px-4 hidden lg:table-cell text-[#6B6152] max-w-xs truncate">
                      {inq.notes || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value as ClientInquiry["status"])}
                        className={`px-2 py-1 rounded text-[11px] font-medium border ${
                          inq.status === "new"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : inq.status === "quoted"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : inq.status === "replied"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-zinc-100 text-zinc-600 border-zinc-200"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="quoted">Quoted</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={`mailto:${inq.email}?subject=Tajmahal Products Quote: ${encodeURIComponent(inq.productTitle)}`}
                          className="p-1.5 rounded-lg hover:bg-[#F7F1E1] text-[#1F4E3D] transition-colors"
                          title="Send Email Reply"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
