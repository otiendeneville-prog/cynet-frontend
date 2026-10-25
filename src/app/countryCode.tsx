import { createFileRoute } from '@tanstack/react-router'
import PhoneInput from 'react-phone-input-2'

export const Route = createFileRoute('/countryCode')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/countryCode"!</div>
}
