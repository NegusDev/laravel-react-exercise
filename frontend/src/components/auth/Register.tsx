import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const isLoggedIn = localStorage.getItem('auth');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/leads');
      return;
    }
  }, [isLoggedIn]);

  const options = [
    { value: 'Admin', label: "Admin" },
    { value: 'Sales Manager', label: "Sales Manager" },
    { value: 'Sales Rep', label: "Sales Rep" },
  ];




  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }

  const onUserRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget);

      const details = {
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        role: formData.get('role'),
      };

      if (details.confirmPassword !== details.password) {
        setError("Password dont match");
        toast.error("Password dont match");
        console.log(error);
      } else {
        const response: any = await createUser(details);
        if (response?.status !== 201) {
          const errors: any = response?.data?.errors || [];
          Object.values(errors).forEach((error: any) => {
            toast.error(error[0]);
          });
        } else {
          const success = response?.data || [];
          toast.success(success.message);
          setUser({
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
          navigate("/");

        }

      }

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <main className="container m-auto my-3">
      <div className="row justify-content-center align-items-center">
        <div className="col-6 shadow p-5">
          <form onSubmit={onUserRegister}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating mb-3">
              <input required={true}
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => handleChange(e)}
                value={user.email}
                name="email"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required={true}
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                value={user.password}
                name="password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required={true}
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e)}
                value={user.confirmPassword}
                name="confirmPassword"
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>
            <div className=" mb-3">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="form-control"
                required={true}
                onChange={(e) => handleChange(e)}
                value={user.role}
                name="role"
              >
                <option value="">Select</option>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default Register;

