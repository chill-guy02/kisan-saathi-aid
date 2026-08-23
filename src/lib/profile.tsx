import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { farmerProfile, getLocation, type Crop, type LocationId } from "@/data/demoData";

export type Profile = {
  name: string;
  locationId: LocationId;
  crop: Crop;
  acres: number;
};

const DEFAULT_PROFILE: Profile = {
  name: farmerProfile.nameHi,
  locationId: "raipur",
  crop: farmerProfile.crop,
  acres: farmerProfile.landAcres,
};

const STORAGE_KEY = "kisan-saathi-profile";

type Ctx = {
  profile: Profile;
  updateProfile: (patch: Partial<Profile>) => void;
  resetProfile: () => void;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  // Read stored profile after hydration to avoid SSR mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<Profile>) });
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      profile,
      updateProfile: (patch) =>
        setProfile((p) => {
          const next = { ...p, ...patch };
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            /* ignore */
          }
          return next;
        }),
      resetProfile: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setProfile(DEFAULT_PROFILE);
      },
    }),
    [profile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}

export const useProfileLocation = () => getLocation(useProfile().profile.locationId);
