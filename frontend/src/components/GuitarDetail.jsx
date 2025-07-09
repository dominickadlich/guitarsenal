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
import SetupTable from './SetupTable';

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
                
                                {/* TODO: Additional details: body wood, neck wood, fretboard, pickups, etc. ***Need new model before implementation*** */}
                            </section>

                            <SetupTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuitarDetail;