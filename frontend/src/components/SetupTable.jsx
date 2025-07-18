import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { API_BASE_URL, GUITAR_ENDPOINTS, guitarSpecs } from '../constants';

function SetupTable() {
  const { id } = useParams();
  const url = `${API_BASE_URL}${GUITAR_ENDPOINTS.detail(id)}`;
  const { data: guitar, loading, error } = useFetch(url)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="bg-gray-900 block rounded-md overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-white">Setups</h1>
                <p className="mt-2 text-sm text-gray-300">
                  A string change history that includes tuning, string brand, and string gauge.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Add String Change
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-white sm:pl-0">
                          Tuning
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Strings
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Gauge
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Date
                        </th>
                        <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {guitar.setup_history?.map((setup) => (
                        <tr key={setup.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-white sm:pl-0">
                            {setup.tuning}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">{setup.string_brand}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">{setup.string_gauge}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">{setup.string_change_date}</td>
                          <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                            <a href="#" className="text-indigo-400 hover:text-indigo-300">
                              Edit<span className="sr-only">, {setup.tuning}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupTable;