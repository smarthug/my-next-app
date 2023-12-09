import dynamic from "next/dynamic"
import { useRouter } from "next/router";



// const ProjectPDF = dynamic(() => import('@/components/ProjectPDF'), {
//     ssr: false
// })

const ProjectPDF = dynamic(() => import('@/components/Sample'), {
    ssr: false
})

export default function Project() {

    const {
        query: { projectId }
    } = useRouter();


    return (
        <div>
            <ProjectPDF projectId={projectId} />
        </div>
    )
}   