import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  console.log(session?.user)

  return (
    <div>
      <a
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </a>
    </div>
  );
};

export default Home;
