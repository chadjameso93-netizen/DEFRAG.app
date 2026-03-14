
"use client"

export default function DailyInsightPlayer(){

  return (
    <div className="border border-white/10 bg-white/5 rounded-xl p-6 backdrop-blur">

      <h2 className="text-xl font-semibold mb-4">
        Daily Strategic Read
      </h2>

      <audio controls className="w-full mb-4">
        <source src="/audio/daily.mp3" type="audio/mpeg"/>
      </audio>

      <details className="text-white/70">
        <summary className="cursor-pointer">
          Expand transcript
        </summary>

        <p className="mt-3 text-sm">
          Generated daily strategic read transcript.
        </p>

      </details>

    </div>
  )
}
