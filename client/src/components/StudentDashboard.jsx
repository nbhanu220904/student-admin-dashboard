import React from "react";
import StudentNavBar from "./StudentNavBar";
import SideBar from "./SideBar";

const StudentDashboard = () => {
  return (
    <div>
      <StudentNavBar />
      <div>
        <SideBar />
      </div>
    </div>
  );
};

export default StudentDashboard;
