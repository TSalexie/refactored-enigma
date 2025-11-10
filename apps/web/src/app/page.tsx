export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-center">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to Your Productivity Hub
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Combine the power of task management with rich content editing
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Get Started
          </button>
          <button className="border border-border px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
}
