// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { CID, Version } from "multiformats/cid";
import { base64 } from "multiformats/bases/base64"
import { create } from "ipfs-http-client";

// arbitrary response format
export type BasicIpfsData = {
  cid: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData>
) {
  if (req.method === "POST") {
    // Process a POST request
    submitNote(req, res);
  } else {
    // Handle any other HTTP method
    retrieveData(req, res);
  }
}

const submitNote = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData>
) => {
  const helia = await createHelia();
  const s = strings(helia);
  try {
    const cid = await s.add(req.body.note)
    console.log("ADDRESS: ", cid);
    res.status(200).json({ cid: cid.toString() , content: await s.get(cid) });
  } catch (error) {
    res.status(400);
  }
};

const retrieveData = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData>
) => {
  res.status(400);
};
