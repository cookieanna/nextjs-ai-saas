import { NextResponse } from "next/server";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(req: Request) {
  const body = await req.json()
  const { prompt } = body;

  const response = {
    prompt
  }

  return NextResponse.json(response,{status:200})
  try {
    // const response = await replicate.run(
    //   "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
    //   {
    //     input: {
    //       prompt: prompt
    //     }
    //   }
    // );
    // return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 })
  }


}