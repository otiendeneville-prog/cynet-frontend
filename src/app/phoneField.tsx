import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/phoneField')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/phoneField"!</div>
}
