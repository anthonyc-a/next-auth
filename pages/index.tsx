import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container, Toast } from "react-bootstrap";

const Home = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  const router = useRouter();

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  return (
    <Container className="d-flex flex-column align-items-center p-4 vh-100">
      <ButtonGroup>
        <Button
          className={`me-2 rounded ${showA && "disabled"}`}
          onClick={() => {
            setShowA(true);
          }}
        >
          Account details
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

      <Toast
        show={showA}
        onClose={toggleShowA}
        className="position-fixed bottom-0 end-0 mb-2 me-2"
      >
        <Toast.Header>
          <img
            src={session?.user?.image!}
            alt="avatar"
            className="rounded me-2 w-25"
          />
          <strong className="me-auto">{session?.user?.name!}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className="d-flex justify-content-center">
          {session?.user?.email}
        </Toast.Body>
      </Toast>

      <div className="jumbotron position-absolute top-50 start-50 translate-middle">
        <h1 className="display-4">Hello {session?.user?.name!}</h1>
      </div>
    </Container>
  );
};

export default Home;
