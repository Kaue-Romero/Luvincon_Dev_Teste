import { useCart } from '@/Contexts/CartContext';
import { returnPrice } from '@/helpers';
import { Item } from '@/types';
import { useState } from 'react';

type AddItemModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: Item;
};

const AddItemModal = ({ isOpen, onClose, item }: AddItemModalProps) => {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addItem({
            ...item,
            quantity,
        } as Item & { quantity: number });
        setQuantity(1);
        alert(`Item ${item.name} adicionado ao carrinho!`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center gap-4">
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-40 w-40 rounded object-contain"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.src = '/images/image-not-found-icon.svg';
                        }}
                    />

                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.name}
                    </h2>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                    </p>

                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                        {returnPrice(item.price)}
                    </p>

                    {item.stock !== undefined && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Disponível: {item.stock}
                        </p>
                    )}

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium dark:text-white">
                            Quantidade:
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={item.stock ?? 99}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            className="w-20 rounded border border-gray-300 px-2 py-1 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {item.stock !== undefined && item.stock <= 0 && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                            Item esgotado
                        </p>
                    )}

                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        Total: {returnPrice(item.price * quantity)}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="mt-4 w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddItemModal;
