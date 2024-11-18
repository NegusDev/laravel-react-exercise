import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads } from "../../api/leadsAPI";
import useSession from "../../utils/Session";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
}


function Leads() {
  useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: any = await getLeads();
        setLeads(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, [])

  const redirect = (lead: Lead) => {
    navigate("/lead/followups", { state: { lead: lead } })
  }

  const scheduleFollowUp = (lead: Lead) => {
    navigate("/lead/schedule", { state: { lead: lead } })
  }

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Leads List</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(`/leads/add`)}
        >Add Leads</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && leads.length > 0 ? (
              leads.map((lead, index) => (
                <tr key={lead.id}>
                  <td>{index + 1}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info me-2"
                      onClick={() => redirect(lead)}
                    >
                      View Follow-Ups
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={() => scheduleFollowUp(lead)}
                    >
                      Schedule Follow-Up
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  {loading ? "Loading..." : "No data found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </main>
  );
}

export default Leads;