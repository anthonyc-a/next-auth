import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accepted, setAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { username, email, password, confirmPassword } = userCredentials;

  const handleClick = () => setAccepted(!accepted);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (accepted)
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Something went wrong");

        console.log(data.message);

        setUserCredentials({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        router.replace("/");
      } catch (error: any) {
        setIsLoading(false);
        setErrorMessage(error.message);
        console.log(error);
      }
    else {
      setIsLoading(false);
      console.log("Accept our privacy policy");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) return <div className="loader">loading...</div>;

  return (
    <Container className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 w- mw-100" style={{ width: "380px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={username}
              name="username"
              onChange={handleChange}
              required
              className="form-control"
              id="exampleInputUser1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              required
              className="form-control"
              id="exampleInputPassword2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              required
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              onClick={() => {
                handleClick();
              }}
              checked={accepted}
              type="checkbox"
              name="action"
              className="form-check-input"
              id="exampleCheck1"
              readOnly
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              This is required
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
