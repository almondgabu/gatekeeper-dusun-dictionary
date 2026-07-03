import { Cpu, Landmark, Target, Telescope, UserRound } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="rounded-[32px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)] sm:p-8"
    >
      <div className="max-w-4xl space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7f5f37]">About</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#2C1B12] sm:text-4xl">Gatekeeper Dusun Dictionary V1</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#dfcfb4] bg-[#fff9f1] p-5 md:col-span-2">
            <h3 className="text-lg font-semibold text-[#2C1B12]">About</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5e5144]">
              Gatekeeper Dusun Dictionary V1 is a modern digital language platform designed to preserve, document and promote the Dusun language through technology.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5e5144]">
              The platform combines a searchable dictionary, curated phrase collections and future AI-assisted learning tools into one integrated experience.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfcfb4] bg-[#fff9f1] p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2C1B12]"><Target size={19} strokeWidth={1.9} className="text-[#173D24]" />Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5e5144]">
              To make the Dusun language easier to learn, preserve and share with future generations.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfcfb4] bg-[#fff9f1] p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2C1B12]"><Telescope size={19} strokeWidth={1.9} className="text-[#173D24]" />Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5e5144]">
              To become the leading digital language preservation platform for the indigenous languages of Borneo.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfcfb4] bg-[#fff9f1] p-5 md:col-span-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2C1B12]"><UserRound size={19} strokeWidth={1.9} className="text-[#173D24]" />Platform Architect</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5e5144]">
              Almond Gabu envisioned and architected the platform as a long-term initiative to preserve the Dusun language through modern technology.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#dfcfb4] bg-[#fff9f1] p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2C1B12]"><Cpu size={19} strokeWidth={1.9} className="text-[#173D24]" />Technology</h3>
            <ul className="mt-2 space-y-1 text-sm text-[#5e5144]">
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>Supabase</li>
              <li>AI-ready architecture</li>
              <li>Responsive Design</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#2C1B12] p-5 text-[#F8F1E6]">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#D4AF37]"><Landmark size={16} strokeWidth={1.9} className="text-[#C89B2C]" />Owner</p>
            <p className="mt-2 text-lg font-semibold">Borneo Land Gatekeeper</p>
            <p className="text-sm text-[#f0dfc5]">Heritage Edition</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#2C1B12] p-5 text-[#F8F1E6]">
          <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">Credits</p>
          <p className="mt-2 text-sm leading-relaxed text-[#f0dfc5]">Platform authorship and leadership: Almond Gabu.</p>
        </div>
      </div>
    </section>
  );
}
