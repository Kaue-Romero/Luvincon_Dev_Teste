import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [message, setMessage] = useState<{
        type: string;
        text: string;
    } | null>(null);

    useEffect(() => {
        if (flash && flash.success) {
            setMessage({ type: 'success', text: flash.success });
        } else if (flash && flash.error) {
            setMessage({ type: 'error', text: flash.error });
        }

        if (flash && (flash.success || flash.error)) {
            const timeout = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [flash]);

    if (!message) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 max-w-sm transform rounded border px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ease-in-out ${
                message.type === 'success'
                    ? 'border-green-300 bg-green-100 text-green-800'
                    : 'border-red-300 bg-red-100 text-red-800'
            } `}
        >
            {message.text}
            <button
                className="absolute right-1 top-1 text-lg font-bold text-gray-500 hover:text-gray-700"
                onClick={() => setMessage(null)}
            >
                &times;
            </button>
        </div>
    );
}
