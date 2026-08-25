import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Sparkles, Send } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose }) {
  const { showToast } = useCart();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [meal, setMeal] = useState('Big Classic Burger');
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#141724] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Share Your Experience</h3>
              <p className="text-xs text-slate-400">Tell us how your Big Burger tasted</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Star Rating Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Your Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-amber-400">
                {hoverRating || rating} out of 5 stars
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Michael Adeyemi"
              className="w-full bg-[#1A1E2C] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          {/* Meal Ordered */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              What did you order?
            </label>
            <input
              type="text"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              placeholder="e.g. Big Classic Burger & Truffle Fries"
              className="w-full bg-[#1A1E2C] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          {/* Review text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Your Review
            </label>
            <textarea
              rows={3}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Was it juicy, crispy, sizzling hot? Describe your meal..."
              className="w-full bg-[#1A1E2C] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] resize-none"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-bold text-sm shadow-xl shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Verified Review</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
