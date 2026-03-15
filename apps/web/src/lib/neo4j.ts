import neo4j from "neo4j-driver"
import type { Driver } from "neo4j-driver"

const uri = process.env.NEO4J_URI || "bolt://localhost:7687"
const user = process.env.NEO4J_USERNAME || "neo4j"
const password = process.env.NEO4J_PASSWORD || ""

let driver: Driver | null = null

export function getNeo4jDriver() {
  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  }
  return driver
}

export async function closeNeo4jDriver() {
  if (driver) {
    await driver.close()
    driver = null
  }
}
