import { ShopGrid } from '@/Components/ShopGrid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard() {
    const { items = [], errors = { general: '' } } = usePage().props;

    useEffect(() => {
        console.log('Dashboard items:', items);
        if (errors && Object.keys(errors).length > 0) {
            console.error('Errors:', errors);
        }
    }, [items, errors]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Catálogo
                </h2>
            }
        >
            <Head title="Catálogo" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {errors.general && (
                        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                            <strong className="font-bold">Erro:</strong>{' '}
                            {errors.general}
                        </div>
                    )}
                    {items.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300">
                            Não há itens disponíveis.
                        </p>
                    ) : (
                        <ShopGrid items={items} errors={errors} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
