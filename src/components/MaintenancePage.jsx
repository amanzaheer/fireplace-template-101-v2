/**
 * Shown when the datastore has no content for the current domain.
 * Gives visitors a polished, non-alarming holding page while the site is
 * being set up or while the datastore is temporarily unreachable.
 */
export default function MaintenancePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#f1f5f9",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.15)",
          border: "2px solid rgba(99,102,241,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.75rem",
          fontSize: 32,
        }}
      >
        🔧
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          margin: "0 0 0.75rem",
          background: "linear-gradient(90deg, #a5b4fc, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        We&rsquo;ll Be Right Back
      </h1>

      {/* Sub-heading */}
      <p
        style={{
          fontSize: "1.125rem",
          color: "#94a3b8",
          maxWidth: 480,
          lineHeight: 1.65,
          margin: "0 0 2.5rem",
        }}
      >
        This site is currently being set up. We&rsquo;re working hard to get
        everything ready and will be live very soon.
      </p>

      {/* Divider */}
      <div
        style={{
          width: 48,
          height: 3,
          borderRadius: 2,
          background: "linear-gradient(90deg, #6366f1, #818cf8)",
          marginBottom: "2.5rem",
        }}
      />

      {/* Status badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 999,
          padding: "0.45rem 1rem",
          fontSize: "0.875rem",
          color: "#a5b4fc",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#6366f1",
            display: "inline-block",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        Setup in progress
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </main>
  );
}
