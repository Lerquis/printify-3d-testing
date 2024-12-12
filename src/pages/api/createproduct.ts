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
  const { productInformation } = JSON.parse(req.body);
  const productCreated = await createProduct(productInformation);
  //   const data = await response.json();
  // res.status(200).json({ status_code: productCreated ? true : false });
  if (productCreated)
    return res.status(200).json({
      status_code: 200,
      id: productCreated.id,
      images: productCreated.images,
    });
  res.status(200).json({ status_code: 400 });
}

const createProduct = async (productImages: { id: string; part: string }[]) => {
  try {
    const bodyData = JSON.stringify({
      title: "Product",
      description: "Good product",
      blueprint_id: 6,
      print_provider_id: 6,
      variants: [
        {
          id: 12120,
          title: "Azalea / S",
          price: 1000,
          options: {
            color: "Azalea",
            size: "S",
          },
          placeholders: [
            {
              position: "back",
              height: 4180,
              width: 3300,
            },
            {
              position: "front",
              height: 4180,
              width: 3300,
            },
          ],
        },
      ],
      print_areas: [
        {
          variant_ids: [
            78991, 79021, 79046, 78992, 79022, 79047, 78993, 79023, 79048,
            78994, 79024, 79049, 78995, 79025, 79050, 73196, 73199, 73200,
            73203, 73204, 73207, 73208, 73211, 73212, 73215,
          ],

          placeholders: productImages.map((imageInformation) => ({
            position: imageInformation.part,
            images: [
              {
                id: imageInformation.id,
                name: "Random name",
                type: "text/svg",
                x: 0.5,
                y: 0.5,
                scale: 1,
                angle: 0,
              },
            ],
          })),
          font_color: "#000",
          font_family: "Roboto",
        },
      ],
    });

    const response = await fetch(
      `${endpoint}v1/shops/${shop_id}/products.json`,
      {
        method: "POST",
        headers: {
          "User-Agent": "NodeJS",
          Authorization: `Bearer ${`${apiKey}`}`,
          // El content type es necesario de agregar.
          "Content-Type": "application/json",
        },
        body: bodyData,
      }
    );
    const data = await response.json();
    if (!data) return false;
    if (data.id) return { id: data.id, images: data.images };
  } catch (error) {
    console.log(error);
    return false;
  }
};
