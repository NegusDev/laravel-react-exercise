import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addLead } from "../../api/leadsAPI";
import useSession from "../../utils/Session";

function AddLead() {
  useSession();
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLead({ ...lead, [e.target.name]: value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget);

      const details = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
      };

      const response: any = await addLead(details);

      if (response?.status !== 201) {
        const errors: any = response?.data?.errors || [];
        Object.values(errors).forEach((error: any) => {
          toast.error(error[0]);
        });
      } else {
        const success = response?.data || [];
        toast.success(success.message);
        setLead({
          name: "",
          email: "",
          phone: "",
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate(`/leads`)}
      >Go Back</button>
      <hr />
      <div className="row justify-content-center align-items-center">
        <div className="col-6 shadow p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Add A New Lead</h1>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="e.g John Doe"
                onChange={(e) => handleChange(e)}
                value={lead.name}
                name="name"
                required={true}
              />
              <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => handleChange(e)}
                value={lead.email}
                name="email"
                required={true}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="e.g 07XXXXXX"
                onChange={(e) => handleChange(e)}
                value={lead.phone}
                name="phone"
                required={true}
              />
              <label htmlFor="floatingPassword">Phone</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );



}

export default AddLead;