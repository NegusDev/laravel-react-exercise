import { useLocation, useNavigate } from "react-router-dom";
import useSession from "../../../utils/Session";
import { ChangeEvent, useEffect, useState } from "react";
import { changeFollowUpStatus, getLeadFollowUps } from "../../../api/followUpAPI";
import { toast, ToastContainer } from "react-toastify";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface FollowUp {
  id: number,
  leadId: number,
  status: string,
  scheduled_date: string
}

interface Auth {
  userId: number,
  email: string,
  role: string
}

function LeadFollowUps() {
  useSession();
  const navigate = useNavigate()
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lead, setLead] = useState<Lead>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const loggedInUser: Auth | null = JSON.parse(localStorage.getItem('auth') || 'null');
  const userRole: string = loggedInUser?.role || ""
  const authorizedRoles = ['Admin', 'Sales Manager'];
  const options = [
    { value: 'Pending', label: "Pending" },
    { value: 'Completed', label: "Completed" },
    { value: 'Missed', label: "Missed" },
  ];
  const [statusUpdate, setStatusUpdate] = useState("");

  const [statusUpdates, setStatusUpdates] = useState({});

  console.log(userRole);

  useEffect(() => {
    if (location.state && location.state.lead) {
      const { id, name, email, phone } = location.state.lead as Lead;
      setLead({ id, name, email, phone });
      fetchData(id);
    }

  }, [location.state])

  const fetchData = async (leadId: number) => {
    setLoading(true);
    try {
      const response: any = await getLeadFollowUps(leadId);
      setFollowUps(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch follow-ups.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (e: ChangeEvent<HTMLSelectElement>, followupId: number) => {
    const newStatus = e.target.value;
    if (window.confirm("Are you sure you want to change the status of this Follow-Up")) {
      const id: number = followupId;

      const details = {
        status: newStatus,
        role: userRole
      }

      setLoading(true);
      try {
        const response = await changeFollowUpStatus(details, id);

        if (response?.message?.includes("Successfully")) {
          toast.success(response?.message);

          setFollowUps((prev) =>
            prev.map((followUp) =>
              followUp.id === followupId
                ? { ...followUp, status: newStatus }
                : followUp
            )
          );

        } else {
          toast.error(response?.message);
        }

      } catch (error) {
        setError("Failed to update follow-ups.");
      } finally {
        setLoading(false);
      }

      setStatusUpdates((prev) => ({
        ...prev,
        [followupId]: newStatus,
      }));
    }

  }

  function formatDateTime(givenDate: string) {
    const date = new Date(givenDate);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);

    return formattedDate;
  }


  return (
    <main className="container py-4">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate(`/leads`)}
      >Go Back</button>
      <div className="d-flex justify-content-between align-items-center">
        <h2 ><span className="text-capitalize">Follow-Up list for {lead.name}</span> [{lead.email}]</h2>
      </div>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Scheduled Date</th>
              {authorizedRoles.includes(userRole) && <th scope="col">Change Status</th>}
            </tr>
          </thead>
          <tbody>
            {!loading && followUps.length > 0 ? (
              followUps.map((followup, index) => (
                <tr key={followup.id}>
                  <td>{index + 1}</td>
                  <td>{followup.status}</td>
                  <td>{formatDateTime(followup.scheduled_date)}</td>
                  {authorizedRoles.includes(userRole) &&
                    <td >
                      <select
                        className="form-control"
                        required={true}
                        onChange={(e) => handleChangeStatus(e, followup.id)}
                        value={statusUpdates[followup.id] || followup.status}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  }
                </tr>
              ))

            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  {loading ? "Loading..." : "No data found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </main>
  )
}

export default LeadFollowUps;