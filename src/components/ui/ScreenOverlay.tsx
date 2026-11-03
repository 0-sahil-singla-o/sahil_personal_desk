import React, { useState } from 'react';
import { X, Printer, ArrowRight, ExternalLink, Sparkles, Send } from 'lucide-react';
import { deskStore, useDeskStore } from '../../store/deskStore';

export const ScreenOverlay: React.FC = () => {
  const focus = useDeskStore((s) => s.focus);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Looking for a vehicle in Sydney? I can search our live stock inventory for you.' },
  ]);

  if (!focus) return null;

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: `Great choice! I found 3 matching vehicles for "${userText}". Would you like to schedule a viewing or inspect full vehicle history?`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      {/* Container Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {focus === 'laptop' && 'Workstation · Portfolio Projects'}
              {focus === 'tablet' && 'Docket POS · Invoice Generator'}
              {focus === 'phone' && 'Automotive AI Sales Assistant'}
            </span>
          </div>

          <button
            onClick={() => deskStore.close()}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* LAPTOP VIEW: Projects */}
          {focus === 'laptop' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Featured Case Study
                </span>
                <h2 className="text-3xl font-bold text-neutral-900 mt-1">
                  Shine Motor — High Performance Dealership Platform
                </h2>
                <p className="mt-2 text-neutral-600 leading-relaxed">
                  Automated vehicle inventory synchronization, real-time lead capture, and instant WhatsApp integration. Built with Next.js, TypeScript, and Tailwind CSS.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
                <img
                  src="/work/shine-motor/cover.webp"
                  alt="Shine Motor Platform"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Other Projects Grid */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  More Shipped Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Docket',
                      desc: 'Cloud receipt generation & POS billing tool',
                      img: '/work/docket/cover.webp',
                    },
                    {
                      title: 'Miami Motors',
                      desc: 'Luxury car import & dealer showcase portal',
                      img: '/work/miami-motors/cover.webp',
                    },
                    {
                      title: 'Global Psychics',
                      desc: 'Live audio consultations & booking system',
                      img: '/work/global-psychics/cover.webp',
                    },
                    {
                      title: 'IPMA Portal',
                      desc: 'Enterprise accreditation and member dashboard',
                      img: '/work/ipma/cover.webp',
                    },
                  ].map((proj) => (
                    <div
                      key={proj.title}
                      className="group border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-neutral-50"
                    >
                      <img
                        src={proj.img}
                        alt={proj.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-neutral-900">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          {proj.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TABLET VIEW: Docket Invoice Generator */}
          {focus === 'tablet' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Docket POS Checkout
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Click 'Print Receipt' to trigger the 3D thermal printer on the desk!
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between text-sm pb-2 border-b border-neutral-200">
                  <span className="font-semibold text-neutral-900">3D Procedural Desk Experience</span>
                  <span className="font-medium">$120.00</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-neutral-200">
                  <span className="font-semibold text-neutral-900">WebGL / Three.js Engine</span>
                  <span className="font-medium">$340.00</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-neutral-200">
                  <span className="font-semibold text-neutral-900">Full Stack Automation</span>
                  <span className="font-medium">$250.00</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span>Total Due</span>
                  <span className="text-emerald-600">$710.00</span>
                </div>
              </div>

              <button
                onClick={() => {
                  deskStore.triggerPrint();
                  deskStore.close();
                }}
                className="w-full py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Printer className="w-5 h-5" />
                <span>Print Receipt On Desk Printer</span>
              </button>
            </div>
          )}

          {/* PHONE VIEW: AI Sales Chat & Vehicle Catalog */}
          {focus === 'phone' && (
            <div className="max-w-md mx-auto flex flex-col h-[500px]">
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">
                    AI Auto Concierge
                  </h3>
                  <span className="text-xs text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online · Connected to live inventory
                  </span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                        m.from === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="pt-3 border-t border-neutral-100 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about cars, pricing, or mileage..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
