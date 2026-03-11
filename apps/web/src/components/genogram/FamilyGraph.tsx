"use client"

import ReactFlow from "reactflow"
import "reactflow/dist/style.css"

const nodes=[
  {id:"you",position:{x:0,y:0},data:{label:"You"}},
  {id:"parent",position:{x:200,y:0},data:{label:"Parent"}},
  {id:"sibling",position:{x:200,y:150},data:{label:"Sibling"}}
]

const edges=[
  {id:"1",source:"you",target:"parent",label:"family"},
  {id:"2",source:"you",target:"sibling",label:"family"}
]

export default function FamilyGraph(){

  return(
    <div style={{height:400}}>
      <ReactFlow nodes={nodes} edges={edges}/>
    </div>
  )

}
