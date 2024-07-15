// "use client";
// import axios from "axios";
// import { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { userBasicInfoState } from "@/store/atoms/user-atom";
// import { useState } from "react";
// import { getSession, verifyGoogleAuthUser } from "@/actions/authActions";
// import { auth } from "@/auth";
// export const useValidateToken = () => {
//   const [user, setUser] = useRecoilState(userBasicInfoState);
//   const [isValid, setIsValid] = useState({ status: false, message: "" });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token"); // Use sessionStorage instead of localStorage

//     const validate = async () => {
//       try {
//         const s = await getSession();
//          console.log(s)
//         if (s?.user?.email) {
//           console.log(s.user.email);
//           const { status, message, user } = await verifyGoogleAuthUser(s);
//           setIsValid({ status, message });
//           setUser((prev) => ({ ...prev, ...user }));
//         } else if (token) {
//           const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/validateToken`,
//             { token }
//           );
//           if (res.data?.name) {
//             setUser((prev) => ({ ...prev, ...res.data }));
//             setIsValid({ status: true, message: "" });
//           } else {
//             setIsValid({
//               status: false,
//               message: "Your token has expired, need login ",
//             });
//           }
//         } else {
//           setIsValid({ status: false, message: "You need to authenticate..." });
//         }
//       } catch (error) {
//         console.error("Error during token validation:", error);
//         setIsValid({
//           status: false,
//           message: "An error occurred during validation.",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     validate();
//   }, []);

//    return (
//     <AuthContext.Provider value={{ user, isValid, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );;
// };
// export const useAuth = () => useContext(AuthContext);
// export const useValidateToken = async () => {
//   console.log("usevalidate is running");
//   const [user, setUser] = useRecoilState(userBasicInfoState);
//   const [isValid, setIsValid] = useState({ status: false, message: "" });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token"); // Use sessionStorage instead of localStorage

//     const validate = async () => {
//       const s = await getSession();

//       if (s?.user?.email) {
//         console.log(s.user.email);
//         const { status, message, user } = await verifyGoogleAuthUser();
//         setIsValid({ status, message });
//         setIsLoading(false);
//         setUser((prev) => ({ ...prev, ...user }));
//       }

//       if (!token) {
//         setIsValid(() => ({
//           status: false,
//           message: "you need to Authenticate...",
//         }));
//         setIsLoading(false);
//       }
//       if (user.name) {
//         setIsValid(() => ({ status: true, message: "" }));
//         setIsLoading(false);
//       }
//       if (!user.name && token) {
//         console.log(
//           process.env.NEXT_PUBLIC_SOCKET_SERVER_URL,
//           "env variable from frontend "
//         );
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/validateToken`,
//           { token }
//         );
//         if (res.data?.name) {
//           setUser((prev) => ({ ...prev, ...res.data }));
//           console.log("got user in data user token is valid ");
//           setIsValid(() => ({ status: true, message: "" }));
//           setIsLoading(false);
//         } else {
//           setIsValid(() => ({
//             status: false,
//             message: "Your token has expired, need login ",
//           }));
//           setIsLoading(false);
//         }
//       }
//     };
//     validate();
//   }, []);
//   return { isValid, isLoading };
// };
