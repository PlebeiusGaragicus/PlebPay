import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import createPaywallLink from "../../utils/createPaywallLink";

export default function CreatePaywallLink({ avatarUrl, currencies }) {
  const { query, isReady } = useRouter();
  const [paywallLink, setPaywallLink] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const paywallLink = await createPaywallLink({
      username: query.username,
      title: e.target.title.value,
      currency: currencies.find(({ isDefaultCurrency }) => isDefaultCurrency)
        ?.currency,
      amount: e.target.amount.value,
      redirectUrl: e.target.redirectUrl.value,
    });

    setPaywallLink(paywallLink);
  };

  return isReady ? (
    <div>
      {avatarUrl && (
        <Image src={avatarUrl} alt="user avatar" width="100%" height="100%" />
      )}
      <h1>{query.username}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Amount{" "}
            <input
              type="number"
              name="amount"
              step="0.01"
              style={{ width: 64 }}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Title <input name="title" style={{ width: 400 }} />
          </label>
        </div>
        <br />
        <div>
          <label>
            Redirect URL <input name="redirectUrl" style={{ width: 400 }} />
          </label>
        </div>
        <br />
        <Button>Submit</Button>
      </form>
      <br />
      {paywallLink && (
        <div>
          <h2>Paywall Link Created 🎉</h2>
          <Link href={paywallLink}>
            <a>{paywallLink}</a>
          </Link>
        </div>
      )}
    </div>
  ) : null;
}
