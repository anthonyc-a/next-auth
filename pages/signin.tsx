import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

const SignIn = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = userCredentials;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!session) {
      try {
        const result: any = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });

        setIsLoading(false);
        setErrorMessage(result.error);

        if (!result.error) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
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
            <button
              className="btn btn-secondary"
              onClick={() => {
                signIn("google");
              }}
            >
              Sign in with Google
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
