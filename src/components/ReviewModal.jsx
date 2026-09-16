import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
import { X, Star, Sparkles, Send } from 'lucide-react';

/**
 * Leave-a-review modal — star picker + short form, validation unchanged.
 */
export default function ReviewModal({ isOpen, onClose }) {
  const { showToast } = useCart();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [meal, setMeal] = useState('Big Classic Burger');
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useLockBodyScroll(isOpen);
  useEscape(onClose, isOpen);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      showToast('Please fill out your name and review', 'error', 'Missing details');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Thank you! Your review has been submitted for verification.', 'success', 'Review Received ⭐');
      setName('');
      setReview('');
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Leave a review"
    >
      <div
        className="relative my-4 w-full max-w-lg space-y-6 rounded-[1.5rem] border border-white/[0.09] bg-ink-850 p-6 shadow-glow-soft animate-scale-in sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid w-10 h-10 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-extrabold tracking-tight text-cream-50">
                Share your experience
              </h3>
              <p className="text-[11px] text-cream-500">
                Tell us how your Big Burger tasted
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="grid w-9 h-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-400 transition-colors hover:text-cream-50 hover:bg-white/[0.08]"
            aria-label="Close review form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <span className="field-label">Your rating</span>
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  className="p-1 transition-transform duration-150 hover:scale-125 active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-cream-700'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-gold-300">
                {hoverRating || rating}/5
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="rev-name" className="field-label">Your name</label>
            <input
              id="rev-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Michael Adeyemi"
              className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-sm text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
            />
          </div>

          {/* Meal */}
          <div>
            <label htmlFor="rev-meal" className="field-label">What did you order?</label>
            <input
              id="rev-meal"
              type="text"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              placeholder="e.g. Big Classic Burger & Truffle Fries"
              className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-sm text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
            />
          </div>

          {/* Review */}
          <div>
            <label htmlFor="rev-text" className="field-label">Your review</label>
            <textarea
              id="rev-text"
              rows={3}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Juicy? Crispy? Sizzling hot? Describe the meal…"
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-sm text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full"
          >
            {submitting ? (
              <span className="animate-pulse-soft">Submitting…</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit verified review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
