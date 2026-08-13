import { FileText, MoonStar } from "lucide-react";
import { chat } from "@/lib/content";

/** The tenant-facing side of the product: one routine request, answered late at night. */
export function ChatCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand bg-paper">
      <div className="flex items-center gap-2 border-b border-sand bg-cream/60 px-5 py-3.5">
        <MoonStar className="size-4 text-teal-bright" aria-hidden />
        <p className="text-sm font-semibold text-teal-dark">{chat.heading}</p>
      </div>

      <div className="space-y-3 p-5">
        {chat.messages.map((message) => {
          const fromTenant = message.from === "tenant";
          return (
            <div
              key={message.text}
              className={`flex ${fromTenant ? "" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  fromTenant
                    ? "rounded-2xl rounded-bl-sm bg-cream text-ink"
                    : "rounded-2xl rounded-br-sm bg-teal text-cream"
                }`}
              >
                <p>{message.text}</p>
                {"attachment" in message ? (
                  <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-teal-dark/40 px-2.5 py-1.5 text-xs">
                    <FileText className="size-3.5 shrink-0" aria-hidden />
                    {message.attachment}
                  </p>
                ) : null}
                <p
                  className={`mt-1 text-right text-[10px] ${
                    fromTenant ? "text-ink-soft" : "text-cream/70"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="border-t border-sand bg-cream/50 px-5 py-3 text-xs font-medium text-ink-soft">
        {chat.caption}
      </p>
    </div>
  );
}
