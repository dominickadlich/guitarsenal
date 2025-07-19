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
import { Link } from 'react-router-dom';

import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import SetupTable from './SetupTable';
import DeleteGuitar from './DeleteGuitar';
import { API_BASE_URL, GUITAR_ENDPOINTS, guitarSpecs } from '../constants';
import PhotoLightbox from './PhotoLightbox';
import { useState } from 'react'

function GuitarDetail() {
    const { id } = useParams();
    const url = `${API_BASE_URL}${GUITAR_ENDPOINTS.detail(id)}`;
    console.log(url)
    const { data: guitar, loading, error } = useFetch(url);
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const openLightBox = (photoIndex) => {
        setStartIndex(photoIndex);
        setLightBoxOpen(true);
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    

    return (
        <>
            <div>
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
                                            <img alt={photo.name} src={`${API_BASE_URL}${photo.image}`} className="size-full object-cover" />
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
                                {guitar.photos.map((photo, index) => (
                                <TabPanel key={photo.id}>
                                    <img
                                        // alt={photo.name}
                                        src={`${API_BASE_URL}${photo.image}`}
                                        className="aspect-square w-full object-cover sm:rounded-lg cursor-pointer hover:opacity-90"
                                        onClick={() => openLightBox(index)} 
                                    />
                                </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>
                        {lightBoxOpen && 
                            <PhotoLightbox 
                                photos={guitar.photos} 
                                initialPhotoIndex={startIndex}
                                API_BASE_URL={API_BASE_URL} 
                                open={lightBoxOpen}
                                onClose={() => setLightBoxOpen(false)}
                            />
                        }
                        
                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <div className="columns-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">{guitar.brand} {guitar.model} {guitar.number_of_strings}</h1>

                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex justify-end">
                                    <Link to={`/guitars/${guitar.id}/edit`}>
                                        <button
                                        type="button"
                                        className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                        Edit Guitar
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-white">${guitar.purchase_price}</p>
                            </div>


                            <section aria-labelledby="details-heading" className="mt-12">
                                <div className='text-2xl tracking-tight text-white'>Specs</div>
                                <h2 id="details-heading" className="sr-only">
                                    Specs
                                </h2>
                
                                <div className="mt-2">
                                    {guitarSpecs.map((spec) => (
                                        // guitar[spec.key] && ( 
                                            <div key={spec.key} className="flex justify-between py-2 border-b border-gray-200">
                                                <span className="text-sm font-medium text-white">{spec.label}:</span>
                                                <span className="text-sm text-white">{guitar[spec.key]}</span>
                                            </div>
                                        // )
                                    ))}
                                </div>
                                {guitar.additional_features && (
                                    <div className="mt-6">
                                        <h3 className="text-md font-medium text-white mb-2">Additional Features</h3>
                                        <p className="text-sm text-white">{guitar.additional_features}</p>
                                    </div>
                                )}
                            </section>

                            <section aria-labelledby="details-heading" className="mt-12">
                                <div className='text-2xl tracking-tight text-white'>String Change History</div>
                                <table className="min-w-full divide-y divide-gray-200">
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
                                         <th scope="col" className="relative py-3.5 pr-4 pl-3 text-right sm:pr-0">
                                            <Link to={`/guitars/${id}/add_string_change`} className="inline-block">
                                                <PlusIcon className="size-6 text-indigo-400 hover:text-indigo-300"/>
                                            </Link>
                                        </th>
                                        {/* <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                        </th> */}
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {guitar.setup_history?.map((setup) => (
                                        <tr key={setup.id}>
                                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-300 sm:pl-0">
                                            {setup.tuning}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">{setup.string_brand}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">{setup.string_gauge}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">{setup.string_change_date}</td>
                                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                            <Link to="#" className="text-indigo-400 hover:text-indigo-300">
                                            Edit<span className="sr-only">, {setup.tuning}</span>
                                            </Link>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </section>

                            {/* <div className='py-6'>
                                <SetupTable />
                            </div> */}
                            
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex pt-6 justify-end">
                                <DeleteGuitar
                                    guitar = { guitar }
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuitarDetail;