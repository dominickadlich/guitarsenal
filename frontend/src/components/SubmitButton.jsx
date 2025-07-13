import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <div className='flex justify-end'>
            <button
                type="submit"
                disabled={pending}
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                {pending ? 'Submit' : 'Submit'} Guitar
            </button>
        </div>
    );
}

export default SubmitButton;


    