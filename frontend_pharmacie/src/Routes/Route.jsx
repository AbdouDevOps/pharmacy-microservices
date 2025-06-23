import { createBrowserRouter } from "react-router-dom";
import DashProfile from "../Pages/dashprofile/DashProfile.jsx";
import DashUpdateProfile from "../Pages/dashprofile/DashUpdateProfile.jsx";
import DashPayment from "../Pages/dashpayment/DashPayment.jsx";
import DashPharmacist from "../Pages/dashPharmacists/DashPharmacist.jsx";
import DashMedicamentsDatabase from "../Pages/dashmedicamentsdatabase/DashMedicamentsDatabase.jsx";
import DashAddAdmin from "../Pages/dashprofile/addadmin/DashAddAdmin.jsx";
import DashMedicament from "../Pages/dashMedicament/DashMedicament.jsx";
import Dashnotification from "../Pages/dashnotification/DashNotification.jsx";
import DashStatistique from "../Pages/dashstatistique/DashStatistique.jsx";
import DashInventory from "../Pages/dashInventory/DashInventory.jsx";
import SignInAdmin from "../Pages/Sign/SignInAdmin.jsx";
import ProtectedRoute from "../components/ProtectionRoute.jsx";
import DashPharmacistDetails from "../Pages/dashPharmacists/DashPharmacistDetails.jsx";
import MedicamentDetails from "../Pages/dashmedicamentsdatabase/filter/MedicamentDetails.tsx";
import DashMedicamentsDatabaseDetails from "../Pages/dashmedicamentsdatabase/DashMedicamentsDatabaseDetails.jsx";

export const router = createBrowserRouter([
  { path: "/signin", element: <SignInAdmin /> },
  
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <SignInAdmin /> },
      { path: "/dashAleartInventory", element: <DashPayment /> },
      { path: "/dashprofile", element: <DashProfile /> },
      { path: "/dashaddprofile", element: <DashAddAdmin /> },
      { path: "/dashupdateprofile", element: <DashUpdateProfile /> },
      { path: "/dashMedicamentsDatabase", element: <DashMedicamentsDatabase /> },
      { path: "/dashaddadmin", element: <DashAddAdmin /> },
      { path: "/dashMedicament", element: <DashMedicament /> },
      { path: "dashMedicamentsDatabase/medicamentDetails/:id", element: <DashMedicamentsDatabaseDetails /> },
      { path: "/dashnotification", element: <Dashnotification /> },
      { path: "/dashstatistiques", element: <DashStatistique /> },
      { path: "/dashpharmacists", element: <DashPharmacist /> },
      { path: `/dashrpharmacists/details/:id`, element: <DashPharmacistDetails /> },
      {path:"/dashInventory" , element: <DashInventory/>}


    ],
  },
]);
