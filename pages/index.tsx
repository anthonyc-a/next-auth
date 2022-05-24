import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container, Toast } from "react-bootstrap";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: searchValue,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center p-4 vh-100">
      <ButtonGroup>
        {session && (
          <Button
            className={`me-2 rounded ${showA && "disabled"}`}
            onClick={() => {
              setShowA(true);
            }}
          >
            Profile
          </Button>
        )}

        {session && (
          <Button
            className={"me-2 rounded"}
            onClick={() => {
              alert(JSON.stringify(session?.user, null, 2));
            }}
          >
            User object
          </Button>
        )}

        {session && (
          <Button
            className="me-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              router.push("/account");
            }}
          >
            Account details
          </Button>
        )}

        <Button
          className="me-2 rounded"
          onClick={(e) => {
            e.preventDefault();
            setShowSearch(!showSearch);
          }}
        >
          Search
        </Button>

        {!session && (
          <Button
            className="me-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              router.push("/signin");
            }}
          >
            Sign in
          </Button>
        )}

        {!session && (
          <Button
            className="me-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              router.push("signup");
            }}
          >
            Sign up
          </Button>
        )}

        {session && (
          <Button
            className="me-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </Button>
        )}
      </ButtonGroup>

      {session && (
        <Toast
          show={showA}
          onClose={toggleShowA}
          className="position-fixed bottom-0 end-0 mb-2 me-2"
        >
          <Toast.Header>
            {session?.user?.image! ? (
              <img
                src={session?.user?.image!}
                alt="avatar"
                className="rounded me-2 w-25"
              />
            ) : (
              <img
                src="https://st3.depositphotos.com/6672868/13701/v/380/depositphotos_137014128-stock-illustration-user-profile-icon.jpg?forcejpeg=true"
                alt="avatar"
                className="rounded me-2 w-25"
              />
            )}
            <strong className="me-auto">
              {session?.user?.name
                ? session?.user?.name!
                : session?.user?.first!}
            </strong>
          </Toast.Header>
          <Toast.Body>{session?.user?.email}</Toast.Body>
        </Toast>
      )}

      <div className="jumbotron position-absolute top-50 start-50 translate-middle">
        <h1 className="display-4">
          Hello{" "}
          {session?.user?.name ? session?.user?.name! : session?.user?.first!}
        </h1>
      </div>

      {showSearch && (
        <div className="search">
          <div
            className="overlay"
            onClick={() => {
              setShowSearch(false);
            }}
          ></div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search users"
            />
            <button type="submit">search</button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default Home;
