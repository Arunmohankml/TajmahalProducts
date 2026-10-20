"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import {
  findBestResponse,
  ChatBotAnswer,
  BotAction,
} from "@/lib/chatbot_knowledge";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actions?: BotAction[];
  suggestedQuestions?: string[];
}

const INITIAL_GREETING: Message = {
  id: "msg-welcome",
  sender: "bot",
  text: `Namaste and welcome to **Tajmahal Products** — six generations of handmade carpet craftsmanship from Bhadohi, India.\n\nI am your direct Atelier Concierge. Ask me anything about our collections, custom bespoke sizes, wholesale pricing, or worldwide insured shipping.`,
  timestamp: "Just now",
  actions: [
    {
      label: "Chat on WhatsApp (+91 82995 01435)",
      type: "whatsapp",
      url: "https://wa.me/918299501435?text=Namaste%20Tajmahal%20Products%2C%20I%20am%20exploring%20your%20rugs%20and%20would%20like%20to%20learn%20more.",
      isPrimary: true,
    },
    {
      label: "Explore Collections",
      type: "link",
      url: "/shop",
    },
  ],
  suggestedQuestions: [
    "What is your pricing & MOQ?",
    "Can I order custom sizes?",
    "Do you ship internationally?",
    "How to reach you on WhatsApp?",
  ],
};

export function AtelierChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      setShowTooltip(false);
      // Auto focus input on desktop
      if (window.innerWidth > 640) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [isOpen, messages, isTyping]);

  // Handle message sending
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    setHasInteracted(true);
    setInputText("");

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Realistic human-paced typing delay
    const typingDelay = Math.min(600 + query.length * 10, 1100);

    setTimeout(() => {
      const response: ChatBotAnswer = findBestResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        actions: response.actions,
        suggestedQuestions: response.suggestedQuestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `welcome-${Date.now()}`,
        timestamp: "Just now",
      },
    ]);
  };

  // Helper to format bot markdown text with bold and links
  const renderFormattedText = (rawText: string) => {
    return rawText.split("\n\n").map((paragraph, pIdx) => {
      // Check for bullet list
      if (paragraph.startsWith("• ") || paragraph.startsWith("1. ")) {
        const lines = paragraph.split("\n");
        return (
          <ul key={pIdx} className="space-y-1.5 my-2 pl-1 text-[13px] leading-relaxed">
            {lines.map((line, lIdx) => {
              const cleanedLine = line.replace(/^[•\d\.\s]+/, "");
              return (
                <li key={lIdx} className="flex items-start gap-2">
                  <span className="text-[#0F2C59] font-bold mt-1 text-[9px]">▪</span>
                  <span>{parseInlineFormatting(cleanedLine)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="text-[13px] leading-relaxed mb-2 last:mb-0">
          {parseInlineFormatting(paragraph)}
        </p>
      );
    });
  };

  // Helper for **bold** and [links](url)
  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-[#1C1C1C]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0F2C59] underline decoration-[#0F2C59]/40 hover:decoration-[#0F2C59] font-medium transition-colors"
          >
            {label}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* 1. Floating Launcher FAB */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end gap-3 select-none">
        {/* Subtle greeting pill (visible until interacted) */}
        {!isOpen && showTooltip && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 1 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2.5 bg-white text-[#1C1C1C] border border-[#E5E7EB] px-3.5 py-2 rounded-full shadow-lg shadow-black/5 cursor-pointer hover:border-[#0F2C59]/30 transition-all duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-medium tracking-wide">
              Need assistance? Ask our Atelier
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-neutral-400 hover:text-neutral-600 transition-colors ml-0.5"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Floating Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Atelier Concierge" : "Open Atelier Concierge"}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
            isOpen
              ? "bg-[#1C1C1C] text-white rotate-90"
              : "bg-[#0F2C59] text-white hover:bg-[#0A1F3F] shadow-[#0F2C59]/30"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2]" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 stroke-[1.8]" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* 2. Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
          />
        )}
      </AnimatePresence>

      {/* 3. Main Chatbox Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={`
              fixed z-50 flex flex-col bg-white border border-[#E5E7EB] shadow-2xl overflow-hidden
              /* Mobile: Almost fullscreen with clean 8px padding from screen edges */
              inset-2 bottom-3 sm:inset-auto sm:bottom-24 sm:right-6
              sm:w-[420px] sm:h-[630px] sm:max-h-[85vh] sm:rounded-2xl rounded-2xl
            `}
          >
            {/* Header */}
            <div className="bg-[#0F2C59] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#0A1F3F] flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-white font-semibold text-xs tracking-wider">
                  TM
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-medium text-sm tracking-wide text-white">
                      Atelier Concierge
                    </h3>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-white/70 font-light tracking-wide">
                    Bhadohi, India · Master Weavers
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center space-x-1 text-white/80">
                <button
                  onClick={resetConversation}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Contact Ribbon */}
            <div className="bg-[#F8F9FA] border-b border-[#EBEBEB] px-4 py-2 flex items-center justify-between text-xs text-[#525252] flex-shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">
                Live Export Desk
              </span>
              <a
                href="https://wa.me/918299501435?text=Hello%20Tajmahal%20Products%2C%20connecting%20from%20your%20website%20concierge."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F2C59] hover:underline"
              >
                <span>WhatsApp: +91 82995 01435</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#0F2C59] text-white rounded-tr-xs"
                        : "bg-[#F8F9FA] text-[#1C1C1C] border border-[#EBEBEB] rounded-tl-xs"
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Action Buttons attached to Bot message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[92%]">
                      {msg.actions.map((act, aIdx) => (
                        <a
                          key={aIdx}
                          href={act.url}
                          target={act.url?.startsWith("http") ? "_blank" : undefined}
                          rel={act.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 font-medium ${
                            act.isPrimary
                              ? "bg-[#0F2C59] text-white hover:bg-[#0A1F3F] shadow-xs"
                              : "bg-white text-[#1C1C1C] border border-[#D4D4D8] hover:border-[#0F2C59] hover:text-[#0F2C59]"
                          }`}
                        >
                          {act.type === "whatsapp" && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          )}
                          {act.type === "email" && <Mail className="w-3 h-3" />}
                          {act.type === "call" && <Phone className="w-3 h-3" />}
                          {act.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Suggested Question Chips */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.suggestedQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(q)}
                          className="text-[11px] tracking-wide bg-neutral-50 hover:bg-[#0F2C59]/5 text-neutral-700 hover:text-[#0F2C59] border border-[#E5E7EB] hover:border-[#0F2C59]/30 rounded-full px-2.5 py-1 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-neutral-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 text-neutral-500 bg-[#F8F9FA] border border-[#EBEBEB] w-fit px-3 py-2 rounded-2xl rounded-tl-xs">
                  <span className="text-xs text-neutral-500 font-serif italic">
                    Atelier is typing
                  </span>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#0F2C59] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#0F2C59] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#0F2C59] rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-[#EBEBEB] bg-white flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about rugs, custom sizes, pricing..."
                  className="flex-1 bg-[#F8F9FA] border border-[#E5E7EB] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#1C1C1C] placeholder:text-neutral-400 focus:outline-hidden focus:border-[#0F2C59] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-full bg-[#0F2C59] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0A1F3F] transition-colors flex-shrink-0 shadow-xs"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="mt-1.5 flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                <span>Handmade in Bhadohi Since 1967</span>
                <span>•</span>
                <span>Fuzzy Spell-Check Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
