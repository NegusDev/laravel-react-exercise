import { useLocation, useNavigate } from "react-router-dom";
import useSession from "../../../utils/Session";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { scheduleFollowUp } from "../../../api/followUpAPI";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function ScheduleFollowUp() {
  useSession();
  const navigate  = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lead, setLead] = useState<Lead>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });
  const [followUp, setFollowUp] = useState({
    leadId: lead.id,
    scheduledAt: "",
  })

  useEffect(() => {
    if (location.state) {
      const { id, name, email, phone } = location.state.lead as Lead;
      setLead({ id, name, email, phone });
      setFollowUp((prev) => ({
        ...prev,
        leadId: id,
      }));
    }
  }, [location.state])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFollowUp({ ...followUp, [e.target.name]: value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget);

      const details = {
        lead_id: formData.get('lead_id'),
        scheduledAt: formData.get('scheduledAt'),
      }

      const response: any = await scheduleFollowUp(details);

      if (response?.status !== 201) {
        const errors: any = response?.data?.errors || [];
        toast.error(errors);
      } else {
        const success = response?.data || [];
        toast.success(success.message);
        setFollowUp({
          leadId: lead.id,
          scheduledAt: "",
        });
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
            <h1 className="h3 mb-3 fw-normal text-capitalize">Schedule A follow-Up for {lead.name}</h1>
            <input
              type="hidden"
              onChange={(e) => handleChange(e)}
              value={followUp.leadId}
              name="lead_id"
              required={true}
            />
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingInput"
                onChange={(e) => handleChange(e)}
                value={followUp.scheduledAt}
                name="scheduledAt"
                required={true}
              />
              <label htmlFor="floatingInput">Follow Up Date</label>
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

export default ScheduleFollowUp;