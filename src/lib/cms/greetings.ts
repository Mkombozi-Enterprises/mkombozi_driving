export function greetingForHour(hour: number): string {
  if (hour >= 6 && hour < 11) return "Good morning. Ready for your first lesson?";
  if (hour >= 11 && hour < 16)
    return "Habari za mchana. Come see the yard while the sun is up.";
  if (hour >= 16 && hour < 20)
    return "Good evening. We're running night classes until 7pm.";
  return "Karibu. Leave us a message — we'll reply by 8am.";
}

export function eveningBannerForHour(hour: number): string | null {
  if (hour >= 18 && hour < 22) return "Habari za jioni! Evening classes available.";
  return null;
}

export function passesTickerLabel(n: number): string | null {
  if (n <= 0) return null;
  return `This week: ${n} new driver${n === 1 ? "" : "s"} licensed`;
}
