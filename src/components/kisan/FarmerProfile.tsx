import { useState } from "react";
import { MapPin, Sprout, Ruler, User, Pencil, Check } from "lucide-react";
import { cropLabels, locations, type Crop, type LocationId } from "@/data/demoData";
import { useProfile, useProfileLocation } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

const crops: Crop[] = ["Wheat", "Rice", "Soybean"];

export function FarmerProfile() {
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

  return (
    <section
      className="rounded-3xl p-5 text-primary-foreground shadow-[var(--shadow-card)]"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/20 text-2xl">
          🌾
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold leading-tight">
            {pick(lang, "किसान साथी", "Kisan Saathi")}
          </h1>
          <p className="text-sm opacity-90">
            {pick(lang, "आपकी खेती का आसान डिजिटल साथी", "Your easy digital farming partner")}
          </p>
        </div>
        <button
          onClick={() => setEditing((e) => !e)}
          aria-label={editing ? pick(lang, "सहेजें", "Save") : pick(lang, "प्रोफ़ाइल बदलें", "Edit profile")}
          className="flex h-10 items-center gap-1.5 rounded-2xl bg-primary-foreground/20 px-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/30"
        >
          {editing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          {editing ? pick(lang, "सहेजें", "Save") : pick(lang, "बदलें", "Edit")}
        </button>
      </div>

      {!editing ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-primary-foreground/15 px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-xs opacity-90">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              <div className="mt-0.5 text-lg font-semibold">{value}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-4 rounded-2xl bg-primary-foreground/15 p-4">
          <label className="block">
            <span className="text-xs opacity-90">{pick(lang, "किसान का नाम", "Farmer name")}</span>
            <input
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="mt-1 h-11 w-full rounded-xl border-0 bg-background px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block">
            <span className="text-xs opacity-90">{pick(lang, "स्थान", "Location")}</span>
            <select
              value={profile.locationId}
              onChange={(e) => updateProfile({ locationId: e.target.value as LocationId })}
              className="mt-1 h-11 w-full rounded-xl border-0 bg-background px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {pick(lang, l.hi, l.en)} ({l.en})
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="text-xs opacity-90">{pick(lang, "मुख्य फसल", "Main crop")}</span>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {crops.map((c) => (
                <button
                  key={c}
                  onClick={() => updateProfile({ crop: c })}
                  className={`rounded-xl px-2 py-2.5 text-base font-semibold transition-colors ${
                    profile.crop === c
                      ? "bg-background text-foreground"
                      : "bg-primary-foreground/20 hover:bg-primary-foreground/30"
                  }`}
                >
                  {pick(lang, cropLabels[c], c)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">{pick(lang, "ज़मीन (एकड़)", "Land (acres)")}</span>
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
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-foreground/30"
            />
          </div>
        </div>
      )}
    </section>
  );
}
