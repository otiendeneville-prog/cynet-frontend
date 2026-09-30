import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Car')({
  component: RouteComponent,
})

function RouteComponent() {
 return(
    <div className='align-center justify-around px-10 py-20'>
        <p className='text-bold align-center justify-center font-bold-black popins bg-gray-900 '>
        This is the initial Cynet East Africa Consultancy site
        </p>
    </div>
 )
}


