import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, getSession, signOut } from "next-auth/react";
import { Container } from "react-bootstrap";

const Account = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session: any) => {
      if (session) {
        if (session.user.username) {
          router.replace("/");
        } else {
          setIsLoading(false);
        }
      }

      if (!session) {
        router.replace("/");
      }
    });
  }, [router]);

  const email = session && session?.user?.email!;
  const [userCredentials, setUserCredentials] = useState({
    first: session?.user?.first!,
    last: session?.user?.last!,
    age: session?.user?.age!,
  });

  console.log(userCredentials);

  const { first, last, age } = userCredentials;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first: first,
          last: last,
          age: age,
          account: email,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");
      console.log(data.message);

      alert("Sign in again to see changes");
      signOut();
    } catch (error) {
      console.log(error);
    }

    router.push("/");
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  if (isLoading) return <div className="loader">loading...</div>;

  if (session)
    return (
      <Container className="d-flex flex-column align-items-center p-4 vh-100">
        <h1>Account details</h1>
        <Container className="mt-5">
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                First name:{" "}
                <input
                  type="text"
                  name="first"
                  value={first}
                  defaultValue={
                    session?.user?.name
                      ? session?.user?.name!
                      : session?.user?.first!
                  }
                  onChange={handleChange}
                />
              </li>
              <li>
                Last name:{" "}
                {session?.user?.last ? (
                  <input
                    type="text"
                    name="last"
                    value={last}
                    defaultValue={session?.user?.last}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <input
                      type="text"
                      value={last}
                      name="last"
                      onChange={handleChange}
                    />
                  </>
                )}
              </li>
              <li>
                Age:{" "}
                {session?.user?.age ? (
                  <input
                    type="text"
                    name="age"
                    value={age}
                    defaultValue={session?.user?.age}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <input
                      type="text"
                      value={age}
                      name="age"
                      onChange={handleChange}
                    />
                  </>
                )}
              </li>
            </ul>
            <button type="submit">update account details</button>
          </form>
        </Container>
      </Container>
    );
};

export default Account;
