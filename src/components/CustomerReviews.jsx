import React from 'react';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import Reveal from './ui/Reveal';
import { Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { avatarFallback } from '../utils/avatar';

function Stars({ rating = 5, size = 'h-3.5 w-3.5' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${size} ${
            i < rating ? 'fill-caramel-400 text-caramel-400' : 'text-cream-400'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Social proof — featured review spans two columns on desktop; the whole
 * rail becomes a snap horizontal scroll on mobile.
 */
export default function CustomerReviews({ onOpenReviewModal }) {
  const reviews = INITIAL_REVIEWS;

  return (
    <section id="reviews" className="border-t border-cream-300 bg-white py-16 sm:py-24">
      <div className="shell">
        {/* Header */}
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden="true" />
                Social Proof
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,5.6vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-cocoa-900">
                Loved by 25,000+
                <br />
                hungry people.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-3xl font-extrabold text-cocoa-900">
                    4.9
                  </span>
                  <Stars rating={5} size="h-4 w-4" />
                </div>
                <p className="mt-1 text-[11px] font-semibold text-cocoa-500">
                  2,500+ verified reviews
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenReviewModal}
                className="btn-secondary !px-5 !py-3 text-xs sm:text-sm"
              >
                <MessageSquarePlus className="h-4 w-4 text-caramel-500" />
                Leave a review
              </button>
            </div>
          </div>
        </Reveal>

        {/* Review rail */}
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {reviews.map((rev, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={rev.id}
                delay={i * 70}
                className={`w-[84%] shrink-0 snap-center sm:w-[58%] md:w-auto md:shrink md:snap-none ${
                  featured ? 'md:col-span-2' : ''
                } h-full`}
              >
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-cream-300 bg-cream-50 p-6 transition-colors duration-300 hover:border-caramel-400/60 sm:p-7">
                  <div className="flex items-center justify-between">
                    <Stars rating={rev.rating} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cocoa-400">
                      {rev.date}
                    </span>
                  </div>

                  <p
                    className={`flex-1 leading-relaxed text-cocoa-700 ${
                      featured ? 'text-base sm:text-lg' : 'text-sm'
                    }`}
                  >
                    &ldquo;{rev.review}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 border-t border-cream-300 pt-4">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      loading="lazy"
                      onError={(e) => {
                        const fb = avatarFallback(rev.name);
                        if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                      }}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-cream-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="truncate text-[13px] font-extrabold text-cocoa-900">
                          {rev.name}
                        </h4>
                        {rev.verified && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-success-500"
                            title="Verified customer"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] font-semibold text-cocoa-400">
                        Ordered · {rev.foodOrdered}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
