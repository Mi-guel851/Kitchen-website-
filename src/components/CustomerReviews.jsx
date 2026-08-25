import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import { Star, Quote, CheckCircle2, MessageSquarePlus, Sparkles } from 'lucide-react';

export default function CustomerReviews({ onOpenReviewModal }) {
  const [reviews] = useState(INITIAL_REVIEWS);

  return (
    <section id="reviews" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF5A1F]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Real Reviews from Real Foodies
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Loved by Over <span className="text-gradient-orange">25,000+ Customers</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Don't just take our word for it. Read what passionate burger lovers and foodies are saying about our dishes.
            </p>
          </div>

          <button
            onClick={onOpenReviewModal}
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 shadow-lg"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#FF5A1F]" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#141724]/80 border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10 group-hover:text-[#FF5A1F]/30 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Bottom Customer Info */}
              <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {rev.name}
                    </h4>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Customer" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#FF5A1F] font-semibold truncate">
                    Ordered: {rev.foodOrdered}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {rev.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
