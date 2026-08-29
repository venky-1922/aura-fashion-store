const messages = [
  "FREE SHIPPING ON ORDERS ABOVE ₹2,999",
  "NEW DROP — MOBILITY LAB, OUT NOW",
  "EXTRA 10% OFF PREPAID ORDERS",
];

export function AnnouncementBar() {
  return (
    <div className="relative z-[60] flex h-9 items-center overflow-hidden bg-ink text-paper">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-16 whitespace-nowrap px-4">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="text-[10px] font-medium uppercase tracking-[0.18em]">
            {msg}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
