export function generateDailyInsight(){

  const insights=[
    "Communication may require patience today.",
    "Small clarifications can prevent larger misunderstandings.",
    "Listening first may reduce tension.",
    "A pause before reacting may improve outcomes."
  ]

  const index=Math.floor(Math.random()*insights.length)

  return insights[index]

}
