import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const isLoggedIn = localStorage.getItem('auth');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/leads');
      return;
    }
  }, [isLoggedIn])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }

  const authenticateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget);

      const details = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const response: any = await loginUser(details);

      if (response?.status !== 200) {
        const res: any = response?.data;
        if (res.errors) {
          Object.values(res.errors).forEach((error: any) => {
            setError(error[0]);
            toast.error(error[0]);
          });
        } else {
          setError(res.message);
          toast.error(res.message);
        }
      } else {
        const success = response?.data || [];

        const authData = {
          userId: success?.data?.id || "",
          email: success?.data?.email,
          role: success?.data?.role
        }
        localStorage.setItem('auth', JSON.stringify(authData));
        toast.success(success.message);
        setUser({
          email: "",
          password: "",
        });
        navigate("/leads");

      }



    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <main className="container m-auto my-3">
      <div className="row justify-content-center align-items-center">
        <div className="col-6 shadow p-5">
          <form onSubmit={authenticateUser}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => handleChange(e)}
                value={user.email}
                name="email"
                required={true}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                value={user.password}
                name="password"
                required={true}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Login;