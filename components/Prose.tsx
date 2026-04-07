export function Prose({ html }: { html: string }) {
  // Trusted HTML from our own markdown renderer (lib/content.ts escapes user
  // content then re-applies a closed set of tags). We control the input, so
  // dangerouslySetInnerHTML here is safe.
  //
  // We style descendants via the arbitrary-selector syntax instead of pulling
  // in @tailwindcss/typography so the template has fewer deps and a smaller
  // CSS footprint.
  return (
    <div
      className="max-w-none text-slate-700
        [&_h1]:font-display [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-12 [&_h1]:mb-4
        [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-3
        [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:leading-relaxed [&_p]:mb-4
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
        [&_li]:leading-relaxed
        [&_strong]:text-slate-900 [&_strong]:font-semibold
        [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
