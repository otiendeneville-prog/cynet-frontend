import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export const Route = createFileRoute('/countryCode')({
    component: RouteComponent,
})

function RouteComponent() {
    const [phone, setPhone] = useState("")
    const [displayPhone, setDisplayPhone] = useState("")

    return (
        <div className='p-20'>
            <PhoneInput
                country="KEN"
                value='phone'

            />



        </div>
    )
}
