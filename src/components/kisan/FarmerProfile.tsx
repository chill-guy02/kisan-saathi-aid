import { useState } from "react";
import { MapPin, Sprout, Ruler, User, Pencil, Check } from "lucide-react";
import { cropLabels, locations, type Crop, type LocationId } from "@/data/demoData";
import { useProfile, useProfileLocation } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

const crops: Crop[] = ["Wheat", "Rice", "Soybean"];

export function FarmerProfile({ full = false }: { full?: boolean }) {
  const { lang } = useLang();
  const { profile, updateProfile } = useProfile();
  const loc = useProfileLocation();
  const [editing, setEditing] = useState(false);

  const items = [
    { icon: User, label: pick(lang, "किसान", "Farmer"), value: profile.name },
    { icon: MapPin, label: pick(lang, "स्थान", "Location"), value: pick(lang, loc.hi, loc.en) },
    { icon: Sprout, label: pick(lang, "फसल", "Crop"), value: pick(lang, cropLabels[profile.crop], profile.crop) },
    { icon: Ruler, label: pick(lang, "ज़मीन", "Land"), value: `${profile.acres} ${pick(lang, "एकड़", "acres")}` },
  ];

  if (!full && !editing) {
    return (
      <section
        className="flex items-center gap-3 rounded-xl p-3 text-primary-foreground shadow-sm"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-lg">
          🌾
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-bold">
            {profile.name}
            <span className="opacity-70">·</span>
            <span className="font-normal opacity-90">{pick(lang, loc.hi, loc.en)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-80">
            {pick(lang, cropLabels[profile.crop], profile.crop)} · {profile.acres} {pick(lang, "एकड़", "acres")}
          </div>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="flex h-8 items-center gap-1 rounded-lg bg-white/20 px-2.5 text-xs font-semibold transition-colors hover:bg-white/30"
        >
          <Pencil className="h-3 w-3" />
          {pick(lang, "बदलें", "Edit")}
        </button>
      </section>
    );
  }

  return (
    <section
      className="rounded-xl p-4 text-primary-foreground shadow-sm"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-xl">
          🌾
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold leading-tight">
            {pick(lang, "किसान साथी", "Kisan Saathi")}
          </h2>
          <p className="text-xs opacity-80">
            {pick(lang, "आपकी खेती का डिजिटल साथी", "Your digital farming partner")}
          </p>
        </div>
        <button
          onClick={() => setEditing((e) => !e)}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-white/20 px-2.5 text-xs font-semibold transition-colors hover:bg-white/30"
        >
          {editing ? <Check className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
          {editing ? pick(lang, "सहेजें", "Save") : pick(lang, "बदलें", "Edit")}
        </button>
      </div>

      {!editing ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg bg-white/10 px-3 py-2">
              <div className="flex items-center gap-1.5 text-xs opacity-80">
                <Icon className="h-3 w-3" />
                {label}
              </div>
              <div className="mt-0.5 text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3 rounded-lg bg-white/10 p-3">
          <label className="block">
            <span className="text-xs opacity-80">{pick(lang, "किसान का नाम", "Farmer name")}</span>
            <input
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="mt-1 h-10 w-full rounded-lg border-0 bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block">
            <span className="text-xs opacity-80">{pick(lang, "स्थान", "Location")}</span>
            <select
              value={profile.locationId}
              onChange={(e) => updateProfile({ locationId: e.target.value as LocationId })}
              className="mt-1 h-10 w-full rounded-lg border-0 bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {pick(lang, l.hi, l.en)} ({l.en})
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="text-xs opacity-80">{pick(lang, "मुख्य फसल", "Main crop")}</span>
            <div className="mt-1 grid grid-cols-3 gap-1.5">
              {crops.map((c) => (
                <button
                  key={c}
                  onClick={() => updateProfile({ crop: c })}
                  className={`rounded-lg px-2 py-2 text-sm font-semibold transition-colors ${
                    profile.crop === c
                      ? "bg-background text-foreground"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {pick(lang, cropLabels[c], c)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-80">{pick(lang, "ज़मीन (एकड़)", "Land (acres)")}</span>
              <span className="font-bold">
                {profile.acres} {pick(lang, "एकड़", "acres")}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={profile.acres}
              onChange={(e) => updateProfile({ acres: Number(e.target.value) })}
              aria-label={pick(lang, "ज़मीन (एकड़)", "Land (acres)")}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/30"
            />
          </div>
        </div>
      )}
    </section>
  );
}
