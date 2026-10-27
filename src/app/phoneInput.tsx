import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/phoneInput')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/phoneInput"!</div>
}
