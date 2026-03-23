import { Star, Quote } from "lucide-react";
import { reviews } from "../../data/products";

export function Testimonials() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f8f5f5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
            Testimonials
          </span>
          <h2
            className="mt-2 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
          >
            What Our B2B Partners Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill="#f59e0b" stroke="#f59e0b" />
              ))}
            </div>
            <span className="text-gray-800 font-bold">4.9</span>
            <span className="text-gray-400 text-sm">based on 1,240+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote size={26} style={{ color: "#f9e9ea" }} className="mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{review.comment}</p>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} fill={s <= review.rating ? "#f59e0b" : "none"} stroke={s <= review.rating ? "#f59e0b" : "#d1d5db"} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                  style={{ backgroundColor: review.color }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{review.name}</div>
                  <div className="text-gray-400 text-xs">
                    {review.role} · {review.company}
                  </div>
                </div>
                <div className="ml-auto text-gray-300 text-xs">{review.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
