"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    } else {
      console.error(error);
      router.refresh();
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <div className="w-full max-w-[600px] mx-auto p-8 rounded-2xl bg-color-bg  flex-col flex overflow-y-auto">
        <div className="flex justify-center mb-4">
          <Logo size={36} />
        </div>
        <h1 className="mb-2 text-xl font-bold">Log out of X?</h1>
        <div className="text-color-text-dimmed">
          <span>
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.
          </span>
        </div>
        <div className="w-full mt-6 flex flex-col">
          <Button
            variant="primaryInverse"
            className="w-full mb-3"
            onClick={handleLogout}
          >
            <span className="">Log out</span>
          </Button>

          <Button
            variant="outline"
            className="w-full mb-3"
            onClick={() => handleCancel()}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </>
  );
}
