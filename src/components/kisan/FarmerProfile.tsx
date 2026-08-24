import { useState } from "react";
import { MapPin, Sprout, Ruler, User, Pencil, Check } from "lucide-react";
import { cropLabels, locations, type Crop, type LocationId } from "@/data/demoData";
import { useProfile, useProfileLocation } from "@/lib/profile";

const crops: Crop[] = ["Wheat", "Rice", "Soybean"];

export function FarmerProfile() {
  const { profile, updateProfile } = useProfile();
  const loc = useProfileLocation();
  const [editing, setEditing] = useState(false);

  const items = [
    { icon: User, label: "किसान", value: profile.name },
    { icon: MapPin, label: "स्थान", value: loc.hi },
    { icon: Sprout, label: "फसल", value: cropLabels[profile.crop] },
    { icon: Ruler, label: "ज़मीन", value: `${profile.acres} एकड़` },
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
          <h1 className="text-2xl font-bold leading-tight">किसान साथी</h1>
          <p className="text-sm opacity-90">आपकी खेती का आसान डिजिटल साथी</p>
        </div>
        <button
          onClick={() => setEditing((e) => !e)}
          aria-label={editing ? "सहेजें" : "प्रोफ़ाइल बदलें"}
          className="flex h-10 items-center gap-1.5 rounded-2xl bg-primary-foreground/20 px-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/30"
        >
          {editing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          {editing ? "सहेजें" : "बदलें"}
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
            <span className="text-xs opacity-90">किसान का नाम</span>
            <input
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="mt-1 h-11 w-full rounded-xl border-0 bg-background px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block">
            <span className="text-xs opacity-90">स्थान</span>
            <select
              value={profile.locationId}
              onChange={(e) => updateProfile({ locationId: e.target.value as LocationId })}
              className="mt-1 h-11 w-full rounded-xl border-0 bg-background px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.hi} ({l.en})
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="text-xs opacity-90">मुख्य फसल</span>
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
                  {cropLabels[c]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">ज़मीन (एकड़)</span>
              <span className="font-bold">{profile.acres} एकड़</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={profile.acres}
              onChange={(e) => updateProfile({ acres: Number(e.target.value) })}
              aria-label="ज़मीन (एकड़)"
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-foreground/30"
            />
          </div>
        </div>
      )}
    </section>
  );
}
