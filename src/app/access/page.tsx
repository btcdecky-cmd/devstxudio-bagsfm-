import { AccessRequest } from "@/components/access-request";

export const metadata = {
  title: "Developer Access — Dev Studio",
};

export default function AccessPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <span className="eyebrow">access.dev.studio</span>
        <h1 className="serif mt-3 text-3xl font-semibold tracking-tight text-white">
          Developer Access
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Dev Studio is currently in private beta. Access is granted to developers who create
          or own a token on pump.fun (bagsfm). Verify your wallet to request an invitation.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <AccessRequest />
      </div>
    </main>
  );
}
