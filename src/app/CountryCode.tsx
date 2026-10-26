import RawPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInput = (RawPhoneInput as any).default || RawPhoneInput;

interface CountryCodeProps {
    value: string;
    className?: string;
    onChange: (value: string) => void;
}

export default function CountryCode({ value, onChange }: CountryCodeProps) {
    return (
        <div className="phone-input-container w-full">
            <PhoneInput
                country="ke"
                value={value}
                onChange={onChange}
                containerClass="!w-full !border-none !shadow-none !outline-none"
                inputClass="!w-full !h-10 !rounded-lg !border !border-solid !border-input !bg-background !text-foreground !text-sm !outline-none !transition-all focus:!ring-2 focus:!ring-primary/40 pl-[48px]"

                buttonClass="!h-10 !rounded-l-lg !border-y !border-l !border-solid !border-input !bg-none !shadow-none !outline-none bg-muted/30 hover:bg-muted/50 dark:bg-muted/10 dark:hover:bg-muted/20"

                dropdownClass="!bg-popover !text-popover-foreground !border-input dark:[&_.country:hover]:!bg-muted/70 dark:[&_.country.highlight]:!bg-primary/20"
            />

        </div>

    )
}
