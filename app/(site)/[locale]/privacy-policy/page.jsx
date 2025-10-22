import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicy() {
  const t = await getTranslations("PrivacyPolicy");
  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-12 mt-5 lg:mt-10 text-black">
        <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
        <p className="text-gray-500 mb-8">{t("lastUpdated")}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. {t("sections.introduction.title")}</h2>
          <p>{t("sections.introduction.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. {t("sections.dataCollection.title")}</h2>
          <ul className="list-disc pl-6">
            {t.raw("sections.dataCollection.items").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. {t("sections.purpose.title")}
          </h2>
          <p>{t("sections.purpose.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. {t("sections.storage.title")}
          </h2>
          <p>{t("sections.storage.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. {t("sections.cookies.title")}</h2>
          <p>{t("sections.cookies.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. {t("sections.rights.title")}</h2>
          <p>{t("sections.rights.intro")}</p>
          <ul className="list-disc pl-6">
            {t.raw("sections.rights.items").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">
            {t("sections.rights.contact")}{" "}
            <a href="mailto:aarapparrodelheim@aarappar.de" className="underline">
              aarapparrodelheim@aarappar.de
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. {t("sections.complaints.title")}
          </h2>
          <p>{t("sections.complaints.content")}</p>
        </section>
      </div>
      <Footer />
    </>
  );
}

