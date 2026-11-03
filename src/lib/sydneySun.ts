/**
 * Calculates sunrise and sunset for Sydney, Australia to dynamically set
 * desk lighting and evening warmth based on real celestial time.
 */
export function isSydneyEvening(): boolean {
  try {
    const at = new Date();
    const rad = (d: number) => (d * Math.PI) / 180;
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Australia/Sydney",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(at)
      .split("-")
      .map(Number);

    const sun = (offset: number) => {
      const midnight = Date.UTC(parts[0], parts[1] - 1, parts[2] + offset);
      const g =
        ((2 * Math.PI) / 365) *
        Math.round((midnight - Date.UTC(parts[0], 0, 1)) / 86400000);
      const eq =
        229.18 *
        (0.000075 +
          0.001868 * Math.cos(g) -
          0.032077 * Math.sin(g) -
          0.014615 * Math.cos(2 * g) -
          0.040849 * Math.sin(2 * g));
      const decl =
        0.006918 -
        0.399912 * Math.cos(g) +
        0.070257 * Math.sin(g) -
        0.006758 * Math.cos(2 * g) +
        0.000907 * Math.sin(2 * g) -
        0.002697 * Math.cos(3 * g) +
        0.00148 * Math.sin(3 * g);
      const ha =
        (Math.acos(
          Math.cos(rad(90.833)) / (Math.cos(rad(-33.87)) * Math.cos(decl)) -
            Math.tan(rad(-33.87)) * Math.tan(decl)
        ) *
          180) /
        Math.PI;

      return {
        rise: midnight + (720 - 4 * (151.21 + ha) - eq) * 60000,
        set: midnight + (720 - 4 * (151.21 - ha) - eq) * 60000,
      };
    };

    const today = sun(0);
    return at.getTime() < today.rise || at.getTime() >= today.set;
  } catch (e) {
    return false;
  }
}
