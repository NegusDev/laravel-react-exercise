import axios from "axios";
import { BACKEND_API_URL } from "../constant/AppConstant";

export async function scheduleFollowUp(details: any) {
  let response = null;
  await axios({
    url: `${BACKEND_API_URL}/followups`,
    headers: {
      Accept: 'application/json'
    },
    method: 'POST',
    data: details
  })
  .then((res) => {
    response = res
  })
  .catch((e) => {
    response = e.response
  })

  return response;
}

export async function getLeadFollowUps(leadId: number) {
  let response = null
  await axios({
    url: `${BACKEND_API_URL}/followups/${leadId}`,
    headers: {
      Accept: 'application/json',
    },
    method: 'GET'
  })
    .then((res) => {
      response = res.data
    })
    .catch((e) => {
      response = e.response
    })
  return response 
}

export async function changeFollowUpStatus(details: { status: string; role: string; }, id: number) {
  let response = null
  await axios({
    url: `${BACKEND_API_URL}/followups/${id}/status`,
    headers: {
      Accept: 'application/json',
    },
    method: 'PUT',
    data: details
  })
    .then((res) => {
      response = res.data
    })
    .catch((e) => {
      response = e.response
    })
  return response 
}