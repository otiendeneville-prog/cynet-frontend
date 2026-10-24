import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Globe } from "lucide-react";

interface Country {
    name: string;
    code: string; // ISO 3166-1 alpha-2
}

interface CountryApiProps {
    slug: string;
}

const COUNTRIES: Country[] = (
    [
        ["Afghanistan", "AF"], ["Albania", "AL"], ["Algeria", "DZ"], ["Andorra", "AD"],
        ["Angola", "AO"], ["Antigua and Barbuda", "AG"], ["Argentina", "AR"], ["Armenia", "AM"],
        ["Australia", "AU"], ["Austria", "AT"], ["Azerbaijan", "AZ"], ["Bahamas", "BS"],
        ["Bahrain", "BH"], ["Bangladesh", "BD"], ["Barbados", "BB"], ["Belarus", "BY"],
        ["Belgium", "BE"], ["Belize", "BZ"], ["Benin", "BJ"], ["Bhutan", "BT"],
        ["Bolivia", "BO"], ["Bosnia and Herzegovina", "BA"], ["Botswana", "BW"], ["Brazil", "BR"],
        ["Brunei Darussalam", "BN"], ["Bulgaria", "BG"], ["Burkina Faso", "BF"], ["Burundi", "BI"],
        ["Cabo Verde", "CV"], ["Cambodia", "KH"], ["Cameroon", "CM"], ["Canada", "CA"],
        ["Central African Republic", "CF"], ["Chad", "TD"], ["Chile", "CL"], ["China", "CN"],
        ["Colombia", "CO"], ["Comoros", "KM"], ["Congo", "CG"],
        ["Congo (Democratic Republic of the)", "CD"], ["Costa Rica", "CR"], ["Côte d'Ivoire", "CI"],
        ["Croatia", "HR"], ["Cuba", "CU"], ["Cyprus", "CY"], ["Czech Republic", "CZ"],
        ["Denmark", "DK"], ["Djibouti", "DJ"], ["Dominica", "DM"], ["Dominican Republic", "DO"],
        ["Ecuador", "EC"], ["Egypt", "EG"], ["El Salvador", "SV"], ["Equatorial Guinea", "GQ"],
        ["Eritrea", "ER"], ["Estonia", "EE"], ["Eswatini", "SZ"], ["Ethiopia", "ET"],
        ["Fiji", "FJ"], ["Finland", "FI"], ["France", "FR"], ["Gabon", "GA"],
        ["Gambia", "GM"], ["Georgia", "GE"], ["Germany", "DE"], ["Ghana", "GH"],
        ["Greece", "GR"], ["Grenada", "GD"], ["Guatemala", "GT"], ["Guinea", "GN"],
        ["Guinea-Bissau", "GW"], ["Guyana", "GY"], ["Haiti", "HT"], ["Honduras", "HN"],
        ["Hungary", "HU"], ["Iceland", "IS"], ["India", "IN"], ["Indonesia", "ID"],
        ["Iran", "IR"], ["Iraq", "IQ"], ["Ireland", "IE"], ["Israel", "IL"],
        ["Italy", "IT"], ["Jamaica", "JM"], ["Japan", "JP"], ["Jordan", "JO"],
        ["Kazakhstan", "KZ"], ["Kenya", "KE"], ["Kiribati", "KI"], ["North Korea", "KP"],
        ["South Korea", "KR"], ["Kosovo", "XK"], ["Kuwait", "KW"], ["Kyrgyzstan", "KG"],
        ["Laos", "LA"], ["Latvia", "LV"], ["Lebanon", "LB"], ["Lesotho", "LS"],
        ["Liberia", "LR"], ["Libya", "LY"], ["Liechtenstein", "LI"], ["Lithuania", "LT"],
        ["Luxembourg", "LU"], ["Madagascar", "MG"], ["Malawi", "MW"], ["Malaysia", "MY"],
        ["Maldives", "MV"], ["Mali", "ML"], ["Malta", "MT"], ["Marshall Islands", "MH"],
        ["Mauritania", "MR"], ["Mauritius", "MU"], ["Mexico", "MX"], ["Micronesia", "FM"],
        ["Moldova", "MD"], ["Monaco", "MC"], ["Mongolia", "MN"], ["Montenegro", "ME"],
        ["Morocco", "MA"], ["Mozambique", "MZ"], ["Myanmar", "MM"], ["Namibia", "NA"],
        ["Nauru", "NR"], ["Nepal", "NP"], ["Netherlands", "NL"], ["New Zealand", "NZ"],
        ["Nicaragua", "NI"], ["Niger", "NE"], ["Nigeria", "NG"], ["North Macedonia", "MK"],
        ["Norway", "NO"], ["Oman", "OM"], ["Pakistan", "PK"], ["Palau", "PW"],
        ["Palestine", "PS"], ["Panama", "PA"], ["Papua New Guinea", "PG"], ["Paraguay", "PY"],
        ["Peru", "PE"], ["Philippines", "PH"], ["Poland", "PL"], ["Portugal", "PT"],
        ["Qatar", "QA"], ["Romania", "RO"], ["Russia", "RU"], ["Rwanda", "RW"],
        ["Saint Kitts and Nevis", "KN"], ["Saint Lucia", "LC"],
        ["Saint Vincent and the Grenadines", "VC"], ["Samoa", "WS"], ["San Marino", "SM"],
        ["Sao Tome and Principe", "ST"], ["Saudi Arabia", "SA"], ["Senegal", "SN"],
        ["Serbia", "RS"], ["Seychelles", "SC"], ["Sierra Leone", "SL"], ["Singapore", "SG"],
        ["Slovakia", "SK"], ["Slovenia", "SI"], ["Solomon Islands", "SB"], ["Somalia", "SO"],
        ["South Africa", "ZA"], ["South Sudan", "SS"], ["Spain", "ES"], ["Sri Lanka", "LK"],
        ["Sudan", "SD"], ["Suriname", "SR"], ["Sweden", "SE"], ["Switzerland", "CH"],
        ["Syria", "SY"], ["Taiwan", "TW"], ["Tajikistan", "TJ"], ["Tanzania", "TZ"],
        ["Thailand", "TH"], ["Timor-Leste", "TL"], ["Togo", "TG"], ["Tonga", "TO"],
        ["Trinidad and Tobago", "TT"], ["Tunisia", "TN"], ["Turkey", "TR"],
        ["Turkmenistan", "TM"], ["Tuvalu", "TV"], ["Uganda", "UG"], ["Ukraine", "UA"],
        ["United Arab Emirates", "AE"], ["United Kingdom", "GB"], ["United States", "US"],
        ["Uruguay", "UY"], ["Uzbekistan", "UZ"], ["Vanuatu", "VU"], ["Vatican City", "VA"],
        ["Venezuela", "VE"], ["Vietnam", "VN"], ["Yemen", "YE"], ["Zambia", "ZM"],
        ["Zimbabwe", "ZW"],
    ] as const
)
    .map(([name, code]) => ({ name, code }))
    .sort((a, b) => a.name.localeCompare(b.name));

const flagUrl = (code: string) =>
    `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

export function CountryApi({ slug }: CountryApiProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCountries = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return q
            ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q))
            : COUNTRIES;
    }, [searchQuery]);

    return (
        <div className="mt-6 space-y-6">
            <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full rounded-lg border bg-background py-2 pl-9 pr-4 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredCountries.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredCountries.map((country) => (
                        <Link
                            key={country.code}
                            to="/course-registration/$slug/register"
                            params={{ slug } as any}
                            search={{ country: country.name } as any}
                            className="group flex items-center gap-3 rounded-xl border bg-card p-4 text-left text-card-foreground shadow-sm transition-all hover:border-primary hover:bg-muted/50 hover:shadow-md"
                        >
                            <img
                                src={flagUrl(country.code)}
                                alt={`${country.name} flag`}
                                loading="lazy"
                                className="h-7 w-11 flex-shrink-0 rounded border bg-muted/20 object-cover"
                            />
                            <div className="overflow-hidden">
                                <span className="block truncate text-sm font-semibold transition-colors group-hover:text-primary">
                                    {country.name}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                    Select &amp; register →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed bg-muted/5 py-12 text-center">
                    <Globe className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">
                        No countries match "{searchQuery}".
                    </p>
                </div>
            )}
        </div>
    );
}