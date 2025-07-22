import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import FuzzyText from "./Components/FuzzyText";
export default function PrivateRouteFaramer() {
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);
  const [auth, setAuth] = useState<null | boolean>(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/farmerDashbord", {
        withCredentials: true,
      })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);
  if (auth) return <Outlet />;
  else
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#111",
        }}
      >
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
        >
          Unautherised: 401
        </FuzzyText>
      </div>
    );
}
