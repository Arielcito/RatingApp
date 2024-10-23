import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  company,
  email,
  phone,
  message,
}) => (
  <div>
    <h1>Nuevo mensaje de contacto de Rating App</h1>
    <p>Se ha recibido un nuevo mensaje de contacto con los siguientes detalles:</p>
    <ul>
      <li><strong>Nombre:</strong> {name}</li>
      {company && <li><strong>Empresa:</strong> {company}</li>}
      <li><strong>Correo electrónico:</strong> {email}</li>
      <li><strong>Teléfono:</strong> {phone}</li>
    </ul>
    <h2>Mensaje:</h2>
    <p>{message}</p>
  </div>
);
