// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const endpoint = "https://api.printify.com/";
const apiKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImUzNWY4ZjE2NDk4ZGE2ZGYxMmRjMmRiMDJlZTYwYmQ1Y2ZmZTQ1ZDI0YzJiYmU3MzZkMmQ0OTZlYzNjZDRmYzYzYzgzODQ1YTMzYThlOGJiIiwiaWF0IjoxNjgzMjM5MzUxLjkyMDczMiwibmJmIjoxNjgzMjM5MzUxLjkyMDczNSwiZXhwIjoxNzE0ODYxNzUxLjkxNDA4Mywic3ViIjoiMTMxODkzNzYiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.Ai1I1czvW2GZEzvR0t0oaZuBEvR8lFAYbQz8JUXvJ3biDsSKa30GWNZ1_QgW6PGZXXFLZgVTR4O9DJEAAYE";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blueprint_id } = JSON.parse(req.body);
  const response = await fetch(
    `${endpoint}v1/catalog/blueprints/${blueprint_id}.json`,
    {
      headers: {
        "User-Agent": "NodeJS",
        Authorization: `Bearer ${`${apiKey}`}`,
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
