import fs from "fs";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const filePath = `./output/${body.filename}.ts`; // Path to the file

  fs.writeFile(filePath, body.data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  return Response.json({
    message: `write file`,
  });
}
