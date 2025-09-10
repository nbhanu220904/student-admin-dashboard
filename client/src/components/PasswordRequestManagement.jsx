import React, { useState, useEffect } from "react";
import { API_URL } from "../APIURL";
import { useAuth } from "../contexts/AuthContext";
import {
  Key,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Calendar,
} from "lucide-react";

const PasswordRequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/password-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
        setError("");
      } else {
        setError("Failed to fetch password change requests");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/password-requests/${requestId}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSuccess("Password change request approved successfully!");
        fetchRequests();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to approve request");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const handleReject = async (requestId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/password-requests/${requestId}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason }),
        }
      );

      if (response.ok) {
        setSuccess("Password change request rejected");
        fetchRequests();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to reject request");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = requests.filter(
    (request) => filterStatus === "" || request.status === filterStatus
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Key className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Password Change Requests</h2>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={fetchRequests}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
          <span className="mr-2">✅</span>
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <span className="mr-2">❌</span>
          {error}
        </div>
      )}

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <Key className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No password change requests
          </h3>
          <p className="text-gray-500">
            {filterStatus
              ? "No requests found with the selected status."
              : "No password change requests have been submitted yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.studentName || "Unknown Student"}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>{request.studentEmail || "No email"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {(request.status || "unknown").charAt(0).toUpperCase() +
                      (request.status || "unknown").slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Reason for Password Change:
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {request.reason || "No reason provided"}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Requested:{" "}
                    {request.requestedAt
                      ? new Date(request.requestedAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>

                {request.processedAt && (
                  <div className="flex items-center space-x-2">
                    <span>
                      Processed:{" "}
                      {request.processedAt
                        ? new Date(request.processedAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                    {request.adminName && <span>by {request.adminName}</span>}
                  </div>
                )}
              </div>

              {request.status === "pending" && (
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordRequestManagement;
