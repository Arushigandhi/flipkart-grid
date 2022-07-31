import SimpleForm from "components/ChatBot";
import DashboardLayout from "components/DashboardLayout";
import React from "react";

export default function dashboard() {
  return (
    <DashboardLayout title="hello">
      <SimpleForm />
    </DashboardLayout>
  );
}
