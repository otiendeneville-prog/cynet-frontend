import { useState } from 'react'
import RawPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInput = (RawPhoneInput as any).default || RawPhoneInput;

interface CountryCodeProps {
    value: string;
    onChange: (value: string) => void;
}

export function CountryCode({ value, onChange }: CountryCodeProps) {
    return (
        <div className="phone-input-container w-full">
            <PhoneInput
                country="ke"
                value={value}
                onChange={onChange}
                inputClassName="!w-full !h-10 !rounded-lg !border !bg-background !pl-12 !text-sm"
                buttonClassName="!border !rounded-l-lg !bg-muted"
            />
        </div>
    )
}
