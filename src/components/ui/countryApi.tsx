import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

interface Country {
    name: { common: string };
    flags: { svg: string; alt?: string };
    cca3: string;
}

interface CountryApiProps {
    slug: string;
}

// List of East African Community (EAC) member countries
const EAST_AFRICA_CODES = ["KEN", "UGA", "TZA", "RWA", "BDI", "SSD", "SOM"];

const fetchCountries = async (): Promise<Country[]> => {
    const res = await fetch("https://restcountries.com");
    if (!res.ok) throw new Error("Network response failed");
    return res.json();
};

export function CountryApi({ slug }: CountryApiProps) {
    const { data: countries, isLoading, isError, error } = useQuery<Country[]>({
        queryKey: ["countries"],
        queryFn: fetchCountries,
    });

    if (isLoading) return <div className="p-4 text-sm text-muted-foreground">Loading regions...</div>;
    if (isError) return <div className="p-4 text-sm text-destructive">Error: {(error as Error).message}</div>;

    // Split into East African and International arrays
    const eastAfricanCountries = countries?.filter((c) => EAST_AFRICA_CODES.includes(c.cca3)) || [];
    const internationalCountries = countries?.filter((c) => !EAST_AFRICA_CODES.includes(c.cca3))
        .sort((a, b) => a.name.common.localeCompare(b.name.common)) || [];

    const renderCard = (country: Country) => (
        <Link
            key={country.cca3}
            to="/course-registration/$slug/register"
            params={{ slug }}
            search={{ country: country.name.common }}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition cursor-pointer hover:bg-muted/50 hover:border-primary hover:shadow-md text-left"
        >
            <img
                src={country.flags.svg}
                alt={country.flags.alt || `${country.name.common} flag`}
                className="h-8 w-12 rounded object-cover border flex-shrink-0"
            />
            <div className="overflow-hidden">
                <span className="font-medium text-sm block truncate">{country.name.common}</span>
                <span className="text-xs text-muted-foreground block">Select & Register →</span>
            </div>
        </Link>
    );

    return (
        <div className="space-y-6 mt-6">
            {/* 🌟 East Africa Primacy Section */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
                    East African Region
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {eastAfricanCountries.map(renderCard)}
                </div>
            </div>

            <hr className="border-muted" />

            {/* International Section */}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    Other International Countries
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {internationalCountries.map(renderCard)}
                </div>
            </div>
        </div>
    );
}
