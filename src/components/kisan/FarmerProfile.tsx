import { MapPin, Sprout, Ruler, User } from "lucide-react";
import { farmerProfile } from "@/data/demoData";

export function FarmerProfile() {
  const items = [
    { icon: User, label: "किसान", value: `${farmerProfile.nameHi} (${farmerProfile.name})` },
    { icon: MapPin, label: "स्थान", value: `${farmerProfile.locationHi}` },
    { icon: Sprout, label: "फसल", value: `${farmerProfile.cropHi}` },
    { icon: Ruler, label: "ज़मीन", value: `${farmerProfile.landAcres} एकड़` },
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
        <div>
          <h1 className="text-2xl font-bold leading-tight">किसान साथी</h1>
          <p className="text-sm opacity-90">आपकी खेती का आसान डिजिटल साथी</p>
        </div>
      </div>

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
    </section>
  );
}
