import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

function InputGroup({ htmlFor, id, name, type, label, placeholder, value, onChange, required = false, error }) {
    return (
        <>
            <div>
                <label htmlFor={htmlFor} className="block text-sm/6 font-medium text-gray-900">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative mt-2">
                    <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                        error
                            ? 'outline-red-300 focus:outline-red-600' 
                            : 'outline-gray-300 focus:outline-indigo-600'
                    }`}
                    />
                    {error && 
                    <>
                        <ExclamationCircleIcon
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
                        />
                        <p id="error" className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    </>
                }
                </div>
            </div>
        </>
    );
}

export default InputGroup;