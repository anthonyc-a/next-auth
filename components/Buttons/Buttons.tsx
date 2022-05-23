import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Buttons = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const buttonLoad = () => {
    setIsLoading(true);
  };

  if (type === "submit")
    return (
      <button type="submit" className="btn btn-primary w-100 mt-2">
        Sign in
      </button>
    );

  if (type === "google")
    return (
      <button
        className="btn btn-secondary mt-5"
        onClick={() => [signIn("google"), buttonLoad()]}
      >
        {!isLoading ? (
          <>Sign in with Google</>
        ) : (
          <>
            <span className="loader-sm"></span>
          </>
        )}
      </button>
    );

  if (type === "github")
    return (
      <button
        className="btn btn-secondary mt-3"
        onClick={() => [signIn("github"), buttonLoad()]}
      >
        {!isLoading ? (
          <>Sign in with GitHub</>
        ) : (
          <>
            <span className="loader-sm"></span>
          </>
        )}
      </button>
    );
};

export default Buttons;
