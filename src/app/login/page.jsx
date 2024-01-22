"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const rounter = useRouter();

  const handleSignInAsDemo = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "demo@mail.com",
      password: "pass123",
    });

    if (!error && data && data.session) {
      rounter.push("/home");
    }

    console.log(data);
  };

  return (
    <div className="flex flex-col space-y-4 max-w-[300px]">
      <Button className="-mb-6 h-10" onClick={handleSignInAsDemo}>
        <span>Sign in as Guest</span>
      </Button>

      <Auth
        supabaseClient={supabase}
        providers={["github", "google"]}
        // redirectTo={`${getURL()}/auth/callback`}
        redirectTo="http://localhost:3000/auth/callback"
        magicLink={true}
        socialLayout="vertical"
        appearance={{
          theme: ThemeSupa,

          variables: {
            default: {
              colors: {
                brand: "#1D9BF0",
                brandAccent: "#1A8CD8",
              },
            },
          },
          mode: "dark",
          extend: true,
          className: {
            button: "!rounded-full",
            input: "!rounded-full !text-color-text-main",
          },
        }}
      />
    </div>
  );
}
