import { returnPrice } from '@/helpers';
import { Item } from '@/types';

export const ShopGrid = ({
    items,
    errors = { general: '' },
}: {
    items: Item[];
    errors: { general?: string };
}) => {
    return (
        <div className="font-inter min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
            {/* General error display */}
            {errors.general && (
                <div className="mb-6 rounded-lg border border-red-400 bg-red-100 p-4 text-red-700 shadow-md dark:border-red-600 dark:bg-red-900 dark:text-red-300">
                    <strong className="font-bold">Error:</strong>{' '}
                    {errors.general}
                </div>
            )}

            {items.length === 0 && !errors.general ? (
                <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
                    <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                        Não há itens disponíveis.
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Por favor, volte mais tarde ou tente atualizar a página.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((item) => (
                        <div
                            key={item.product_id}
                            className="flex h-full flex-col justify-between rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800"
                        >
                            <div className="mb-4 flex justify-center">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="h-48 w-full rounded-lg object-contain shadow-sm dark:fill-gray-700 dark:stroke-gray-300"
                                    onError={(e) => {
                                        const img =
                                            e.target as HTMLImageElement;
                                        img.onerror = null;
                                        if (
                                            !img.src.includes(
                                                'image-not-found-icon',
                                            )
                                        ) {
                                            img.src = `/images/image-not-found-icon.svg`;
                                            img.alt = 'Image not found';
                                        }
                                    }}
                                />
                            </div>

                            <div className="text-center">
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {item.name}
                                </h3>
                                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                    Quantity:{' '}
                                    <span className="font-medium">
                                        {item.stock}
                                    </span>
                                </p>
                                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {returnPrice(item.price)}
                                </p>
                            </div>

                            <div className="mt-5">
                                <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
