import dynamic from "next/dynamic"
import { useRouter } from "next/router";

const ProjectView = dynamic(() => import('@/components/ProjectView'), {
    ssr: false
})

export default function Project() {

    const {
        query: { projectId }
    } = useRouter();


    return (
        <div>
            <ProjectView projectId={projectId} />
        </div>
    )
}   