import React from "react";

const Contact = () => {
  return (
    <>
      <section id="contact" className="pb-[110px] pt-[100px]">
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Queres que ser parte de Rating App?
            </h2>
            <p className="text-base text-body">
              
            </p>
          </div>
        </div>

        <div className="container">
          <div
            className="wow fadeInUp mx-auto w-full max-w-[925px] rounded-lg bg-[#F8FAFB] px-8 py-10 shadow-card dark:bg-[#15182B] dark:shadow-card-dark sm:px-10"
            data-wow-delay=".3s"
          >
            <form>
              <div className="-mx-[22px] flex flex-wrap">
                <div className="w-full px-[22px] md:w-1/2">
                  <div className="mb-8">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Ingresa tu nombre"
                      className="w-full rounded border border-stroke bg-white px-[30px] py-4 text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="w-full px-[22px] md:w-1/2">
                  <div className="mb-8">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      placeholder="Empresa (opcional)"
                      className="w-full rounded border border-stroke bg-white px-[30px] py-4 text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="w-full px-[22px] md:w-1/2">
                  <div className="mb-8">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Ingresa tu correo electrónico"
                      className="w-full rounded border border-stroke bg-white px-[30px] py-4 text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="w-full px-[22px] md:w-1/2">
                  <div className="mb-8">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Ingresa tu número de teléfono"
                      className="w-full rounded border border-stroke bg-white px-[30px] py-4 text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="w-full px-[22px]">
                  <div className="mb-8">
                    <textarea
                      rows={6}
                      name="message"
                      id="message"
                      placeholder="Cuéntanos sobre ti"
                      className="w-full rounded border border-stroke bg-white px-[30px] py-4 text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>

                <div className="w-full px-[22px]">
                  <div className="text-center">
                    <p className="mb-5 text-center text-base text-body">
                      Al hacer clic en el botón de contacto, aceptas nuestros términos y política.
                    </p>
                    <button
                      type="submit"
                      className="inline-block rounded-md bg-primary px-11 py-[14px] text-base font-medium text-white hover:bg-opacity-90"
                    >
                      Contáctanos
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;