// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const endpoint = "https://api.printify.com/";
const apiKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImUzNWY4ZjE2NDk4ZGE2ZGYxMmRjMmRiMDJlZTYwYmQ1Y2ZmZTQ1ZDI0YzJiYmU3MzZkMmQ0OTZlYzNjZDRmYzYzYzgzODQ1YTMzYThlOGJiIiwiaWF0IjoxNjgzMjM5MzUxLjkyMDczMiwibmJmIjoxNjgzMjM5MzUxLjkyMDczNSwiZXhwIjoxNzE0ODYxNzUxLjkxNDA4Mywic3ViIjoiMTMxODkzNzYiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.Ai1I1czvW2GZEzvR0t0oaZuBEvR8lFAYbQz8JUXvJ3biDsSKa30GWNZ1_QgW6PGZXXFLZgVTR4O9DJEAAYE";
const shop_id = "9006751";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image, part } = JSON.parse(req.body);
  try {
    const response = await fetch(`${endpoint}v1/uploads/images.json`, {
      method: "POST",
      headers: {
        "User-Agent": "NodeJS",
        Authorization: `Bearer ${`${apiKey}`}`,
      },
      body: JSON.stringify({
        file_name: "Black background white textx",
        contents: image,
      }),
    });
    const data = await response.json();
    if (!data.id) return false;
    res.status(200).json({ created: data.id, part });
  } catch (error) {
    console.log(error);
    return false;
  }
}
