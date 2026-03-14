export default function AuraLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className="aura-loader"
        style={{
          width: 64,
          height: 64,
          borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
          background: "radial-gradient(ellipse at center, #F5F5F0, #0A0A0A)",
          animation: "aura-breathe 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate",
        }}
      />
      <style>{`
        @keyframes aura-breathe {
          0% {
            transform: scale(1) rotate(0deg);
            border-radius: 40% 60% 55% 45% / 55% 40% 60% 45%;
            opacity: 0.7;
          }
          33% {
            transform: scale(1.08) rotate(60deg);
            border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%;
            opacity: 1;
          }
          66% {
            transform: scale(0.95) rotate(120deg);
            border-radius: 45% 55% 60% 40% / 60% 45% 55% 45%;
            opacity: 0.8;
          }
          100% {
            transform: scale(1.05) rotate(180deg);
            border-radius: 50% 50% 45% 55% / 50% 55% 45% 50%;
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  )
}
