import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, company, email, phone, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Rating App <info@ratingapp.com.ar>',
      to: ['inteligenciadigital2025@gmail.com'], 
      subject: 'Nuevo mensaje de contacto',
      react: EmailTemplate({ name, company, email, phone, message }),
    });

    if (error) {
      console.error('Error al enviar el email:', error);
      return Response.json({ error: 'Error al enviar el email' }, { status: 500 });
    }

    return Response.json({ message: 'Email enviado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error en la ruta API:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
