import { JournalPostView } from "@/components/pages/JournalDetailView";
export { generateMetadata, generateStaticParams } from "@/components/pages/JournalDetailView";
export default function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) { return <JournalPostView params={params} />; }
