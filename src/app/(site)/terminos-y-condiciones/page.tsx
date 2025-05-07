import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones - RatingApp",
  description: "Términos y condiciones de uso de RatingApp",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
        ACEPTO TERMINOS DE USO O “ACUERDO” Y CONDICIONES
      </h1>

      <div className="mx-auxto max-w-3xl  rounded-lg p-8 shadow-md dark:bg-gray-800">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          POR FAVOR, LEA Y REVISE ATENTAMENTE ESTOS TÉRMINOS DE USO ANTES DE
          UTILIZAR NUESTRA PAGINA WEB, LA APP, O CUALQUIER ELEMENTO INTEGRANTE
          DE NUESTRO ECOSISTEMA DE SERVICIOS TECNOLOGICOS.
        </h2>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          Condiciones de Registro y Términos de Uso o “Acuerdo” general del
          Sistema.
        </h2>{" "}
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          El Sistema RATING APP, su Portal www.ratingapp.com.ar, su App, los
          dominios adjuntos al sistema , junto a todo el ecosistema de servicios
          que lo integran son propiedad de Consultora I+D Inteligencia Digital
        </h2>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          1. Aceptación general de los términos y condiciones de uso o
          “Acuerdo”.
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          1.1. Los presentes términos y condiciones de uso conforman las reglas
          de utilización del Sistema RATING APP, portal web, App y complementos
          operativos del sistema, junto a los derechos y obligaciones de los
          Usuarios del mismo, entendiéndose por tales a los usuarios registrados
          y a los usuarios no registrados.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          1.2. Al proceder al Registro en el Portal o al utilizar cualquiera de
          los servicios del mismo que no requieren la condición de usuario
          registrado, el usuario está aceptando las condiciones y términos de
          uso generales que más adelante se detallan, así como las específicas
          que adicionalmente rijan para cada sección en particular.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          1.3. El usuario declara entender y aceptar que estas condiciones y
          términos de uso son dinámicas y sujetas a variaciones por parte del
          Sistema RATING APP en cualquier momento sin necesidad de previa
          información.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          1.4. Las prestaciones y servicios que ofrece el Portal son gratuitas,
          salvo el caso específico en que se indique lo contrario.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          1.5. El Sistema RATING APP se reserva el derecho de suspender el
          servicio o partes del mismo en cualquier momento, sea en forma
          temporal o definitiva, por razones de fuerza mayor o decisiones
          estratégicas sin necesidad de previa comunicación.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          2. Objetivo de la recolección de datos
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          2.1. RATING APP es un Ecosistema de Servicios Tecnológicos que incluye
          una App y un Portal interactivo en el que los usuarios pueden expresar
          sus opiniones y aportar contenidos.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          El usuario se hace responsable de las opiniones que emite así como de
          los contenidos que aporta y por ese motivo proporciona los datos que
          permiten identificarle.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          2.2. Asimismo, el Portal brinda la posibilidad de personalización en
          determinados aspectos conforme los gustos y preferencias de los
          usuarios.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Al aportar sus datos, el usuario está aceptando que el Sistema RATING
          APP utilice los mismos con la finalidad de brindarle un servicio
          personalizado y acorde a los gustos y preferencias del usuario.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A modo de ejemplo, el Sistema RATING APP podrá remitir al usuario
          noticias que sean de su interés de acuerdo a su profesión o intereses
          personales e invitarlo a participar de múltiples acciones
          promocionales, premios, acceso a membresías personalizadas de acuerdo
          al Programa de Fidelización del usuario contemplado por el Sistema.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          El usuario acepta asimismo que el Sistema RATING APP utilice los datos
          proporcionados para obtener datos estadísticos generales sobre la
          composición de sus usuarios, (AAV) Audiencia Activa Visible, para uso
          propio o de terceros en la forma en que se describe en el numeral
          siguiente.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          3. Política de privacidad
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Almacenará los mismos únicamente con la finalidad y alcance previstos
          en las presentes condiciones.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Almacenará los mismos únicamente con la finalidad y alcance previstos
          en las presentes condiciones.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          3.2. El Sistema RATING APP puede elaborar y transmitir a terceros
          datos estadísticos y generales acerca del comportamiento del usuario
          como audiencia de tv, radio, streaming, periódicos on line,
          multiplataformas, y sobre el comportamiento colectivo de sus usuarios.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Estas estadísticas pueden ser elaboradas conforme los datos aportados
          por los propios usuarios así como por los datos que surjan del
          análisis del tráfico en el Portal y sus diferentes secciones.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Para efectuar el seguimiento mencionado el Sistema RATING APP puede
          utilizar cookies.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          3.3. En ningún caso el Sistema RATING APP transmitirá ni dará a
          conocer datos individuales (entendiéndose por tales aquellos que
          permitan identificar al usuario con DNI), salvo aquellos casos en que
          legalmente corresponda; a vía de ejemplo, por haber sido requerido por
          el Poder Judicial, o en ocasión de discutirse un diferendo entre un
          usuario del Sistema RATING APP y esta última.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          3.4. El Sistema RATING APP no se hace responsable de la pérdida.
          hurto. Hackeo o filtraciones producidas acerca de los contenidos
          expresados en la App, el portal y los datos de los usuarios.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          3.5. Algunas secciones del Portal exigen, para su correcto
          funcionamiento, que el usuario aporte datos sobre sus preferencias en
          materia de noticias, entretenimientos y contenidos en general. Así,
          aportando dicha información, el usuario podrá recibir contenido
          personalizado conforme sus intereses, así como noticias y alertas
          relacionadas con los mismos, invitación permanente a participar por
          premios, sorteos y beneficios al Usuario.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          En caso de utilizar estas herramientas de personalización e
          información customizada, el usuario acepta que puede recibir
          publicidad institucional o de terceros.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          3.6. Algunas secciones del Portal o del Sistema Rating App podrán
          soportan la funcionalidad Rss . En caso de utilizar esta herramienta,
          el usuario acepta la funcionalidad de la misma.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          4. Normas de comportamiento
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          4.1. El usuario se compromete a no verter expresiones o aportar
          contenidos lesivos u ofensivos de otra persona o de una colectividad,
          sean usuarios del Sistema Rating App, su Portal o no y se hace plena e
          ilimitadamente responsable del daño que su conducta pueda causar.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          4.2. A mera vía de ejemplo de lo que significa contenido lesivo u
          ofensivo, se entiende por tal aquel que atente contra el honor, la
          intimidad, la imagen, el nombre, las creencias religiosas, un grupo
          étnico o religioso o que incite a la violencia. Se considera lesivo u
          ofensivo asimismo el material de contenido pornográfico.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          4.3. El usuario se compromete a respetar los derechos de autor en
          relación a todo contenido que aporte al Sistema Rating App,
          entendiéndose por contenido texto, imagen o sonido o la combinación de
          cualquiera de ellos, y se hace plenamente responsable de cualquier
          violación a los mismos.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          El Sistema RATING APP podrá eliminar del Ecosistema de Servicios
          Tecnológicos, Su Portal , o App, cualquier contenido aportado por el
          usuario sin previa notificación y sin expresión de causa.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          4.4. Todo usuario tendrá el derecho y la obligación de reportar abuso
          por parte de otro usuario, toda vez que se produzca un ataque a su
          persona o una conducta violatoria de cualquiera de los presentes
          términos de uso.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          4.5. El Sistema RATING APP podrá dar de baja a cualquier usuario sin
          previa notificación y sin expresión de causa, en cualquier caso en que
          constate violación a la normativa de utilización del portal o a raíz
          de la denuncia de abuso por parte de otro usuario, si la considera
          procedente. Perdiendo en esta instancia el Usuario (suscriptor)
          cualquier derecho a reclamos futuros acerca de cualquier premio,
          herramienta u otorgamiento de beneficios brindados por el Sistema
          Rating App.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          La decisión por parte del Sistema RATING APP de cancelar el registro
          del usuario de que se trate no será revisable, salvo casos
          excepcionale
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          5. Derechos de propiedad Intelectual del Sistema RATING APP
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          5.1. Todos los contenidos generados directamente por el Sistema Rating
          App son de propiedad intelectual de RATING APP (propiedad de
          Consultora I+D Inteligencia Digital) o la misma ha sido debidamente
          autorizada a utilizarlos.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Los usuarios no utilizarán ni reproducirán los contenidos con fines
          comerciales ni los editarán, compartirán o transmitirán, sea o no con
          fines de lucro, salvo mediante las herramientas expresamente previstas
          en el sitio a tales efectos, salvo expresa autorización del Sistema
          Rating App.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          5.2. Por el hecho de aportar un contenido al Portal o Sistema Rating
          App (entendiéndose por contenido el definido conforme el numeral 4.3),
          el usuario declara aceptar que el mismo podrá ser utilizado - en el
          sentido más amplio de la palabra - por el Sistema RATING APP, sin que
          ello genere derecho a contraprestación de clase alguna. Así, a mera
          vía de ejemplo, queda entendido que el Sistema RATING APP podrá
          utilizar cualquier contenido que considere de interés, adaptándolo y
          emitiendo el mismo por cualquier plataforma, sea a través de un medio
          de comunicación propio o de terceros.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          6. Información y publicaciones contenidas en el Portal y Sistema
          Rating App
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          6.1. En virtud del carácter interactivo del Sistema Rating App, el
          usuario declara entender y aceptar que existen contenidos dentro del
          mismo que no son aportados por el Sistema RATING APP.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          El hecho de que un determinado contenido se encuentre disponible en el
          Sistema no implica en lo absoluto que el Sistema RATING APP comparta
          lo que en el mismo se exprese o transmita.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          6.2. El usuario es responsable de verificar si la información que está
          utilizando es proporcionada por el Sistema RATING APP o si, a vía de
          ejemplo, ha sido aportada como contenido por otro usuario del
          Sistema.-
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          6.3. El Sistema RATING APP se reserva el derecho de publicar o no los
          contenidos que los usuarios aporten y de eliminar los mismos del
          Sistema o Portal en cualquier momento.{" "}
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          El Sistema RATING APP no se hace responsable de ninguna pérdida de
          información, declarando el usuario comprender y aceptar que el Sistema
          Rating App no es un sitio destinado a almacenar información del
          usuario.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Cualquier registro por parte de cualquier persona menor de 16 años, no
          está autorizado, y viola este Acuerdo. Al registrarse en los
          Servicios, usted declara y garantiza que cumple con el requisito de
          edad establecido anteriormente y que acepta y cumplirá con todos los
          términos y condiciones de este Acuerdo. Los términos de uso
          especificados podrán ser modificados en forma permanente, aceptando el
          usuario los términos de uso, “acuerdos” y condiciones actualizadas.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          ESTE SITIO PUEDE CONTENER INFORMACION PARA ADULTOS. LA PRESENCIA DE UN
          MENOR DEBERA CONTAR CON LA AUTORIZACION DE UNA PERSONA MAYOR.
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Si no está de acuerdo con estos términos de uso, no debe utilizar
          nuestros Servicios. Le recomendamos que imprima una copia de est os
          términos para futuras referencias.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
