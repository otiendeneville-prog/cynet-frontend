import { Field } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { e164CountryCodes } from '#/lib/e164'

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'

export default function InputPhone({
    phone,
    onChangePhone = () => { },
    onBlurPhone,
    countryCallingCode,
    onChangeCountryCallingCode,
    onBlurCountryCallingCode,
    ariaInvalid,
}: {
    phone?: string
    onChangePhone?: (v: string | null) => void
    onBlurPhone?: () => void
    countryCallingCode?: string
    onChangeCountryCallingCode?: (v: string | null) => void
    onBlurCountryCallingCode?: () => void
    ariaInvalid?: boolean
}) {
    return (
        <div className="group/phoneinput border-background has-focus-visible:border-primary-500 has-[[data-slot][aria-invalid=true]]:border-destructive-500 flex items-end rounded-[12px] border has-focus-visible:border">
            <Combobox
                items={e164CountryCodes.sort()}
                value={countryCallingCode}
                onValueChange={onChangeCountryCallingCode}
            >
                <ComboboxInput
                    placeholder="Code"
                    className={
                        'group-has-focus-visible/phoneinput:bg-primary-50 h-12 w-28 rounded-r-none px-0 shadow-none ring-0! [&_input]:pr-0!'
                    }
                    onBlur={onBlurCountryCallingCode}
                    aria-invalid={ariaInvalid}
                />
                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            <Field>
                <Input
                    id="phone"
                    placeholder="e.g. 712345678"
                    className="group-has-focus-visible/phoneinput:bg-primary-50 h-12 rounded-l-none pl-1.5 ring-0!"
                    value={phone}
                    onChange={(e) => onChangePhone(e.target.value)}
                    onBlur={onBlurPhone}
                    aria-invalid={ariaInvalid}
                />
            </Field>
        </div>
    )
}
