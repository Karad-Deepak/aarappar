// src/components/MaintenancePage.jsx

export default function Notice() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-left overflow-hidden">
        {/* Floating gears */}
        <div className="absolute inset-0 pointer-events-none">
          <span
            className="absolute text-6xl  animate-spin"
            style={{ top: "5%", left: "10%", animationDuration: "25s" }}
          >
            ⚙️
          </span>
          <span
            className="absolute text-5xl  animate-pulse"
            style={{ bottom: "10%", right: "2%" }}
          >
            ⚙️
          </span>
        </div>

        {/* Bouncing wrench */}
        <div className="relative z-10 mb-6">
          <span className="text-7xl inline-block pl-10 lg:pl-20 animate-bounce">
            🔧
          </span>
        </div>

        {/* German version */}
        <h1 className="relative z-10 text-2xl font-semibold mb-4">
          Liebe Gäste,
        </h1>
        <p className="relative z-10 text-gray-800 mb-6">
          unser Restaurant bleibt aufgrund von Wartungsarbeiten vorübergehend
          geschlossen. Wir bitten um Ihr Verständnis und entschuldigen uns
          aufrichtig für eventuelle Unannehmlichkeiten.
        </p>
        <p className="relative z-10 text-gray-700 italic mt-6">
          Mit freundlichen Grüßen
          <br />
          Aarappar Indisches Restaurant
        </p>

        <hr className="relative z-10 border-gray-300 my-6" />

        {/* English version */}
        <h1 className="relative z-10 text-2xl font-semibold mb-4">
          Dear Guests,
        </h1>
        <p className="relative z-10 text-gray-800">
          Please note that our restaurant is temporarily closed due to
          maintenance work until further notice. We sincerely apologize for any
          inconvenience this may cause and appreciate your understanding.
        </p>

        {/* Sign-off */}

        <p className="relative z-10 text-gray-700 italic mt-2">
          Kind Regards,
          <br />
          Aarappar Indisches Restaurant
        </p>
      </div>
    </div>
  );
}
