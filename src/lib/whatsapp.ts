import { site } from "@/lib/site";

/** Build a wa.me link with pre-filled message (one-tap enrol path). */
export function whatsappUrl(opts?: {
  course?: string;
  name?: string;
  context?: "general" | "form-success" | "fleet" | "review";
}): string {
  const course = opts?.course?.trim();
  const name = opts?.name?.trim();
  let text: string;

  switch (opts?.context) {
    case "form-success":
      text = course
        ? `Hi Mkombozi, I just sent an enquiry about ${course} lessons${name ? ` — my name is ${name}` : ""}. Happy to continue here on WhatsApp.`
        : `Hi Mkombozi, I just sent an enquiry on the website${name ? ` — my name is ${name}` : ""}. Happy to continue here on WhatsApp.`;
      break;
    case "fleet":
      text =
        "Hi Mkombozi, I'd like to visit the yard and see the training vehicles. When can I come by?";
      break;
    case "review":
      text =
        "Hi Mkombozi — I trained with you and would like to share feedback for the website.";
      break;
    default:
      text = course
        ? `Hi Mkombozi, I'm interested in lessons. Can you tell me more about ${course}? Asante!`
        : "Hi Mkombozi, I'm interested in lessons. Can you help me choose between Class B and D? Asante!";
  }

  text = `${text} Safari njema!`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
