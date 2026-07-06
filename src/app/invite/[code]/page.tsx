import InvitePageClient from "./invite-page-client";

export function generateStaticParams() {
  return [{ code: "invite" }];
}

export default function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  return <InvitePageClient params={params} />;
}
