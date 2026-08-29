export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/916300578813"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with AURA on WhatsApp"
      className="fixed bottom-5 right-5 z-[65] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M16 3.1A12.8 12.8 0 0 0 5 22.5L3.2 29l6.7-1.75A12.9 12.9 0 1 0 16 3.1Zm0 23.3a10.5 10.5 0 0 1-5.35-1.47l-.38-.23-3.98 1.04 1.06-3.87-.25-.4A10.5 10.5 0 1 1 16 26.4Zm5.77-7.88c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.52-.16-.74.16-.21.31-.84 1.04-1.03 1.25-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.31-.02-.48.14-.63.14-.14.32-.37.47-.55.16-.19.21-.32.32-.53.1-.21.05-.39-.03-.55-.08-.16-.74-1.78-1.01-2.44-.27-.65-.54-.56-.74-.57l-.63-.01c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.79.65.75.24 1.43.2 1.97.12.6-.09 1.9-.78 2.17-1.53.27-.76.27-1.4.19-1.54-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
