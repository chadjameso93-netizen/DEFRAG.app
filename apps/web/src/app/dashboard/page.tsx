"use client"

import RelationshipGraph from "@/components/graph/RelationshipGraph"
import AIChat from "@/components/chat/AIChat"
import FamilyGraph from "@/components/genogram/FamilyGraph"

export default function Dashboard(){

  return(

    <main className="p-10 space-y-10">

      <h1 className="text-3xl font-semibold">
        Defrag Relational Intelligence
      </h1>

      <section className="grid md:grid-cols-2 gap-6">

        <div className="border rounded-xl p-6">

          <h2 className="font-medium mb-4">
            Relationship Map
          </h2>

          <RelationshipGraph/>

        </div>

        <AIChat/>

      </section>

      <section className="border rounded-xl p-6">

        <h2 className="font-medium mb-4">
          Family System Map
        </h2>

        <FamilyGraph/>

      </section>

    </main>

  )

}
