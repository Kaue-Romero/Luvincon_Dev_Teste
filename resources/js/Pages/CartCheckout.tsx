import { useCart } from '@/Contexts/CartContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function CartCheckout() {
    const { state } = useCart();
    const { items } = state;

    const totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const { data, setData, post, processing, errors } = useForm({
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: '',
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/checkout'); // Route to handle the checkout in Laravel
    };

    useEffect(() => {
        console.log('Cart items:', state.items);
    }, [state]);

    return (
        <AuthenticatedLayout>
            <Head title="Carrinho" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <div className="space-y-4 lg:col-span-2">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                        Seu Carrinho
                                    </h2>

                                    {items.length === 0 ? (
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Seu carrinho está vazio.
                                        </p>
                                    ) : (
                                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {items.map((item) => (
                                                <li
                                                    key={item.product_id}
                                                    className="flex items-center justify-between py-4"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.name}
                                                            className="h-20 w-20 rounded object-contain"
                                                            onError={(e) => {
                                                                const target =
                                                                    e.target as HTMLImageElement;
                                                                target.onerror =
                                                                    null;
                                                                target.src =
                                                                    '/images/image-not-found-icon.svg';
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Quantidade:{' '}
                                                                {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                            R${' '}
                                                            {(
                                                                item.price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Unitário: R${' '}
                                                            {item.price.toFixed(
                                                                2,
                                                            )}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="h-fit rounded bg-white p-6 shadow dark:bg-gray-800"
                                >
                                    {/* Credit Card Fields */}
                                    <div className="mb-6 space-y-4">
                                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                                            Dados do Cartão
                                        </h4>

                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={data.cardNumber}
                                            onChange={(e) =>
                                                setData(
                                                    'cardNumber',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Número do cartão"
                                            className="w-full rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-sm text-red-500">
                                                {errors.cardNumber}
                                            </p>
                                        )}

                                        <input
                                            type="text"
                                            name="cardName"
                                            value={data.cardName}
                                            onChange={(e) =>
                                                setData(
                                                    'cardName',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nome impresso no cartão"
                                            className="w-full rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.cardName && (
                                            <p className="text-sm text-red-500">
                                                {errors.cardName}
                                            </p>
                                        )}

                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={data.cardExpiry}
                                                onChange={(e) =>
                                                    setData(
                                                        'cardExpiry',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Validade (MM/AA)"
                                                className="w-1/2 rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                            />
                                            <input
                                                type="text"
                                                name="cardCvv"
                                                value={data.cardCvv}
                                                onChange={(e) =>
                                                    setData(
                                                        'cardCvv',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="CVV"
                                                className="w-1/2 rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        {(errors.cardExpiry ||
                                            errors.cardCvv) && (
                                            <p className="text-sm text-red-500">
                                                {errors.cardExpiry ||
                                                    errors.cardCvv}
                                            </p>
                                        )}
                                    </div>

                                    {/* Address Fields */}
                                    <div className="mb-6 space-y-4">
                                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                                            Endereço de Entrega
                                        </h4>

                                        <input
                                            type="text"
                                            name="cep"
                                            value={data.cep}
                                            onChange={(e) =>
                                                setData('cep', e.target.value)
                                            }
                                            placeholder="CEP"
                                            className="w-full rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.cep && (
                                            <p className="text-sm text-red-500">
                                                {errors.cep}
                                            </p>
                                        )}

                                        <input
                                            type="text"
                                            name="street"
                                            value={data.street}
                                            onChange={(e) =>
                                                setData(
                                                    'street',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Rua"
                                            className="w-full rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.street && (
                                            <p className="text-sm text-red-500">
                                                {errors.street}
                                            </p>
                                        )}

                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                name="number"
                                                value={data.number}
                                                onChange={(e) =>
                                                    setData(
                                                        'number',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Número"
                                                className="w-1/2 rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                            />
                                            <input
                                                type="text"
                                                name="neighborhood"
                                                value={data.neighborhood}
                                                onChange={(e) =>
                                                    setData(
                                                        'neighborhood',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Bairro"
                                                className="w-1/2 rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                name="city"
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        'city',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Cidade"
                                                className="w-1/2 rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                            />
                                            <input
                                                type="text"
                                                name="state"
                                                value={data.state}
                                                onChange={(e) =>
                                                    setData(
                                                        'state',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="UF"
                                                className="w-1/2 rounded border px-4 py-2 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        Resumo do Pedido
                                    </h3>

                                    {/* Summary */}
                                    <div className="mb-6 space-y-2 text-gray-700 dark:text-gray-200">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>
                                                R$ {totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Frete</span>
                                            <span>R$ 0.00</span>
                                        </div>
                                        <hr className="my-2 border-gray-300 dark:border-gray-600" />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>
                                                R$ {totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Processando...'
                                            : 'Finalizar Compra'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
