import axios from "axios";
import { BACKEND_API_URL } from "../constant/AppConstant";


export async function createUser(user: { email: FormDataEntryValue | null; password: FormDataEntryValue | null; confirmPassword: FormDataEntryValue | null; role: FormDataEntryValue | null; }) {
  let response = null;
  await axios({
    url: `${BACKEND_API_URL}/register`,
    headers: {
      Accept: 'application/json'
    },
    method: 'POST',
    data: user
  })
  .then((res) => {
    response = res
  })
  .catch((e) => {
    response = e.response
  })

  return response;
}

export async function loginUser(user: { email: FormDataEntryValue | null; password: FormDataEntryValue | null; }) {
  let response = null;
  await axios({
    url: `${BACKEND_API_URL}/login`,
    headers: {
      Accept: 'application/json'
    },
    method: 'POST',
    data: user
  })
  .then((res) => {
    response = res
  })
  .catch((e) => {
    response = e.response
  })

  return response;
}