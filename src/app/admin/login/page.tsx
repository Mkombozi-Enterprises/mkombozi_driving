"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cmsLogin } from "@/app/actions/cms";
import "../admin.css";

const initial = { ok: false, error: undefined as string | undefined };

export default function CmsLoginPage() {
  const router = useRouter();
  const [state, action, pending] = useActionState(cmsLogin, initial);

  useEffect(() => {
    if (state.ok) router.replace("/admin");
  }, [state.ok, router]);

  return (
    <div className="cms-login">
      <form className="cms-login-card" action={action}>
        <h1>Mkombozi CMS</h1>
        <p>
          Edit site content without a separate backend. Default password is in{" "}
          <code>ADMIN_PASSWORD</code> (or <code>mkombozi-admin</code> in dev).
        </p>
        {state.error ? (
          <div className="cms-banner err" role="alert">
            {state.error}
          </div>
        ) : null}
        <div className="cms-field">
          <label htmlFor="password">Admin password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>
        <button className="cms-btn cms-btn-primary" type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
