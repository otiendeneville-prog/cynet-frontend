import { getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { Phone } from "lucide-react";

const cls =
    "h-10 border border-black dark:border-white bg-background text-sm outline-none " +
    "focus:ring-2 focus:ring-primary/40 transition placeholder:text-muted-foreground/60";

export default function PhoneField({
    iso,
    value,
    onChange,
}: {
    iso?: CountryCode;
    value: string;
    onChange: (v: string) => void;
}) {
    const dial = iso ? `+${getCountryCallingCode(iso)}` : "+";

    return (
        <div className="flex w-full">
            <div
                className={`${cls} flex min-w-[4.5rem] items-center justify-center gap-1.5 rounded-l-lg border-r-0 bg-muted/30 px-3 text-muted-foreground`}
            >
                <Phone className="h-3.5 w-3.5" />
                {dial}
            </div>
            <input
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                disabled={!iso}
                className={`${cls} w-full rounded-r-lg px-3 disabled:opacity-60`}
                placeholder={iso ? "712 345 678" : "Choose a country first"}
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/[^\d\s]/g, ""))}
            />
        </div>
    );
}