// app/admin/popup-settings/page.jsx
import Link from "next/link";
import { fetchPopupSettings, updatePopupSettings } from "@/app/_lib/actions";
import PopupSettingsForm from "@/app/components/PopupSettingsForm";

export default async function AdminPopupSettings({ searchParams }) {
  // Fetch the current popup settings from Supabase.
  const popup = await fetchPopupSettings();

  // Read any query message (if you prefer a redirect-based feedback)
  const message = searchParams?.message || "";

  return (
    <div className="container mx-auto p-8">
      <Link href="/admin">
        <button className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
          Back to Admin Dashboard
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-6">Popup Settings</h1>
      {message && (
        <div className="mb-4 p-4 bg-green-600 text-white text-center">
          {message}
        </div>
      )}
      {/* We wrap our form in a client component for inline messaging */}
      <PopupSettingsForm popup={popup} />
    </div>
  );
}
