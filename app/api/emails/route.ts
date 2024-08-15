import { sendEmail } from "@/lib/mail.utils";

export async function POST(
  request: Request
) {
  const data = await request.json();

  const sender = {
    name: data.name,
    address: data.email,
  };
  const receiver = {
    name: "Samer Alaws",
    address: "contact@alaws.de",
  };

  try {
    const result = await sendEmail({
      sender,
      receiver,
      subject: `${data.reason} - ${data.subject}`,
      message: data.message,
    });
    return Response.json(
      {
        accepted: result.accepted,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
