export function WelcomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-screen h-screen bg-bg" style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-bg), 5%, var(--color-bg), 80%, rgba(76,71,106,0.85)),
          url(https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
        `,
        backgroundSize: "cover, 80% cover",
        backgroundPosition: "center, right",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {children}
    </div>
  )
}