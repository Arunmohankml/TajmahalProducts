"use client";

import React from "react";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: "danger" | "warning" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm Action",
  type = "warning",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card (AnonVote Style) */}
      <div className="relative w-full max-w-md bg-white border border-zinc-200/80 p-8 rounded-[28px] shadow-2xl space-y-6">
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              type === "danger"
                ? "bg-red-50 text-red-600 border border-red-200"
                : type === "warning"
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "bg-blue-50 text-blue-600 border border-blue-200"
            }`}
          >
            <AlertCircle className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-lg text-zinc-950 tracking-tight">{title}</h3>
            <p className="text-xs text-zinc-400 font-mono">Verification Prompt</p>
          </div>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed font-normal">{message}</p>

        <div className="flex items-center space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white transition-all shadow-xs cursor-pointer ${
              type === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#18181b] hover:bg-zinc-800"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
