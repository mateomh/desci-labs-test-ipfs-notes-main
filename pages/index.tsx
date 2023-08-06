import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { BasicIpfsData } from "./api/ipfs";
import { create } from "ipfs-http-client";
import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import SidePanel from "./components/sidepanel/sidepanel";
import ContentSection from "./components/contentsection/contentsection";
import WellMessage from "./components/wellmessage/wellmessage";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [notes, setNotes] = useState<BasicIpfsData[]>([]);
  const [displayWell, setDisplayWell] = useState<boolean>(false);
  const [wellText, setWellText] = useState<string>("");

  return (
    <>
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <div className="flex">
          <WellMessage 
            text={wellText} 
            display={displayWell} 
            setDisplayWell={setDisplayWell}
          />
          <SidePanel 
            setWellText={setWellText} 
            setDisplayWell={setDisplayWell}
            setNotes={setNotes}
          />
          <ContentSection 
            notes={notes}
          />
        </div>
      </main>
    </>
  );
}
