"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function FloatingLanguageSwitcher() {
  return (
    <div className="fixed bottom-6 right-5 z-50">
      <LanguageSwitcher />
    </div>
  );
}
