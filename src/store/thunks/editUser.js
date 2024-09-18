import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editUser = createAsyncThunk("users/edit", async (user) => {
  const response = await axios.put(`http://localhost:3005/users/${user.id}`, {
    id: user.id,
    name: user.name,
  });

  await pause(1500);

  return response.data;
});

//slow requests for testing
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { editUser };
