// pages/privacy-policy.js
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-12 mt-5 lg:mt-10 text-black">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: March 16, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            We at{" "}
            <span className="font-semibold">AARAPPAR Indisches Restaurant</span>{" "}
            value your privacy and handle your personal information responsibly
            in accordance with GDPR and German data protection laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
          <ul className="list-disc pl-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address (for delivery orders)</li>
            <li>Reservation/order details (date, time, items ordered)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Purpose of Data Collection
          </h2>
          <p>
            Your data is collected solely to process table reservations or
            fulfill your orders. It will never be used for other purposes
            without explicit consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Data Storage & Security
          </h2>
          <p>
            Your data is securely stored and protected against unauthorized
            access. Data will be deleted once it's no longer required, or upon
            your request.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p>
            We do not use cookies, except for essential cookies necessary for
            the basic functionality of our reservation or ordering systems.
            These essential cookies do not require your consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p>You have the following rights under GDPR:</p>
          <ul className="list-disc pl-6">
            <li>Access your personal data</li>
            <li>Correct your personal data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
          </ul>
          <p className="mt-4">
            To exercise your rights, contact us via email at:{" "}
            <a href="mailto:info@yourrestaurant.com" className="underline">
              aarapparrodelheim@aarappar.de
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Contact & Complaints
          </h2>
          <p>
            If you have concerns about data privacy, please contact us directly.
            You also have the right to lodge a complaint with the responsible
            supervisory authority in Germany.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}

