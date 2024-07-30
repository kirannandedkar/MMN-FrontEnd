import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Grants", link: "#" },
];

const applications = [
  {
    srNo: 1,
    application: "MMN Frivillige Application",
    year: "November 2021",
    kommune: "",
    status: "Granted",
    amount: "",
  },
  {
    srNo: 2,
    application: "Grant Application by MMN",
    year: "February 2022",
    kommune: "Oslo",
    status: "Declined",
    amount: "",
  },
  {
    srNo: 3,
    application: "Grant Application by MMN",
    year: "March 2022",
    kommune: "Asker",
    status: "Granted",
    amount: "17500",
  },
  {
    srNo: 4,
    application: "Grant Application by MMN",
    year: "February 2023",
    kommune: "Oslo",
    status: "Granted",
    amount: "38400",
  },
  {
    srNo: 5,
    application: "Grant Application by MMN",
    year: "March 2023",
    kommune: "Asker",
    status: "Declined",
    amount: "",
  },
  {
    srNo: 6,
    application: "Grant Application by MMN",
    year: "February 2024",
    kommune: "Oslo",
    status: "Granted",
    amount: "88000",
  },
  {
    srNo: 7,
    application: "Grant Application by MMN",
    year: "March 2024",
    kommune: "Asker",
    status: "Granted",
    amount: "26000",
  },
  {
    srNo: 8,
    application: "Grant Application by MMN",
    year: "April 2024",
    kommune: "Oslo",
    status: "Granted",
    amount: "15000",
  },
];

const ApplicationTable = () => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-[#FF5733] text-white ">
          <th className="py-2 px-4 text-center border border-gray-300">
            Sr.no
          </th>
          <th className="py-2 px-4 text-left border border-gray-300">
            Application
          </th>
          <th className="py-2 px-4 text-left border border-gray-300">Year</th>
          <th className="py-2 px-4 text-left border border-gray-300">
            Kommune
          </th>
          <th className="py-2 px-4 text-left border border-gray-300">Status</th>
          <th className="py-2 px-4 text-left border border-gray-300">
            Amount (NOK)
          </th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <tr
            key={index}
            style={{
              backgroundColor:
                (index + 1) % 2 === 1 ? "#fdf2f2" : "transparent",
            }}
            className="border-b bg-red-50"
          >
            <td className="py-2 px-4 text-center border border-gray-300">
              {app.srNo}
            </td>
            <td className="py-2 px-4 border border-gray-300">
              {app.application}
            </td>
            <td className="py-2 px-4 border border-gray-300">{app.year}</td>
            <td className="py-2 px-4 border border-gray-300">{app.kommune}</td>
            <td
              className={`py-2 px-4 border border-gray-300 ${
                app.status === "Granted" ? "text-green-500" : "text-red-500"
              }`}
            >
              {app.status}
            </td>
            <td className="py-2 px-4 border border-gray-300">{app.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;
