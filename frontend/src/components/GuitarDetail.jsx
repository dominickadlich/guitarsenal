import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

function GuitarDetail() {
    const { id } = useParams();
    const url = `http://127.0.0.1:8000/guitars/${id}`;
    const { data: guitar, loading, error } = useFetch(url)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        
                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{guitar.brand} {guitar.model} {guitar.number_of_strings}</h1>

                            <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">${guitar.purchase_price}</p>
                            </div>

                            <section aria-labelledby="details-heading" className="mt-12">
                                <h2 id="details-heading" className="sr-only">
                                Additional details
                                </h2>
                
                                <div className="divide-y divide-gray-200 border-t border-gray-200">
                                    <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
                                        {guitar.setup_history?.map((setup) => (
                                            <div key={setup.id} className="pl-2">
                                                <li>Tuning: {setup.tuning}</li>
                                                <li>Strings: {setup.string_brand}</li>
                                                <li>Gauge: {setup.string_gauge}</li>
                                                <li>Last String Change: {setup.string_change_date}</li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuitarDetail;