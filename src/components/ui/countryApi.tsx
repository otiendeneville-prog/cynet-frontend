import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Globe } from "lucide-react";

interface Country {
    name: string;
    emoji: string;
    cca3: string;
}

interface CountryApiProps {
    slug: string;
}

const GLOBAL_COUNTRIES: Country[] = [
    { name: "Afghanistan", emoji: "🇦🇫", cca3: "AFG" },
    { name: "Albania", emoji: "🇦🇱", cca3: "ALB" },
    { name: "Algeria", emoji: "🇩🇿", cca3: "DZA" },
    { name: "Andorra", emoji: "🇦🇩", cca3: "AND" },
    { name: "Angola", emoji: "🇦🇴", cca3: "AGO" },
    { name: "Antigua and Barbuda", emoji: "🇦🇬", cca3: "ATG" },
    { name: "Argentina", emoji: "🇦🇷", cca3: "ARG" },
    { name: "Armenia", emoji: "🇦🇲", cca3: "ARM" },
    { name: "Australia", emoji: "🇦🇺", cca3: "AUS" },
    { name: "Austria", emoji: "🇦🇹", cca3: "AUT" },
    { name: "Azerbaijan", emoji: "🇦🇿", cca3: "AZE" },
    { name: "Bahamas", emoji: "🇧🇸", cca3: "BHS" },
    { name: "Bahrain", emoji: "🇧🇭", cca3: "BHR" },
    { name: "Bangladesh", emoji: "🇧🇩", cca3: "BGD" },
    { name: "Barbados", emoji: "🇧🇧", cca3: "BRB" },
    { name: "Belarus", emoji: "🇧🇾", cca3: "BLR" },
    { name: "Belgium", emoji: "🇧🇪", cca3: "BEL" },
    { name: "Belize", emoji: "🇧🇿", cca3: "BLZ" },
    { name: "Benin", emoji: "🇧🇯", cca3: "BEN" },
    { name: "Bhutan", emoji: "🇧🇹", cca3: "BTN" },
    { name: "Bolivia", emoji: "🇧🇴", cca3: "BOL" },
    { name: "Bosnia and Herzegovina", emoji: "🇧🇦", cca3: "BIH" },
    { name: "Botswana", emoji: "🇧🇼", cca3: "BWA" },
    { name: "Brazil", emoji: "🇧🇷", cca3: "BRA" },
    { name: "Brunei Darussalam", emoji: "🇧🇳", cca3: "BRN" },
    { name: "Bulgaria", emoji: "🇧🇬", cca3: "BGR" },
    { name: "Burkina Faso", emoji: "🇧🇫", cca3: "BFA" },
    { name: "Burundi", emoji: "🇧🇮", cca3: "BDI" },
    { name: "Cabo Verde", emoji: "🇨🇻", cca3: "CPV" },
    { name: "Cambodia", emoji: "🇰🇭", cca3: "KHM" },
    { name: "Cameroon", emoji: "🇨🇲", cca3: "CMR" },
    { name: "Central African Republic", emoji: "🇨🇫", cca3: "CAF" },
    { name: "Chad", emoji: "🇹🇩", cca3: "TCD" },
    { name: "Chile", emoji: "🇨🇱", cca3: "CHL" },
    { name: "China", emoji: "🇨🇳", cca3: "CHN" },
    { name: "Colombia", emoji: "🇨🇴", cca3: "COL" },
    { name: "Comoros", emoji: "🇰🇲", cca3: "COM" },
    { name: "Congo", emoji: "🇨🇬", cca3: "COG" },
    { name: "Congo (Democratic Republic of the)", emoji: "🇨🇩", cca3: "COD" },
    { name: "Costa Rica", emoji: "🇨🇷", cca3: "CRI" },
    { name: "Croatia", emoji: "🇭🇷", cca3: "HRV" },
    { name: "Cuba", emoji: "🇨🇺", cca3: "CUB" },
    { name: "Cyprus", emoji: "🇨🇾", cca3: "CYP" },
    { name: "Czech Republic", emoji: "🇨🇿", cca3: "CZE" },
    { name: "Denmark", emoji: "🇩🇰", cca3: "DNK" },
    { name: "Djibouti", emoji: "🇩🇯", cca3: "DJI" },
    { name: "Dominica", emoji: "🇩🇲", cca3: "DMA" },
    { name: "Dominican Republic", emoji: "🇩🇴", cca3: "DOM" },
    { name: "Ecuador", emoji: "🇪🇨", cca3: "ECU" },
    { name: "Egypt", emoji: "🇪🇬", cca3: "EGY" },
    { name: "El Salvador", emoji: "🇸🇻", cca3: "SLV" },
    { name: "Equatorial Guinea", emoji: "🇬🇶", cca3: "GNQ" },
    { name: "Eritrea", emoji: "🇪🇷", cca3: "ERI" },
    { name: "Estonia", emoji: "🇪🇪", cca3: "EST" },
    { name: "Eswatini", emoji: "🇸🇿", cca3: "SWZ" },
    { name: "Ethiopia", emoji: "🇪🇹", cca3: "ETH" },
    { name: "Fiji", emoji: "🇫🇯", cca3: "FJI" },
    { name: "Finland", emoji: "🇫🇮", cca3: "FIN" },
    { name: "France", emoji: "🇫🇷", cca3: "FRA" },
    { name: "Gabon", emoji: "🇬🇦", cca3: "GAB" },
    { name: "Gambia", emoji: "🇬🇲", cca3: "GMB" },
    { name: "Georgia", emoji: "🇬🇪", cca3: "GEO" },
    { name: "Germany", emoji: "🇩🇪", cca3: "DEU" },
    { name: "Ghana", emoji: "🇬🇭", cca3: "GHA" },
    { name: "Greece", emoji: "🇬🇷", cca3: "GRC" },
    { name: "Grenada", emoji: "🇬🇩", cca3: "GRD" },
    { name: "Guatemala", emoji: "🇬🇹", cca3: "GTM" },
    { name: "Guinea", emoji: "🇬🇳", cca3: "GIN" },
    { name: "Guinea-Bissau", emoji: "🇬🇼", cca3: "GNB" },
    { name: "Guyana", emoji: "🇬🇾", cca3: "GUY" },
    { name: "Haiti", emoji: "🇭🇹", cca3: "HTI" },
    { name: "Honduras", emoji: "🇭🇳", cca3: "HND" },
    { name: "Hungary", emoji: "🇭🇺", cca3: "HUN" },
    { name: "Iceland", emoji: "🇮🇸", cca3: "ISL" },
    { name: "India", emoji: "🇮🇳", cca3: "IND" },
    { name: "Indonesia", emoji: "🇮🇩", cca3: "IDN" },
    { name: "Iran", emoji: "🇮🇷", cca3: "IRN" },
    { name: "Iraq", emoji: "🇮🇶", cca3: "IRQ" },
    { name: "Ireland", emoji: "🇮🇪", cca3: "IRL" },
    { name: "Israel", emoji: "🇮🇱", cca3: "ISR" },
    { name: "Italy", emoji: "🇮🇹", cca3: "ITA" },
    { name: "Jamaica", emoji: "🇯🇲", cca3: "JAM" },
    { name: "Japan", emoji: "🇯🇵", cca3: "JPN" },
    { name: "Jordan", emoji: "🇯🇴", cca3: "JOR" },
    { name: "Kenya", emoji: "🇰🇪", cca3: "KEN" },
    { name: "Kiribati", emoji: "🇰🇮", cca3: "KIR" },
    { name: "North Korea", emoji: "🇰🇵", cca3: "PRK" },
    { name: "South Korea", emoji: "🇰🇷", cca3: "KOR" },
    { name: "Kuwait", emoji: "🇰🇼", cca3: "KWT" },
    { name: "Kyrgyzstan", emoji: "🇰🇬", cca3: "KGZ" },
    { name: "Laos", emoji: "🇱🇦", cca3: "LAO" },
    { name: "Latvia", emoji: "🇱🇻", cca3: "LVA" },
    { name: "Lebanon", emoji: "🇱🇧", cca3: "LBN" },
    { name: "Lesotho", emoji: "🇱🇸", cca3: "LSO" },
    { name: "Liberia", emoji: "🇱🇷", cca3: "LBR" },
    { name: "Libya", emoji: "🇱🇾", cca3: "LBY" },
    { name: "Liechtenstein", emoji: "🇱🇮", cca3: "LIE" },
    { name: "Lithuania", emoji: "🇱🇹", cca3: "LTU" },
    { name: "Luxembourg", emoji: "🇱🇺", cca3: "LUX" },
    { name: "Madagascar", emoji: "🇲🇬", cca3: "MDG" },
    { name: "Malawi", emoji: "🇲🇼", cca3: "MWI" },
    { name: "Malaysia", emoji: "🇲🇾", cca3: "MYS" },
    { name: "Maldives", emoji: "🇲🇻", cca3: "MDV" },
    { name: "Mali", emoji: "🇲🇱", cca3: "MLI" },
    { name: "Malta", emoji: "🇲🇹", cca3: "MLT" },
    { name: "Marshall Islands", emoji: "🇲🇭", cca3: "MHL" },
    { name: "Mauritania", emoji: "🇲🇷", cca3: "MRT" },
    { name: "Mauritius", emoji: "🇲🇺", cca3: "MUS" },
    { name: "Mexico", emoji: "🇲🇽", cca3: "MEX" },
    { name: "Micronesia", emoji: "🇫🇲", cca3: "FSM" },
    { name: "Moldova", emoji: "🇲🇩", cca3: "MDA" },
    { name: "Monaco", emoji: "🇲🇨", cca3: "MCO" },
    { name: "Mongolia", emoji: "🇲🇳", cca3: "MNG" },
    { name: "Montenegro", emoji: "🇲🇪", cca3: "MNE" },
    { name: "Morocco", emoji: "🇲🇦", cca3: "MAR" },
    { name: "Mozambique", emoji: "🇲🇿", cca3: "MOZ" },
    { name: "Myanmar", emoji: "🇲🇲", cca3: "MMR" },
    { name: "Namibia", emoji: "🇳🇦", cca3: "NAM" },
    { name: "Nauru", emoji: "🇳🇷", cca3: "NRU" },
    { name: "Nepal", emoji: "🇳🇵", cca3: "NPL" },
    { name: "Netherlands", emoji: "🇳🇱", cca3: "NLD" },
    { name: "New Zealand", emoji: "🇳🇿", cca3: "NZL" },
    { name: "Nicaragua", emoji: "🇳🇮", cca3: "NIC" },
    { name: "Niger", emoji: "🇳🇪", cca3: "NER" },
    { name: "Nigeria", emoji: "🇳🇬", cca3: "NGA" },
    { name: "North Macedonia", emoji: "🇲🇰", cca3: "MKD" },
    { name: "Norway", emoji: "🇳🇴", cca3: "NOR" },
    { name: "Oman", emoji: "🇴🇲", cca3: "OMN" },
    { name: "Pakistan", emoji: "🇵🇰", cca3: "PAK" },
    { name: "Palau", emoji: "🇵🇼", cca3: "PLW" },
    { name: "Panama", emoji: "🇵🇦", cca3: "PAN" },
    { name: "Papua New Guinea", emoji: "🇵🇬", cca3: "PNG" },
    { name: "Paraguay", emoji: "🇵🇾", cca3: "PRY" },
    { name: "Peru", emoji: "🇵🇪", cca3: "PER" },
    { name: "Philippines", emoji: "🇵🇭", cca3: "PHL" },
    { name: "Poland", emoji: "🇵🇱", cca3: "POL" },
    { name: "Portugal", emoji: "🇵🇹", cca3: "PRT" },
    { name: "Qatar", emoji: "🇶🇦", cca3: "QAT" },
    { name: "Romania", emoji: "🇷🇴", cca3: "ROU" },
    { name: "Russia", emoji: "🇷🇺", cca3: "RUS" },
    { name: "Rwanda", emoji: "🇷🇼", cca3: "RWA" },
    { name: "Saint Kitts and Nevis", emoji: "🇰🇳", cca3: "KNA" },
    { name: "Saint Lucia", emoji: "🇱🇨", cca3: "LCA" },
    { name: "Saint Vincent and the Grenadines", emoji: "🇻🇨", cca3: "VCT" },
    { name: "Samoa", emoji: "🇼🇸", cca3: "WSM" },
    { name: "San Marino", emoji: "🇸🇲", cca3: "SMR" },
    { name: "Sao Tome and Principe", emoji: "🇸🇹", cca3: "STP" },
    { name: "Saudi Arabia", emoji: "🇸🇦", cca3: "SAU" },
    { name: "Senegal", emoji: "🇸🇳", cca3: "SEN" },
    { name: "Serbia", emoji: "🇷🇸", cca3: "SRB" },
    { name: "Seychelles", emoji: "🇸🇨", cca3: "SYC" },
    { name: "Sierra Leone", emoji: "🇸🇱", cca3: "SLE" },
    { name: "Singapore", emoji: "🇸🇬", cca3: "SGP" },
    { name: "Slovakia", emoji: "🇸🇰", cca3: "SVK" },
    { name: "Slovenia", emoji: "🇸🇮", cca3: "SVN" },
    { name: "Solomon Islands", emoji: "🇸🇧", cca3: "SLB" },
    { name: "Somalia", emoji: "🇸🇴", cca3: "SOM" },
    { name: "South Africa", emoji: "🇿🇦", cca3: "ZAF" },
    { name: "South Sudan", emoji: "🇸🇸", cca3: "SSD" },
    { name: "Spain", emoji: "🇪🇸", cca3: "ESP" },
    { name: "Sri Lanka", emoji: "🇱🇰", cca3: "LKA" },
    { name: "Sudan", emoji: "🇸🇩", cca3: "SDN" },
    { name: "Suriname", emoji: "🇸🇷", cca3: "SUR" },
    { name: "Sweden", emoji: "🇸🇪", cca3: "SWE" },
    { name: "Switzerland", emoji: "🇨🇭", cca3: "CHE" },
    { name: "Syria", emoji: "🇸🇾", cca3: "SYR" },
    { name: "Tajikistan", emoji: "🇹🇯", cca3: "TJK" },
    { name: "Tanzania", emoji: "🇹🇿", cca3: "TZA" },
    { name: "Thailand", emoji: "🇹🇭", cca3: "THA" },
    { name: "Timor-Leste", emoji: "🇹🇱", cca3: "TLS" },
    { name: "Togo", emoji: "🇹🇬", cca3: "TGO" },
    { name: "Tonga", emoji: "🇹🇴", cca3: "TON" },
    { name: "Trinidad and Tobago", emoji: "🇹🇹", cca3: "TTO" },
    { name: "Tunisia", emoji: "🇹🇳", cca3: "TUN" },
    { name: "Turkey", emoji: "🇹🇷", cca3: "TUR" },
    { name: "Turkmenistan", emoji: "🇹🇲", cca3: "TKM" },
    { name: "Tuvalu", emoji: "🇹🇻", cca3: "TUV" },
    { name: "Uganda", emoji: "🇺🇬", cca3: "UGA" },
    { name: "Ukraine", emoji: "🇺🇦", cca3: "UKR" },
    { name: "United Arab Emirates", emoji: "🇦🇪", cca3: "ARE" },
    { name: "United Kingdom", emoji: "🇬🇧", cca3: "GBR" },
];

export function CountryApi({ slug }: CountryApiProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: countries } = useQuery<Country[]>({
        queryKey: ["globalCountries"],
        queryFn: () => Promise.resolve(GLOBAL_COUNTRIES),
        staleTime: Infinity,
    });

    const displayList = countries || GLOBAL_COUNTRIES;

    // Alphabetically sort items and apply the reactive search filter text
    const filteredCountries = displayList
        .filter((country) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="space-y-6 mt-6">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition placeholder:text-muted-foreground/60"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredCountries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCountries.map((country) => (
                        <Link
                            key={country.cca3}
                            to={"/course-registration/$slug/register" as any}
                            params={{ slug } as any}
                            search={{ country: country.name } as any}
                            className="flex items-center gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:bg-muted/50 hover:border-primary hover:shadow-md text-left group"
                        >
                            <img
                                src={country.flagUrl}
                                alt={`${country.name} flag`}
                                className="h-7 w-11 rounded object-cover border flex-shrink-0 bg-muted/20"
                            />
                            <div className="overflow-hidden">
                                <span className="font-semibold text-sm block truncate group-hover:text-primary transition-colors">
                                    {country.name}
                                </span>
                                <span className="text-xs text-muted-foreground block">
                                    Select & Register →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed rounded-xl bg-muted/5">
                    <Globe className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No countries found.</p>
                </div>
            )}
        </div>
    );
}
