'use client';

import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewsletterForm() {
  const [nlDone, setNlDone] = useState(false);

  if (nlDone) {
    return <span className="subscribed-msg-minimal">✓ Subscribed, thank you!</span>;
  }

  return (
    <form className="newsletter-form-minimal" onSubmit={(e) => { e.preventDefault(); setNlDone(true); }}>
      <div className="input-group-minimal">
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="Enter your email address"
          className="minimal-input"
        />
        <button type="submit" className="newsletter-btn-blue">
          Subscribe
        </button>
      </div>
      <p className="terms-text-minimal">
        By clicking &apos;Subscribe&apos; you&apos;re confirming that you agree with our{" "}
        <Link to="/terms" className="font-bold cursor-pointer hover:underline text-inherit">
          Terms and Conditions
        </Link>
        .
      </p>
    </form>
  );
}
