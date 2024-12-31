"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GraphicalRep } from "./Graph/GraphRep";
import TabularRep from "./Tabular";


function LegacyTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Graph</TabsTrigger>
        <TabsTrigger value="password">Tabular</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <GraphicalRep/>
      </TabsContent>
      <TabsContent value="password">
        <TabularRep/>
      </TabsContent>
    </Tabs>
  )
}

export default LegacyTabs