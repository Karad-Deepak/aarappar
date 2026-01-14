import { fetchSiteSetting } from "@/app/lib/actions";
import PickupForm from "./_components/PickupForm";

export default async function PickupPage() {
  const pickupsEnabledValue = await fetchSiteSetting("pickups_enabled");
  // Default to true if setting doesn't exist
  const pickupsEnabled = pickupsEnabledValue === null ? true : pickupsEnabledValue === "true";

  return <PickupForm pickupsEnabled={pickupsEnabled} />;
}
