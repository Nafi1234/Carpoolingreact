import { apiSlice } from "./apiSilice";
import { useSelector } from "react-redux";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    PublishRide: builder.mutation({
      query: ({ rideData, token }) => {
        console.log(rideData);

        return {
          url: "http://127.0.0.1:8000/publish/publishride",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: rideData,
        };
      },
    }),
    Rideavailable: builder.mutation({
      query: (availabledata) => {
        return {
          url: "http://127.0.0.1:8000/publish/rideavailable",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: availabledata,
        };
      },
    }),
    Ridedetails: builder.mutation({
      query: (token) => {
        return {
          url: "http://127.0.0.1:8000/publish/ridedetails",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    Publishridedetails: builder.mutation({
      query: (token) => {
        return {
          url: "http://127.0.0.1:8000/publish/ridedetails",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    Requestridedetail: builder.mutation({
      query: ({ token, rideId }) => {
        console.log(
          "-------------------------------------------------------------------------------"
        );
        return {
          url: `http://127.0.0.1:8000/publish/requestridedetail/${rideId}`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),

    Bookride: builder.mutation({
      query: ({ rideId, token, count }) => {
        return {
          url: "http://127.0.0.1:8000/publish/ridebook",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: { rideId: rideId, count: count },
        };
      },
    }),

    Newtoken: builder.mutation({
      query: (refresh) => {
        return {
          url: "http://127.0.0.1:8000/auth/accesstoken",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: refresh,
        };
      },
    }),
    Riderequested: builder.mutation({
      query: ({
        pickupLocation,
        dropoffLocation,
        date,
        Fare,
        passenger,
        vehicle,
        Token,
      }) => {
        return {
          url: "http://127.0.0.1:8000/publish/ridedetails",
          method: "POST",
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: pickupLocation,
          dropoffLocation,
          date,
          Fare,
          passenger,
          vehicle,
          Token,
        };
      },
    }),
    Login: builder.mutation({
      query: (formData) => {
        return {
          url: "http://127.0.0.1:8000/user/login",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        };
      },
    }),
    Wallet: builder.mutation({
      query: (Token) => {
        return {
          url: "http://127.0.0.1:8000/publish/wallet",
          method: "Get",
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    Ridepublish: builder.mutation({
      query: ({
        pickupLocation,
        dropoffLocation,
        date,
        Fare,
        passenger,
        Vechiclename,
        Registrationno,
        time,
        token,
      }) => ({
        url: "http://127.0.0.1:8000/publish/publishride",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          pickupLocation,
          dropoffLocation,
          date,
          Fare,
          passenger,
          Vechiclename,
          Registrationno,
          time,
        },
      }),
    }),
  }),
});

export const {
  usePublishRideMutation,
  useRideavailableMutation,
  useBookrideMutation,
  useNewtokenMutation,
  useRiderequestedMutation,
  useRidepublishMutation,
  useRidedetailsMutation,
  useLoginMutation,
  useRequestridedetailMutation,
  usePublishridedetailsMutation,
  useWalletMutation,
} = userApiSlice;
