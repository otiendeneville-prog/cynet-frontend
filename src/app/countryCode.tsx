import { createFileRoute } from '@tanstack/react-router'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export const Route = createFileRoute('/countryCode')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/countryCode"!</div>
}
