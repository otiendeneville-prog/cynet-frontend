import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/countryCode')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/countryCode"!</div>
}
