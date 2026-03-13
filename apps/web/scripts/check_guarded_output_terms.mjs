import fs from "node:fs"
import path from "node:path"

const banned = [
  "power grid",
  "encryption layer",
  "lateral stabilizer",
  "peripheral node",
]

const targets = [
  path.resolve("../../packages/narrative-composer/src/index.ts"),
  path.resolve("src/app/api/insights/route.ts"),
]

const offenders = []

for (const file of targets) {
  if (!fs.existsSync(file)) continue
  const content = fs.readFileSync(file, "utf8").toLowerCase()
  for (const phrase of banned) {
    if (content.includes(phrase)) {
      offenders.push({ file, phrase })
    }
  }
}

if (offenders.length > 0) {
  console.error("Banned vocabulary found in guarded output paths:")
  for (const offender of offenders) {
    console.error(`- ${offender.file}: ${offender.phrase}`)
  }
  process.exit(1)
}

console.log("Guardrail vocabulary check passed")
