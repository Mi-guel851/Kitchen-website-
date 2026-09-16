import React from 'react';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import Reveal from './ui/Reveal';
import { Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';

function Stars({ rating = 5, size = 'w-3.5 h-3.5' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${size} ${
            i < rating ? 'fill-gold-400 text-gold-400' : 'text-cream-700'
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
    <section id="reviews" className="relative py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-gold-500/[0.05] blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10 sm:mb-14">
            <div>
              <p className="eyebrow">
                <span className="w-6 h-px bg-gold-500/60" aria-hidden="true" />
                Social Proof
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold tracking-[-0.02em] leading-[1.02] text-cream-50">
                Loved by 25,000+ hungry people
              </h2>
              <p className="mt-3 text-sm sm:text-base text-cream-400 max-w-lg">
                Don&rsquo;t take our word for it — read what the city is saying
                about the plates.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-3xl font-extrabold text-cream-50">
                    4.9
                  </span>
                  <Stars rating={5} size="w-4 h-4" />
                </div>
                <p className="mt-1 text-[11px] font-semibold text-cream-600">
                  2,500+ verified reviews
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenReviewModal}
                className="btn-ghost !py-3 !px-5 text-xs sm:text-sm"
              >
                <MessageSquarePlus className="w-4 h-4 text-ember-400" />
                Leave a review
              </button>
            </div>
          </div>
        </Reveal>

        {/* Review rail */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {reviews.map((rev, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={rev.id}
                delay={i * 70}
                className={`snap-center shrink-0 w-[86%] sm:w-[58%] md:w-auto md:shrink md:snap-none ${
                  featured ? 'md:col-span-2' : ''
                } h-full`}
              >
                <article className="flex h-full flex-col gap-4 rounded-[1.25rem] bg-ink-800 border border-white/[0.06] p-6 sm:p-7 transition-colors duration-300 hover:border-white/[0.13]">
                  <div className="flex items-center justify-between">
                    <Stars rating={rev.rating} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream-600">
                      {rev.date}
                    </span>
                  </div>

                  <p
                    className={`flex-1 leading-relaxed text-cream-300 ${
                      featured ? 'text-base sm:text-lg' : 'text-sm'
                    }`}
                  >
                    &ldquo;{rev.review}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-white/[0.12]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="truncate text-[13px] font-bold text-cream-50">
                          {rev.name}
                        </h4>
                        {rev.verified && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400"
                            title="Verified customer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] font-semibold text-gold-400/80">
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
