import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__kicker">Hakuna njia hii.</p>
      <h1>No road here.</h1>
      <p className="not-found__sub">
        This path doesn&apos;t lead to the yard. Let&apos;s get you back on the map.
      </p>
      <div className="not-found__actions">
        <Link href="/" className="btn btn-primary">
          Back to Mkombozi
        </Link>
        <Link href="/#contact" className="btn btn-ghost on-light">
          Enrol / contact
        </Link>
      </div>
    </main>
  );
}
