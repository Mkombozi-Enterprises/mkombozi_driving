/**
 * Client-safe helpers only.
 * For CMS document loading on the server: `import { loadContent } from "@/lib/cms/store"`.
 */
export type { SiteContent } from "@/lib/cms/types";
export {
  greetingForHour,
  eveningBannerForHour,
  passesTickerLabel,
} from "@/lib/cms/greetings";
