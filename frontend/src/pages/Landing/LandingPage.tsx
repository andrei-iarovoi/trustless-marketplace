import { Link } from "react-router";

export function LandingPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="max-w-4xl text-center">
        <p className="mb-4 text-cyan-400 font-medium">
          Decentralized Escrow Protocol
        </p>

        <h1 className="mb-6 text-6xl font-bold tracking-tight text-white">
          Trustless Marketplace
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-slate-400">
          Secure escrow for freelancers, agencies and businesses.
          Create trustless agreements, lock funds on-chain and complete
          payments without intermediaries.
        </p>

        <Link
          to="/marketplace"
          className="inline-flex items-center rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Launch App
        </Link>
      </div>
    </section>
  );
}