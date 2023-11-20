import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition(): Promise<{
  coords: { latitude: number; longitude: number };
}> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  },
);

/*--------------------------------------------------------------- */

interface UserType {
  username: string;
  status: "loading" | "idle" | "reject";
  posisiton: { latitude: number | string; longitude: number | string };
  address: string;
  error: string;
}
const initialState: UserType = {
  username: "",
  status: "idle",
  posisiton: { latitude: "", longitude: "" },
  address: "",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAddress.fulfilled,
        (
          state,
          action: PayloadAction<{
            position: { latitude: number; longitude: number };
            address: string;
          }>,
        ) => {
          state.posisiton = action.payload.position;
          state.address = action.payload.address;
          state.status = "idle";
        },
      )
      .addCase(fetchAddress.rejected, (state) => {
        state.error = "There was a problem. Please make sure to fill the field";
        state.status = "reject";
      }),
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
