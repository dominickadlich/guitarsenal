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

                        {/* Image gallery */}
                        <TabGroup className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                <TabList className="grid grid-cols-4 gap-6">
                                    {guitar.photos?.map((photo) => (
                                        <Tab
                                        key={photo.id}
                                        className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
                                        >
                                        <span className="sr-only">{photo.name}</span>
                                        <span className="absolute inset-0 overflow-hidden rounded-md">
                                            <img alt="" src={`http://127.0.0.1:8000${photo.image}`} className="size-full object-cover" />
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500"
                                        />
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>
                
                            <TabPanels>
                                {guitar.photos.map((photo) => (
                                <TabPanel key={photo.id}>
                                    <img alt={photo.name} src={`http://127.0.0.1:8000${photo.image}`} className="aspect-square w-full object-cover sm:rounded-lg" />
                                </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>
                        
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