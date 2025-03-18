import React, { useState } from "react";
import { CheckCircle, XCircle, UserCheck, DollarSign, ShoppingBag, BarChart2, Users, Search } from "lucide-react";

const AdminDashboard = () => {
  const [artisans, setArtisans] = useState([
    { id: 1, name: "Satyam Kesarwani", verified: false, products: 12, revenue: 1250, joinedDate: "2024-06-15" },
    { id: 2, name: "Sarafaraj Nasardi", verified: true, products: 8, revenue: 975, joinedDate: "2024-05-20" },
    { id: 3, name: "Meera Patel", verified: false, products: 15, revenue: 2100, joinedDate: "2024-07-02" },
    { id: 4, name: "Rajiv Kumar", verified: true, products: 6, revenue: 850, joinedDate: "2024-04-10" },
  ]);

  const [sales, setSales] = useState([
    { id: 1, product: "Handwoven Scarf", amount: 25, artisan: "Satyam Kesarwani", date: "2024-08-01", status: "Completed" },
    { id: 2, product: "Bamboo Basket", amount: 40, artisan: "Sarafaraj Nasardi", date: "2024-08-02", status: "Completed" },
    { id: 3, product: "Terracotta Pot", amount: 35, artisan: "Meera Patel", date: "2024-08-03", status: "Processing" },
    { id: 4, product: "Handmade Jewelry", amount: 55, artisan: "Rajiv Kumar", date: "2024-08-03", status: "Completed" },
  ]);

  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationNote, setVerificationNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate dashboard metrics
  const totalArtisans = artisans.length;
  const verifiedArtisans = artisans.filter(a => a.verified).length;
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalProducts = artisans.reduce((sum, artisan) => sum + artisan.products, 0);

  const verifyArtisan = (id) => {
    setArtisans(
      artisans.map((artisan) =>
        artisan.id === id ? { ...artisan, verified: true } : artisan
      )
    );
    setShowVerificationModal(false);
    setVerificationNote("");
  };

  const openVerificationModal = (artisan) => {
    setSelectedArtisan(artisan);
    setShowVerificationModal(true);
  };

  const filteredArtisans = artisans.filter(artisan => 
    artisan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Artisans</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{totalArtisans}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Verified Artisans</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{verifiedArtisans}</div>
                      <div className="ml-2 text-sm font-medium text-green-600">
                        {Math.round((verifiedArtisans / totalArtisans) * 100)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{totalProducts}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <DollarSign className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">${totalSales}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Artisan Verification */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex flex-wrap justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <UserCheck className="mr-2 h-5 w-5 text-amber-600" />
                  Artisan Verification
                </h3>
                <div className="mt-2 sm:mt-0 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search artisans"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artisan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArtisans.map((artisan) => (
                    <tr key={artisan.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-amber-700 font-medium">
                              {artisan.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{artisan.name}</div>
                            <div className="text-sm text-gray-500">Joined {new Date(artisan.joinedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {artisan.verified ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-4 w-4" /> Verified
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            <XCircle className="mr-1 h-4 w-4" /> Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {artisan.products} products
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {!artisan.verified && (
                          <button
                            onClick={() => openVerificationModal(artisan)}
                            className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md transition-colors duration-150"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Overview */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-amber-600" />
                Sales Overview
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artisan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sale.product}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{sale.artisan}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${sale.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
                    <UserCheck className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Verify Artisan: {selectedArtisan.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to verify this artisan? This action will approve them to sell products on the platform.
                      </p>
                      <div className="mt-4">
                        <label htmlFor="verification-note" className="block text-sm font-medium text-gray-700">
                          Verification Note (Optional)
                        </label>
                        <textarea
                          id="verification-note"
                          name="verification-note"
                          rows="3"
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Add notes about verification (ID checked, quality standards met, etc.)"
                          value={verificationNote}
                          onChange={(e) => setVerificationNote(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => verifyArtisan(selectedArtisan.id)}
                >
                  Verify Artisan
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowVerificationModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;