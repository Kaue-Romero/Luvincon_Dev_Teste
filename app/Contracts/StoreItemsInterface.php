<?php

namespace App\Contracts;

use App\DTO\CartItemDto;

interface StoreItemsInterface
{
    /**
     * @return CartItemDto[]
     * @throws \Exception
     */
    public function getAllItems(): array;

    /**
     * @param int $id
     * @return CartItemDto
     */
    public function getItemById(int $id): CartItemDto;
}
