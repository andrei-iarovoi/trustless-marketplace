function App() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-card border border-border bg-card/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
          Sepolia escrow marketplace
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Trustless Marketplace
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          A production-minded Web3 marketplace interface for creating, funding, and completing
          escrow orders without relying on a trusted intermediary.
        </p>
      </section>
    </main>
  )
}

export default App
