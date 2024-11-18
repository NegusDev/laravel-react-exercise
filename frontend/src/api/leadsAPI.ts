import axios from "axios"
import { BACKEND_API_URL } from "../constant/AppConstant"

export async function getLeads() {
  let response = null
  await axios({
    url: `${BACKEND_API_URL}/leads`,
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

export async function addLead(details: any) {
  let response = null;
  await axios({
    url: `${BACKEND_API_URL}/leads`,
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