// app/admin/popup-settings/page.jsx
import Link from "next/link";
import { fetchPopupSettings, updatePopupSettings } from "@/app/_lib/actions";
import PopupSettingsForm from "@/app/components/PopupSettingsForm";

export const revalidate = 300;
export default async function AdminPopupSettings({ searchParams }) {
  // Fetch the current popup settings from Supabase.
  const popup = await fetchPopupSettings();

  return (
    <div className="container mx-auto p-8">
      <Link href="/admin"></Link>
      <h1 className="text-4xl font-bold mb-6">Popup Settings</h1>

      {/* We wrap our form in a client component for inline messaging */}
      <PopupSettingsForm popup={popup} />
    </div>
  );
}
