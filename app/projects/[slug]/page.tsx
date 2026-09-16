import { ProjectView } from "@/components/pages/ProjectDetailView";
export { generateMetadata, generateStaticParams } from "@/components/pages/ProjectDetailView";
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { return <ProjectView params={params} />; }
