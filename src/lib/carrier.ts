/** Light Kenyan mobile carrier hint from MSISDN prefix (confidence UI only). */

export type Carrier = "safaricom" | "airtel" | "telkom" | "unknown";

export function detectCarrier(phone: string): Carrier {
  const d = phone.replace(/\D/g, "");
  let national = d;
  if (national.startsWith("254")) national = national.slice(3);
  if (national.startsWith("0")) national = national.slice(1);
  if (national.length < 3) return "unknown";

  const p3 = national.slice(0, 3);
  // Common Safaricom prefixes (non-exhaustive)
  if (
    /^(7[0-29]|74[0-9]|75[7-9]|76[8-9]|79[0-9])/.test(national) ||
    ["110", "111", "112", "113", "114", "115"].includes(p3)
  ) {
    // 110–115 often Safaricom; 10x also appears
    if (national.startsWith("10") || national.startsWith("11")) return "safaricom";
  }
  if (/^(70|71|72|74|79)/.test(national)) return "safaricom";
  if (/^(73|75|78)/.test(national) || national.startsWith("10")) {
    // 73/75/78 often Airtel historically; overlaps exist — soft signal only
    if (/^(73|78)/.test(national)) return "airtel";
    if (national.startsWith("75")) return "airtel";
  }
  if (/^(77)/.test(national)) return "telkom";

  if (/^(70|71|72|74|79)/.test(national)) return "safaricom";
  if (/^(73|78|10)/.test(national)) return "airtel";
  return "unknown";
}

export function carrierLabel(c: Carrier): string {
  switch (c) {
    case "safaricom":
      return "Safaricom";
    case "airtel":
      return "Airtel";
    case "telkom":
      return "Telkom";
    default:
      return "";
  }
}
