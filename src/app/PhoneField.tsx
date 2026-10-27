import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import PhoneField from "../app/PhoneField.tsx";

export default function CountryPhone({
    country,
    phone,
    onCountry,
    onPhone,
}: {
    country: string;
    phone: string;
    onCountry: (name: string) => void;
    onPhone: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    // close the list when clicking outside
    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const dial = dialOf(country);
    const flag = flagOf(country);
    const q = query.trim().toLowerCase().replace("+", "");
    const list = COUNTRIES.filter(
        (c) => c.name.toLowerCase().includes(q) || c.dial.startsWith(q),
    );

    return (
        <div ref={ref} className="relative">
            {/* one shared box, so the button and the input always match */}
            <div className="flex w-full items-stretch rounded-lg border bg-background text-sm transition focus-within:ring-2 focus-within:ring-primary/40">
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="flex shrink-0 items-center gap-2 border-r px-3 py-2"
                >
                    {flag ? (
                        <img
                            src={flag}
                            alt=""
                            className="h-4 w-6 rounded-[2px] object-cover"
                        />
                    ) : (
                        <span className="h-4 w-6 rounded-[2px] bg-muted" />
                    )}
                    <span>{dial ? `+${dial}` : "+"}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>

                <input
                    type="tel"
                    inputMode="tel"
                    className="w-full min-w-0 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground/60"
                    placeholder="712 345 678"
                    value={phone}
                    onChange={(e) => onPhone(e.target.value.replace(/[^\d\s]/g, ""))}
                />
            </div>

            {open && (
                <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-lg border bg-popover text-popover-foreground shadow-md">
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search country"
                        className="w-full border-b bg-transparent px-3 py-2 text-sm outline-none"
                    />
                    <ul className="max-h-60 overflow-y-auto py-1">
                        {list.map((c) => (
                            <li key={c.name}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onCountry(c.name);
                                        setOpen(false);
                                        setQuery("");
                                    }}
                                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-muted/70"
                                >
                                    <img
                                        src={`https://flagcdn.com/w40/${c.iso}.png`}
                                        alt=""
                                        className="h-4 w-6 rounded-[2px] object-cover"
                                    />
                                    <span className="flex-1">{c.name}</span>
                                    <span className="text-muted-foreground">+{c.dial}</span>
                                </button>
                            </li>
                        ))}
                        {list.length === 0 && (
                            <li className="px-3 py-2 text-sm text-muted-foreground">
                                No country found
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}