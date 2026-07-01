import { useState, useEffect, useRef } from "react";
import reportData from "@/data/report_data.json";

const sections = [
  { id: "overview", label: "OVERVIEW" },
  { id: "efficiency", label: "EFFICIENCY" },
  { id: "campaigns", label: "CAMPAIGNS" },
  { id: "demographics", label: "DEMOGRAPHICS" },
  { id: "strategy", label: "STRATEGY" },
  { id: "insights", label: "INSIGHTS" },
];

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return num.toLocaleString();
  return num.toString();
}

function formatCurrency(num: number): string {
  return "$" + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const data = reportData;

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
        <div className="container flex items-center justify-between h-12">
          <span className="font-mono-label text-[var(--maroon)] tracking-wider text-xs font-semibold">
            GA-01 META ADS REPORT
          </span>
          <div className="flex gap-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-sm ${
                  activeSection === id
                    ? "bg-[var(--maroon)] text-white"
                    : "text-gray-600 hover:text-[var(--maroon)] hover:bg-[var(--rose-light)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-[var(--maroon)] text-white py-16 px-4">
        <div className="container">
          <div className="inline-block bg-[var(--gold)] text-[var(--maroon)] px-3 py-1 rounded-sm mb-6">
            <span className="font-mono-label text-xs font-bold">
              UPDATED JUNE 21, 2026 · META ADS ANALYSIS
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            GA-01 Meta Ads<br />Performance Report
          </h1>
          <p className="text-white/80 text-lg mb-2">
            Amanda Hollowell for U.S. House, Georgia District 1
          </p>
          <p className="text-white/60 text-base">
            Primary vs. Runoff Campaign Comparison · Digital Advertising Analysis
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-[var(--gold)]">
                {formatCurrency(data.summary.runoff.total_spend)}
              </div>
              <div className="font-mono-label text-white/70 mt-1">RUNOFF SPEND</div>
              <div className="text-white/50 text-sm mt-0.5">31-day sprint</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-[var(--gold)]">
                {formatNumber(data.summary.runoff.total_results)}
              </div>
              <div className="font-mono-label text-white/70 mt-1">TOTAL RESULTS</div>
              <div className="text-white/50 text-sm mt-0.5">+43% vs Primary</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-[var(--gold)]">
                $0.039
              </div>
              <div className="font-mono-label text-white/70 mt-1">COST PER RESULT</div>
              <div className="text-white/50 text-sm mt-0.5">45% cheaper</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-[var(--gold)]">
                6.66x
              </div>
              <div className="font-mono-label text-white/70 mt-1">FREQUENCY</div>
              <div className="text-white/50 text-sm mt-0.5">2x Primary rate</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Section 01: Overview */}
        <section
          id="overview"
          ref={(el) => { sectionRefs.current["overview"] = el; }}
          className="scroll-mt-16 mb-20"
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono-label text-[var(--crimson)] text-sm">01</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--crimson)] font-medium">
              Campaign Overview
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-gray-700 leading-relaxed text-base mb-4">
                Amanda Hollowell's digital advertising strategy underwent a fundamental transformation between the primary and runoff elections. The primary campaign ran ads over approximately 17 months (January 2025 – May 20, 2026) across <strong>45 different campaigns</strong>, spending a total of <strong>{formatCurrency(data.summary.primary.total_spend)}</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed text-base">
                The runoff campaign compressed its efforts into a focused <strong>31-day sprint</strong> (May 21 – June 21, 2026) with just <strong>14 targeted campaigns</strong> and a total spend of <strong>{formatCurrency(data.summary.runoff.total_spend)}</strong>. Despite spending 22% less, the runoff generated 43% more results — a dramatic improvement in efficiency.
              </p>
            </div>

            {/* What Changed Card */}
            <div className="bg-[var(--rose-light)] border border-[var(--rose-header)] rounded-sm overflow-hidden">
              <div className="bg-[var(--rose-header)] px-4 py-2">
                <span className="font-mono-label text-[var(--crimson)] text-xs">
                  WHAT CHANGED IN THE RUNOFF
                </span>
              </div>
              <div className="divide-y divide-[var(--rose-header)]/50">
                {[
                  { label: "STRATEGY", desc: "From 45 scattered campaigns to 14 focused, county-specific efforts" },
                  { label: "FREQUENCY", desc: "Doubled voter contact rate: 6.66x vs 3.34x impressions per person" },
                  { label: "TARGETING", desc: "County-by-county engagement replacing broad district-wide ads" },
                  { label: "EFFICIENCY", desc: "Cost per result dropped 45%: $0.039 vs $0.071" },
                  { label: "OBJECTIVE", desc: "Shifted from link clicks/events to post engagement and reach" },
                ].map((item) => (
                  <div key={item.label} className="px-4 py-3 flex gap-4">
                    <span className="font-mono-label text-[var(--crimson)] text-xs whitespace-nowrap min-w-[80px]">
                      {item.label}
                    </span>
                    <span className="text-gray-700 text-sm">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side-by-side comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--rose-bg)]">
                  <th className="font-mono-label text-[var(--crimson)] text-left px-4 py-3 text-xs">METRIC</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">PRIMARY</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">RUNOFF</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">CHANGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { metric: "Total Spend", primary: "$2,914.54", runoff: "$2,276.83", change: "-22%", positive: true },
                  { metric: "Duration", primary: "~500 days", runoff: "31 days", change: "94% shorter", positive: true },
                  { metric: "Number of Campaigns", primary: "45", runoff: "14", change: "-69%", positive: true },
                  { metric: "Total Reach", primary: "79,857", runoff: "31,606", change: "-60%", positive: false },
                  { metric: "Total Impressions", primary: "266,957", runoff: "210,606", change: "-21%", positive: false },
                  { metric: "Frequency", primary: "3.34", runoff: "6.66", change: "+99%", positive: true },
                  { metric: "Total Results", primary: "41,158", runoff: "58,678", change: "+43%", positive: true },
                  { metric: "Cost per Result", primary: "$0.071", runoff: "$0.039", change: "-45%", positive: true },
                  { metric: "CPM", primary: "$10.92", runoff: "$10.81", change: "-1%", positive: true },
                  { metric: "Daily Spend", primary: "$5.83", runoff: "$73.45", change: "+1,160%", positive: true },
                  { metric: "Results per Dollar", primary: "14.12", runoff: "25.77", change: "+82%", positive: true },
                ].map((row) => (
                  <tr key={row.metric} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.metric}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{row.primary}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">{row.runoff}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${row.positive ? "text-green-700" : "text-amber-600"}`}>
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-[var(--border)] mb-20" />

        {/* Section 02: Efficiency */}
        <section
          id="efficiency"
          ref={(el) => { sectionRefs.current["efficiency"] = el; }}
          className="scroll-mt-16 mb-20"
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono-label text-[var(--crimson)] text-sm">02</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--crimson)] font-medium">
              Efficiency Comparison
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 max-w-3xl">
            The runoff campaign achieved dramatically better efficiency across every meaningful metric. By concentrating spend into a compressed timeframe with precise geographic targeting, the campaign generated <strong>82% more results per dollar spent</strong> while maintaining comparable CPM rates.
          </p>

          {/* Efficiency metric cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                label: "RESULTS PER DOLLAR",
                primary: "14.12",
                runoff: "25.77",
                improvement: "+82%",
                desc: "Nearly double the output per dollar invested"
              },
              {
                label: "COST PER RESULT",
                primary: "$0.071",
                runoff: "$0.039",
                improvement: "-45%",
                desc: "Less than half the cost to achieve each result"
              },
              {
                label: "DAILY REACH",
                primary: "160",
                runoff: "1,020",
                improvement: "+538%",
                desc: "6x more voters reached per day of campaigning"
              },
            ].map((card) => (
              <div key={card.label} className="border border-[var(--rose-header)] rounded-sm overflow-hidden">
                <div className="bg-[var(--rose-bg)] px-4 py-2">
                  <span className="font-mono-label text-[var(--crimson)] text-xs">{card.label}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-end gap-3 mb-2">
                    <span className="font-display text-2xl font-bold text-[var(--maroon)]">{card.runoff}</span>
                    <span className="text-sm text-gray-400 line-through">{card.primary}</span>
                  </div>
                  <div className="inline-block bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-semibold mb-2">
                    {card.improvement}
                  </div>
                  <p className="text-gray-600 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Frequency Analysis */}
          <div className="bg-[var(--rose-light)] border border-[var(--rose-header)] rounded-sm p-6 mb-8">
            <h3 className="font-display text-xl text-[var(--crimson)] mb-3">Frequency: The Key Differentiator</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The runoff campaign's frequency of <strong>6.66 impressions per person</strong> (vs. 3.34 in the primary) was the single most important tactical change. In a low-awareness runoff election where most voters didn't know there was a second vote, repeated exposure was critical. This aligns perfectly with the campaign's strategy that "awareness, not persuasion, is the dominant problem."
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="font-mono-label text-xs text-gray-500 mb-1">PRIMARY FREQUENCY</div>
                <div className="flex items-center gap-3">
                  <div className="font-display text-3xl font-bold text-gray-400">3.34x</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-400 rounded-full h-3" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-mono-label text-xs text-gray-500 mb-1">RUNOFF FREQUENCY</div>
                <div className="flex items-center gap-3">
                  <div className="font-display text-3xl font-bold text-[var(--crimson)]">6.66x</div>
                  <div className="flex-1 bg-[var(--rose-header)] rounded-full h-3">
                    <div className="bg-[var(--crimson)] rounded-full h-3" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spend Intensity */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-sm p-5">
              <h4 className="font-mono-label text-xs text-gray-500 mb-3">DAILY SPEND INTENSITY</h4>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-2xl font-bold text-[var(--maroon)]">$73.45</span>
                <span className="text-sm text-gray-500">/day (Runoff)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg text-gray-400">$5.83</span>
                <span className="text-sm text-gray-400">/day (Primary)</span>
              </div>
              <p className="text-gray-600 text-sm mt-3">
                The runoff invested 12.6x more per day, reflecting the urgency of a 31-day sprint window versus a prolonged primary campaign.
              </p>
            </div>
            <div className="border border-gray-200 rounded-sm p-5">
              <h4 className="font-mono-label text-xs text-gray-500 mb-3">IMPRESSIONS EFFICIENCY</h4>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-2xl font-bold text-[var(--maroon)]">$10.81</span>
                <span className="text-sm text-gray-500">CPM (Runoff)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg text-gray-400">$10.92</span>
                <span className="text-sm text-gray-400">CPM (Primary)</span>
              </div>
              <p className="text-gray-600 text-sm mt-3">
                Despite the compressed timeline and higher daily spend, CPM remained nearly identical — proving the campaign maintained cost discipline while scaling intensity.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-[var(--border)] mb-20" />

        {/* Section 03: Campaigns */}
        <section
          id="campaigns"
          ref={(el) => { sectionRefs.current["campaigns"] = el; }}
          className="scroll-mt-16 mb-20"
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono-label text-[var(--crimson)] text-sm">03</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--crimson)] font-medium">
              Campaign Breakdown
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 max-w-3xl">
            The primary scattered resources across 45 campaigns — many event-focused, single-use promotions. The runoff consolidated into 14 purpose-built campaigns, each targeting a specific county or strategic objective. This focus enabled better optimization and clearer performance measurement.
          </p>

          {/* Runoff Campaigns Table */}
          <h3 className="font-display text-xl text-[var(--crimson)] mb-4">Runoff Campaigns (May 21 – June 21, 2026)</h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--rose-bg)]">
                  <th className="font-mono-label text-[var(--crimson)] text-left px-4 py-3 text-xs">CAMPAIGN</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">SPEND</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">REACH</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">RESULTS</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">CPR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.runoff_campaigns.map((campaign: any) => (
                  <tr key={campaign.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-[250px] truncate">{campaign.name}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(campaign.spend)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatNumber(campaign.reach)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">{formatNumber(campaign.results)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {campaign.cpe ? formatCurrency(campaign.cpe) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Primary Campaigns Table */}
          <h3 className="font-display text-xl text-[var(--crimson)] mb-4">Top Primary Campaigns (Jan 2025 – May 20, 2026)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--rose-bg)]">
                  <th className="font-mono-label text-[var(--crimson)] text-left px-4 py-3 text-xs">CAMPAIGN</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">SPEND</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">REACH</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">IMPRESSIONS</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">RESULTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.primary_campaigns.map((campaign: any) => (
                  <tr key={campaign.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-[250px] truncate">{campaign.name}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(campaign.spend)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatNumber(campaign.reach)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatNumber(campaign.impressions)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">{formatNumber(campaign.results)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-[var(--border)] mb-20" />

        {/* Section 04: Demographics */}
        <section
          id="demographics"
          ref={(el) => { sectionRefs.current["demographics"] = el; }}
          className="scroll-mt-16 mb-20"
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono-label text-[var(--crimson)] text-sm">04</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--crimson)] font-medium">
              Demographic Targeting
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 max-w-3xl">
            Both campaigns targeted older demographics heavily, consistent with the district's voter profile. However, the runoff's county-specific engagement campaigns ensured broader age coverage within each targeted geography, reaching younger voters who might otherwise be missed.
          </p>

          {/* Age Breakdown */}
          <h3 className="font-display text-xl text-[var(--crimson)] mb-4">Spend by Age Group</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-mono-label text-xs text-gray-500 mb-3">PRIMARY</h4>
              <div className="space-y-3">
                {data.age_comparison.primary.map((item: any) => {
                  const maxSpend = Math.max(...data.age_comparison.primary.map((i: any) => i.spend));
                  const pct = (item.spend / maxSpend) * 100;
                  return (
                    <div key={item.age}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{item.age}</span>
                        <span className="text-gray-500">{formatCurrency(item.spend)}</span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-gray-400 rounded-full h-2.5 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-mono-label text-xs text-gray-500 mb-3">RUNOFF</h4>
              <div className="space-y-3">
                {data.age_comparison.runoff.map((item: any) => {
                  const maxSpend = Math.max(...data.age_comparison.runoff.map((i: any) => i.spend));
                  const pct = (item.spend / maxSpend) * 100;
                  return (
                    <div key={item.age}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{item.age}</span>
                        <span className="text-gray-500">{formatCurrency(item.spend)}</span>
                      </div>
                      <div className="bg-[var(--rose-bg)] rounded-full h-2.5">
                        <div
                          className="bg-[var(--crimson)] rounded-full h-2.5 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Gender Breakdown */}
          <h3 className="font-display text-xl text-[var(--crimson)] mb-4">Spend by Gender</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--rose-bg)]">
                  <th className="font-mono-label text-[var(--crimson)] text-left px-4 py-3 text-xs">GENDER</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">PRIMARY SPEND</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">PRIMARY REACH</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">RUNOFF SPEND</th>
                  <th className="font-mono-label text-[var(--crimson)] text-right px-4 py-3 text-xs">RUNOFF REACH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.keys(data.gender_comparison.primary).map((gender) => {
                  const prim = data.gender_comparison.primary[gender as keyof typeof data.gender_comparison.primary];
                  const run = data.gender_comparison.runoff[gender as keyof typeof data.gender_comparison.runoff];
                  return (
                    <tr key={gender} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800 capitalize">{gender}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{prim ? formatCurrency(prim.spend) : "—"}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{prim ? formatNumber(prim.reach) : "—"}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">{run ? formatCurrency(run.spend) : "—"}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">{run ? formatNumber(run.reach) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-[var(--border)] mb-20" />

        {/* Section 05: Strategy */}
        <section
          id="strategy"
          ref={(el) => { sectionRefs.current["strategy"] = el; }}
          className="scroll-mt-16 mb-20"
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono-label text-[var(--crimson)] text-sm">05</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--crimson)] font-medium">
              Strategic Shift: Why the Runoff Worked
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 max-w-3xl">
            The runoff campaign's success was not accidental — it reflected a deliberate strategic pivot from broad awareness to precision engagement. Three core shifts drove the improvement in ad performance.
          </p>

          {/* Strategy Cards */}
          <div className="space-y-6">
            {/* Strategy 1 */}
            <div className="border border-[var(--rose-header)] rounded-sm overflow-hidden">
              <div className="bg-[var(--rose-bg)] px-5 py-3 flex items-center gap-3">
                <span className="font-mono-label text-[var(--crimson)] text-xs">SHIFT 1</span>
                <span className="font-display text-lg text-[var(--maroon)]">Geographic Precision Over Broad Reach</span>
              </div>
              <div className="p-5">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  The primary campaign ran district-wide ads promoting the website, events, and general awareness. The runoff replaced this with county-specific engagement campaigns — Chatham, Liberty, Appling, Glynn, Ware, and McIntosh counties each received tailored content and targeting.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono-label text-xs text-gray-500">CHATHAM</div>
                    <div className="font-display text-lg font-bold text-[var(--maroon)]">$153</div>
                    <div className="text-xs text-gray-500">5,944 reach</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono-label text-xs text-gray-500">GLYNN</div>
                    <div className="font-display text-lg font-bold text-[var(--maroon)]">$148</div>
                    <div className="text-xs text-gray-500">2,177 reach</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono-label text-xs text-gray-500">APPLING</div>
                    <div className="font-display text-lg font-bold text-[var(--maroon)]">$105</div>
                    <div className="text-xs text-gray-500">1,236 reach</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-mono-label text-xs text-gray-500">LIBERTY</div>
                    <div className="font-display text-lg font-bold text-[var(--maroon)]">$72</div>
                    <div className="text-xs text-gray-500">2,373 reach</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 2 */}
            <div className="border border-[var(--rose-header)] rounded-sm overflow-hidden">
              <div className="bg-[var(--rose-bg)] px-5 py-3 flex items-center gap-3">
                <span className="font-mono-label text-[var(--crimson)] text-xs">SHIFT 2</span>
                <span className="font-display text-lg text-[var(--maroon)]">Engagement Over Clicks</span>
              </div>
              <div className="p-5">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  The primary optimized for link clicks, landing page views, and event responses — metrics that drive traffic but don't necessarily build community. The runoff shifted to post engagements and reach, prioritizing social proof and organic amplification through reactions, comments, and shares.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-mono-label text-xs text-gray-500 mb-2">PRIMARY RESULT TYPES</h5>
                    <div className="space-y-1.5">
                      {Object.entries(data.result_types.primary).slice(0, 5).map(([type, count]) => (
                        <div key={type} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{type}</span>
                          <span className="text-gray-800 font-medium">{count as number} ad sets</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-mono-label text-xs text-gray-500 mb-2">RUNOFF RESULT TYPES</h5>
                    <div className="space-y-1.5">
                      {Object.entries(data.result_types.runoff).slice(0, 5).map(([type, count]) => (
                        <div key={type} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{type}</span>
                          <span className="text-gray-800 font-medium">{count as number} ad sets</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 3 */}
            <div className="border border-[var(--rose-header)] rounded-sm overflow-hidden">
              <div className="bg-[var(--rose-bg)] px-5 py-3 flex items-center gap-3">
                <span className="font-mono-label text-[var(--crimson)] text-xs">SHIFT 3</span>
                <span className="font-display text-lg text-[var(--maroon)]">Concentrated Sprint Over Extended Drip</span>
              </div>
              <div className="p-5">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  The primary spread $2,914 over approximately 500 days — averaging just $5.83/day. This "drip" approach meant any single voter might see an ad once every few months. The runoff concentrated $2,277 into 31 days at $73.45/day, ensuring each targeted voter saw the campaign message an average of 6.66 times — enough to break through the noise of a low-salience election.
                </p>
                <div className="bg-[var(--rose-light)] p-4 rounded">
                  <div className="font-mono-label text-xs text-[var(--crimson)] mb-2">THE MATH</div>
                  <p className="text-gray-700 text-sm">
                    At 6.66 frequency across 31,606 unique voters, the runoff delivered <strong>210,606 total impressions</strong> — nearly matching the primary's 266,957 impressions achieved over 17 months. The compressed timeline meant each impression carried more weight because voters saw them in close succession rather than months apart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-[var(--border)] mb-20" />

        {/* Section 06: Insights */}
        <section
          id="insights"
          ref={(el) => { sectionRefs.current["insights"] = el; }}
          className="scroll-mt-16 mb-20"
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono-label text-[var(--crimson)] text-sm">06</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--crimson)] font-medium">
              Key Insights & Takeaways
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-base mb-8 max-w-3xl">
            The runoff campaign's digital advertising success offers clear lessons for future campaigns operating under similar constraints — limited budget, compressed timeline, and a low-awareness electorate.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                num: "1",
                title: "Focus Beats Breadth",
                desc: "14 targeted campaigns outperformed 45 scattered ones. Each runoff campaign had a clear geographic or strategic purpose, enabling better optimization and measurement."
              },
              {
                num: "2",
                title: "Frequency Wins in Low-Awareness Races",
                desc: "Doubling the frequency from 3.34x to 6.66x was the most impactful change. When voters don't know an election exists, one impression isn't enough — you need repeated contact."
              },
              {
                num: "3",
                title: "Engagement Creates Social Proof",
                desc: "Shifting from link clicks to post engagements generated 1,329 visible interactions (reactions, comments, shares) that amplified reach organically beyond paid impressions."
              },
              {
                num: "4",
                title: "Sprint Intensity Outperforms Drip Campaigns",
                desc: "Spending 12.6x more per day in a compressed window delivered better results than spreading the same budget thin over months. Urgency and repetition compound."
              },
              {
                num: "5",
                title: "County-Level Targeting Enables Precision",
                desc: "The 'Targeted Runoff Precincts' campaign alone reached 47,035 people for $1,239 — the most efficient large-scale reach campaign in either period."
              },
              {
                num: "6",
                title: "Cost Discipline Held Under Pressure",
                desc: "Despite 12x higher daily spend and compressed timelines, CPM remained stable at ~$10.81 — proving that Meta's auction system rewarded the campaign's improved relevance."
              },
            ].map((insight) => (
              <div key={insight.num} className="border border-gray-200 rounded-sm p-5">
                <div className="flex items-start gap-3">
                  <span className="font-display text-2xl font-bold text-[var(--crimson)] leading-none">{insight.num}</span>
                  <div>
                    <h4 className="font-display text-lg text-[var(--maroon)] mb-2">{insight.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{insight.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer CTA */}
      <footer className="bg-[var(--maroon)] text-white py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            The Data Tells the Story
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            A focused, high-frequency, geographically precise digital strategy delivered 82% more results per dollar — proving that in a runoff, intensity and targeting matter more than total spend.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <div className="font-display text-2xl font-bold text-[var(--gold)]">-45%</div>
              <div className="font-mono-label text-white/60 text-xs mt-1">COST PER RESULT</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[var(--gold)]">+82%</div>
              <div className="font-mono-label text-white/60 text-xs mt-1">RESULTS PER DOLLAR</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[var(--gold)]">2x</div>
              <div className="font-mono-label text-white/60 text-xs mt-1">FREQUENCY</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[var(--gold)]">14</div>
              <div className="font-mono-label text-white/60 text-xs mt-1">FOCUSED CAMPAIGNS</div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-white/20 text-white/50 text-sm">
            GA-01 Meta Ads Performance Report · Amanda Hollowell for U.S. House · Analysis Period: Jan 2025 – June 2026
            <br />
            Prepared from Meta Ads Manager Export Data · Confidential Campaign Document
          </div>
        </div>
      </footer>
    </div>
  );
}
