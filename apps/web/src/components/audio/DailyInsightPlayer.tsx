"use client"
export default function DailyInsightPlayer(){

  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">

      <h2 className="text-xl font-semibold mb-4">
        Daily Strategic Read
      </h2>

      <audio controls className="w-full mb-4">
        <source src="/audio/daily.mp3" type="audio/mpeg"/>
      </audio>

      <details className="text-[#EAEAEA]/70">
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
