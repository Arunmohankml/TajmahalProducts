"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Mail,
  Trash2,
  Edit2,
  Check,
  X,
  ShieldCheck,
  Bell,
  Star,
} from "lucide-react";
import { StaffEmail } from "@/lib/tajmahal_data";
import { tajmahalDb } from "@/lib/tajmahal_db";

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Partial<StaffEmail> | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadStaff();
    const handleUpdate = () => loadStaff();
    window.addEventListener("tajmahal_staff_updated", handleUpdate);
    return () => window.removeEventListener("tajmahal_staff_updated", handleUpdate);
  }, []);

  const loadStaff = async () => {
    const list = await tajmahalDb.getStaffEmails();
    setStaffList(list);
    setLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingStaff({
      name: "",
      email: "",
      role: "Export Inquiries Specialist",
      is_primary: staffList.length === 0,
      notify_inquiries: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (staff: StaffEmail) => {
    setEditingStaff({ ...staff });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff || !editingStaff.email) return;

    if (editingStaff.id) {
      await tajmahalDb.updateStaffEmail(editingStaff.id, {
        name: editingStaff.name || "Tajmahal Staff",
        email: editingStaff.email.trim().toLowerCase(),
        role: editingStaff.role || "Staff Member",
        is_primary: Boolean(editingStaff.is_primary),
        notify_inquiries: Boolean(editingStaff.notify_inquiries),
      });
      setSuccessMsg(`Updated staff member "${editingStaff.email}".`);
    } else {
      await tajmahalDb.addStaffEmail({
        name: editingStaff.name || "Tajmahal Staff",
        email: editingStaff.email.trim().toLowerCase(),
        role: editingStaff.role || "Staff Member",
        is_primary: Boolean(editingStaff.is_primary),
        notify_inquiries: Boolean(editingStaff.notify_inquiries),
      });
      setSuccessMsg(`Added staff email "${editingStaff.email}".`);
    }

    setIsModalOpen(false);
    setEditingStaff(null);
    setTimeout(() => setSuccessMsg(""), 4000);
    await loadStaff();
  };

  const handleDelete = async (id: string, email: string) => {
    if (confirm(`Remove "${email}" from authorized staff emails?`)) {
      await tajmahalDb.deleteStaffEmail(id);
      await loadStaff();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#C6A25E]/20 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1713]">
            Authorized Staff Emails
          </h1>
          <p className="text-xs text-[#6B6152] mt-1">
            Configure staff members authorized to receive customer carpet inquiries, quotes, and admin notifications
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#1F4E3D] hover:bg-[#0C2A20] text-xs text-[#F7F1E1] font-semibold transition-colors flex items-center space-x-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C6A25E]" />
          <span>Add Staff Email</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg("")} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-xs text-[#6B6152]">Loading staff emails...</div>
        ) : staffList.length === 0 ? (
          <div className="col-span-full p-8 text-center text-xs text-[#6B6152]">No staff emails configured.</div>
        ) : (
          staffList.map((staff) => (
            <div
              key={staff.id}
              className={`bg-white rounded-xl border p-5 space-y-3 transition-shadow hover:shadow-md relative overflow-hidden ${
                staff.is_primary ? "border-[#C6A25E] ring-1 ring-[#C6A25E]" : "border-[#C6A25E]/20"
              }`}
            >
              {staff.is_primary && (
                <div className="absolute top-0 right-0 bg-[#C6A25E] text-[#0F1713] text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider flex items-center space-x-1">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>Primary Desk</span>
                </div>
              )}

              <div className="flex items-start space-x-3 pt-1">
                <div className="w-10 h-10 rounded-full bg-[#1F4E3D]/10 text-[#1F4E3D] flex items-center justify-center font-serif text-lg font-bold flex-shrink-0">
                  {staff.name.charAt(0) || "T"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-[#0F1713] truncate">{staff.name}</div>
                  <div className="text-xs text-[#6B6152] truncate">{staff.role}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#C6A25E]/15 text-xs">
                <div className="flex items-center space-x-2 text-[#201C15]">
                  <Mail className="w-3.5 h-3.5 text-[#C6A25E] flex-shrink-0" />
                  <span className="font-mono text-[11px] truncate">{staff.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-[#6B6152] text-[11px]">
                  <Bell className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{staff.notify_inquiries ? "Receives Buyer Inquiries" : "Notifications Muted"}</span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-100">
                <button
                  onClick={() => handleOpenEdit(staff)}
                  className="p-1.5 rounded-lg hover:bg-[#F7F1E1] text-[#1F4E3D] text-xs font-medium flex items-center space-x-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(staff.id, staff.email)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 text-xs font-medium flex items-center space-x-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Staff Modal: Full Screen on mobile, completely hidden scrollbar */}
      {isModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-hidden">
          <div className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-md sm:rounded-2xl border-0 sm:border border-zinc-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Sticky Header */}
            <div className="flex items-center justify-between px-5 py-3.5 sm:py-4 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#1C1C1C]">
                    {editingStaff.id ? "Edit Staff Details" : "Add Staff Email"}
                  </h2>
                  <p className="text-[11px] text-[#767676]">Authorized desk recipient</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-[#1C1C1C] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Scrollable Body without scrollbars */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                    Full Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStaff.name || ""}
                    onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    placeholder="e.g. Tariq Ansari"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                    Staff Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={editingStaff.email || ""}
                    onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                    placeholder="e.g. export@tajmahalproducts.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                    Role / Department
                  </label>
                  <input
                    type="text"
                    value={editingStaff.role || ""}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    placeholder="e.g. European Sales & Client Relations"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                  />
                </div>

                <div className="space-y-2.5 pt-1">
                  <label className="flex items-center space-x-2.5 text-xs text-[#1C1C1C] cursor-pointer font-medium select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(editingStaff.is_primary)}
                      onChange={(e) => setEditingStaff({ ...editingStaff, is_primary: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0F2C59] focus:ring-[#0F2C59] border-zinc-300"
                    />
                    <span>Set as Primary Contact (default inquiry target)</span>
                  </label>

                  <label className="flex items-center space-x-2.5 text-xs text-[#1C1C1C] cursor-pointer font-medium select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(editingStaff.notify_inquiries)}
                      onChange={(e) => setEditingStaff({ ...editingStaff, notify_inquiries: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0F2C59] focus:ring-[#0F2C59] border-zinc-300"
                    />
                    <span>Notify on new website inquiries</span>
                  </label>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="px-5 py-3.5 border-t border-zinc-200 bg-[#F8F9FA] flex items-center justify-end space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-zinc-300 hover:bg-white text-xs font-semibold uppercase tracking-wider text-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#0F2C59] hover:bg-[#0A1C38] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Staff</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
