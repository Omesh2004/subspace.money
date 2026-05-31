'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Bot } from 'lucide-react';

const FAQ_DATA = [
  {
    q: "What is Subspace and how does it work?",
    a: "Subspace is a premium subscription management platform. We help you track all your subscriptions in one place and securely split costs with friends or other verified users to save money."
  },
  {
    q: "Is it safe to share my subscription credentials?",
    a: "Absolutely. Subspace uses bank-level encryption to store credentials. Passwords are encrypted and never directly exposed; access is managed securely through our platform."
  },
  {
    q: "How do I join a split group?",
    a: "Navigate to the Explore page, find a deal you like, and click 'Join Split'. Once you complete the payment, you'll instantly get access to the shared service."
  },
  {
    q: "What happens if someone stops paying?",
    a: "Our system automatically manages billing. If a member's payment fails, they lose access immediately, and the spot automatically opens up for a new member on the marketplace."
  },
  {
    q: "Can I host my own subscription to share?",
    a: "Yes! You can host your own subscriptions. You set the price per slot and can either invite friends privately or make it public on our marketplace."
  },
  {
    q: "How is the money collected and paid out?",
    a: "We collect funds securely into your Subspace Wallet. You can withdraw your earnings to your linked bank account or UPI automatically at any time."
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major Credit/Debit cards, UPI (GPay, PhonePe, Paytm), and Net Banking. You can also pay directly using your Subspace Wallet balance."
  },
  {
    q: "Is there a fee for using Subspace?",
    a: "Tracking your subscriptions is 100% free. For splitting, we charge a very small nominal convenience fee per transaction to cover secure payment gateway costs."
  },
  {
    q: "How does the AI-powered Mailbox work?",
    a: "It connects securely to your email (read-only) to automatically detect subscription receipts and invoices, adding them to your dashboard so you never miss a hidden charge."
  },
  {
    q: "Can I cancel a split subscription anytime?",
    a: "Yes, you can leave a split at any time. Your access will continue until the end of your currently paid billing cycle, after which you won't be charged again."
  }
];

type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

export default function FAQBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi there! 👋 I'm the Subspace Assistant. How can I help you today? Choose a question below.", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleAskQuestion = (question: string, answer: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), text: question, isBot: false }]);
    
    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: answer, isBot: true }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--accent-violet)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(147, 51, 234, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999
        }}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '380px',
              height: '600px',
              maxHeight: '80vh',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.5rem',
              background: 'var(--accent-violet)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-outfit)' }}>Subspace Assistant</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Online & Ready</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isBot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: msg.isBot ? 'var(--bg-card)' : 'var(--accent-violet)',
                    color: msg.isBot ? 'var(--text-primary)' : 'white',
                    border: msg.isBot ? '1px solid var(--border-subtle)' : 'none',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    borderBottomLeftRadius: msg.isBot ? '4px' : 'var(--radius-md)',
                    borderBottomRightRadius: !msg.isBot ? '4px' : 'var(--radius-md)',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', borderBottomLeftRadius: '4px', display: 'flex', gap: '4px' }}>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* FAQ Questions List (Input Area) */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Suggested Questions</div>
              {FAQ_DATA.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(faq.q, faq.a)}
                  disabled={isTyping}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: isTyping ? 'not-allowed' : 'pointer',
                    transition: 'border-color 0.2s',
                    opacity: isTyping ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => { if(!isTyping) e.currentTarget.style.borderColor = 'var(--accent-violet)'; }}
                  onMouseLeave={(e) => { if(!isTyping) e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <span style={{ paddingRight: '0.5rem' }}>{faq.q}</span>
                  <ChevronRight size={16} color="var(--accent-violet)" style={{ flexShrink: 0 }} />
                </button>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
