import { Review } from "@/types";

const names = [
  "Aarav M.", "Ishaan K.", "Vivaan S.", "Ananya R.", "Diya P.",
  "Kabir T.", "Myra J.", "Reyansh N.", "Zara A.", "Aditya V.",
];

const titles = [
  "Better than expected",
  "True to size, great fabric",
  "My new everyday piece",
  "Solid quality for the price",
  "Fit is spot on",
  "Exceeded expectations",
];

const comments = [
  "The fabric feels premium and the fit is exactly as described on the size chart. Delivery was quick too.",
  "Wore it for a week straight — holds shape well after washing. Would buy another colourway.",
  "Great attention to detail on the stitching. Slightly boxy but that's the look I wanted.",
  "Comfortable enough for training and looks sharp enough for the street after.",
  "Runs true to size for me. The colour in person is richer than the photos.",
];

export function generateReviews(productId: string, count: number, avgRating: number): Review[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${productId}-rev-${i}`,
    productId,
    author: names[i % names.length],
    rating: Math.max(3, Math.min(5, Math.round(avgRating + (i % 3 === 0 ? -1 : 0)))),
    title: titles[i % titles.length],
    comment: comments[i % comments.length],
    date: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * (3 + i)).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    verified: i % 4 !== 0,
  }));
}
