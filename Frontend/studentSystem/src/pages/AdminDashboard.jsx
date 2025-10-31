import { useState, useEffect } from "react";
import { Check, X, Users, UserCheck, Filter, Mail, Calendar, Clock, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [filter, setFilter] = useState("ALL"); // ALL, STUDENT, TEACHER
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch pending users from backend
  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/admin/pending-users');
      
      if (response.ok) {
        const users = await response.json();
        // Filter users with PENDING approval status
        const pendingUsers = users.filter(user => 
          user.approvalStatus === "PENDING" || 
          (user.approvalStatus === undefined && !user.isApproved)
        );
        setPendingUsers(pendingUsers);
      } else {
        setMessage("Failed to fetch pending users");
      }
    } catch (error) {
      setMessage("Network error. Please check backend connection.");
      console.error('Error fetching pending users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  // Handle user approval
  const handleApprove = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/approve/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "User approved successfully!");
        // Remove user from the list
        setPendingUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        setMessage(data.message || "Failed to approve user");
      }
    } catch (error) {
      setMessage("Network error during approval");
      console.error('Approval error:', error);
    }
  };

  // Handle user rejection
  const handleReject = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/reject/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "User rejected successfully!");
        // Remove user from the list
        setPendingUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        setMessage(data.message || "Failed to reject user");
      }
    } catch (error) {
      setMessage("Network error during rejection");
      console.error('Rejection error:', error);
    }
  };

  // Filter users based on selected filter
  const filteredUsers = pendingUsers.filter(user => {
    if (filter === "ALL") return true;
    return user.role === filter;
  });

  // Count users by type
  const studentCount = pendingUsers.filter(user => user.role === "STUDENT").length;
  const teacherCount = pendingUsers.filter(user => user.role === "TEACHER").length;
  const totalCount = pendingUsers.length;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Get status badge color
  const getStatusBadge = (user) => {
    if (user.approvalStatus === "PENDING") {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        icon: <Clock className="w-3 h-3" />,
        label: "Pending Approval"
      };
    }
    if (user.approvalStatus === "APPROVED" || user.isApproved) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800", 
        icon: <Check className="w-3 h-3" />,
        label: "Approved"
      };
    }
    if (user.approvalStatus === "REJECTED") {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        icon: <X className="w-3 h-3" />,
        label: "Rejected"
      };
    }
    return {
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      icon: <AlertCircle className="w-3 h-3" />,
      label: "Unknown"
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <UserCheck className="w-6 h-6" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage user approvals</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Pending Approvals</div>
                <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Total Pending</div>
                <div className="text-2xl font-bold text-gray-800">{totalCount}</div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Pending Students</div>
                <div className="text-2xl font-bold text-green-600">{studentCount}</div>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Pending Teachers</div>
                <div className="text-2xl font-bold text-purple-600">{teacherCount}</div>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-lg font-bold text-yellow-600">Pending Review</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm text-center mb-4 ${
              message.includes("successfully") || message.includes("approved") || message.includes("rejected")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            {["ALL", "STUDENT", "TEACHER"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === filterType
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filterType === "ALL" ? "All Users" : filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading pending users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No pending users</h3>
              <p className="text-gray-500 mt-1">
                {filter === "ALL" 
                  ? "All users have been processed." 
                  : `No pending ${filter.toLowerCase()}s found.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role & Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const statusBadge = getStatusBadge(user);
                    return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <Mail className="w-4 h-4" />
                              {user.email}
                            </div>
                            {(user.studentId || user.employeeId) && (
                              <div className="text-xs text-gray-400 mt-1">
                                ID: {user.studentId || user.employeeId}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              user.role === "STUDENT"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {user.role}
                          </span>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusBadge.bgColor} ${statusBadge.textColor}`}>
                            {statusBadge.icon}
                            {statusBadge.label}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchPendingUsers}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto disabled:bg-blue-400"
          >
            <Users className="w-4 h-4" />
            {loading ? "Refreshing..." : "Refresh List"}
          </button>
        </div>

        {/* Entity Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">User Entity Fields:</h4>
          <div className="text-xs text-blue-600 space-y-1">
            <div><code className="bg-blue-100 px-1 rounded">id</code> - User ID</div>
            <div><code className="bg-blue-100 px-1 rounded">fullName</code> - Full name</div>
            <div><code className="bg-blue-100 px-1 rounded">email</code> - Email address</div>
            <div><code className="bg-blue-100 px-1 rounded">role</code> - STUDENT/TEACHER</div>
            <div><code className="bg-blue-100 px-1 rounded">approvalStatus</code> - PENDING/APPROVED/REJECTED</div>
            <div><code className="bg-blue-100 px-1 rounded">isApproved</code> - Boolean approval flag</div>
            <div><code className="bg-blue-100 px-1 rounded">createdAt</code> - Registration timestamp</div>
          </div>
        </div>
      </div>
    </div>
  );
}