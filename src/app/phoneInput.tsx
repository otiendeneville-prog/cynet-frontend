import { useForm, type FieldApi } from '@tanstack/react-form'
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'

const e164CountryCodes: string[] = ['+1', '+44', '+254']

interface PhoneInputValue {
    countryCallingCode: string
    phone: string
}

export default function InputPhone({
    field,
}: {
    field: FieldApi<any, any, any, any, PhoneInputValue>
}) {
    const value = field.state.value || { countryCallingCode: '', phone: '' }
    const ariaInvalid = field.state.meta.isTouched && !!field.state.meta.errors.length

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {/* The Unified Input Wrapper Group */}
            <div
                data-invalid={ariaInvalid}
                className="group/phoneinput flex items-center rounded-lg border border-input bg-background transition-all focus-within:ring-2 focus-within:ring-primary data-[invalid=true]:border-destructive"
            >
                <Combobox
                    items={[...e164CountryCodes].sort()} // Cloned to prevent sorting mutability side-effects
                    value={value.countryCallingCode}
                    onValueChange={(val) => {
                        field.setValue({
                            ...value,
                            countryCallingCode: val || '',
                        })
                    }}
                >
                    <ComboboxInput
                        placeholder="Code"
                        className="h-10 w-24 rounded-r-none border-0 bg-transparent px-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 !ring-0"
                        onBlur={field.handleBlur}
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

                {/* Divider Line Between Picker and Input */}
                <div className="h-6 w-[1px] bg-input shrink-0" />

                <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 712345678"
                    className="h-10 rounded-l-none border-0 bg-transparent pl-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 !ring-0 w-full"
                    value={value.phone}
                    onChange={(e) => {
                        field.setValue({
                            ...value,
                            phone: e.target.value,
                        })
                    }}
                    onBlur={field.handleBlur}
                    aria-invalid={ariaInvalid}
                />
            </div>

            {/* Global TanStack Error Feedback Rendering */}
            {ariaInvalid && (
                <p className="text-xs font-medium text-destructive mt-1">
                    {field.state.meta.errors.join(', ')}
                </p>
            )}
        </div>
    )
}
