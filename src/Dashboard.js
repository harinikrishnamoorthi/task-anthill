import UploadCar from "./UploadCar";
import CarsList from "./CarsList";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🚘 Welcome to CarNova Dashboard</h1>
      <UploadCar />
      <CarsList />
    </div>
  );
};

export default Dashboard;
