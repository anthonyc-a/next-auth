import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container, Toast } from "react-bootstrap";

const Home = () => {
  const { data: session } = useSession();

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Container className="d-flex flex-column align-items-center p-4">
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
              signIn();
            }}
          >
            Sign in
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

      <Toast show={showA} onClose={toggleShowA}>
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

      <img />
    </Container>
  );
};

export default Home;
