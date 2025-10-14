import { redirect } from "next/navigation";
import intlConfig from "../next-intl.config";

export default function RootRedirect() {
  redirect(`/${intlConfig.defaultLocale}`);
}
