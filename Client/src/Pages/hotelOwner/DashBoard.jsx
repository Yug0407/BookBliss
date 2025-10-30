import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const DashBoard = () => {
  const [dashboardData] = useState(dashboardDummyData);

  return (
    <div className="mt-16 px-6 md:px-10">
      {/* Title Section */}
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings, and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all">
          <img
            src={assets.totalBookingIcon}
            alt="total-booking-icon"
            className="h-12 w-12"
          />
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
            <p className="text-2xl font-semibold text-blue-600">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all">
          <img
            src={assets.totalRevenueIcon}
            alt="total-revenue-icon"
            className="h-12 w-12"
          />
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-semibold text-green-600">
              ${dashboardData.totalRevenue}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all">
          <img
            src={assets.totalUsersIcon || assets.totalBookingIcon}
            alt="users-icon"
            className="h-12 w-12"
          />
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Users</p>
            <p className="text-2xl font-semibold text-purple-600">
              {dashboardData.totalUsers || 128}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="mt-12 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-white">
    <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
    <p className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-medium text-gray-700">
        {dashboardData.bookings.length}
      </span>{" "}
      recent bookings
    </p>
  </div>

  {/* Table */}
  <div className="overflow-x-auto max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    <table className="min-w-full text-sm text-left border-collapse">
      {/* Table Header */}
      <thead className="bg-gray-100/80 text-gray-700 uppercase text-xs font-semibold sticky top-0 backdrop-blur-sm">
        <tr>
          <th className="py-3 px-6">User Name</th>
          <th className="py-3 px-6">Room Name</th>
          <th className="py-3 px-6 text-center">Total Amount</th>
          <th className="py-3 px-6 text-center">Payment Status</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {dashboardData.bookings.map((item, index) => (
          <tr
            key={index}
            className={`transition-all ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-blue-50/50`}
          >
            <td className="py-4 px-6 font-medium text-gray-800">
              {item.user.username}
            </td>
            <td className="py-4 px-6 text-gray-600">
              {item.room.roomType}
            </td>
            <td className="py-4 px-6 text-center font-semibold text-gray-700">
              ${item.totalPrice}
            </td>
            <td className="py-4 px-6 text-center">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full ${
                  item.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.isPaid ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
                {item.isPaid ? "Completed" : "Pending"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default DashBoard;
