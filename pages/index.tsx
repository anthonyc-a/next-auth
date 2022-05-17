import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container, Toast } from "react-bootstrap";

const Home = () => {
  const { data: session } = useSession();

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
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
      
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </p>
      </div>
    </Container>
  );
};

export default Home;
