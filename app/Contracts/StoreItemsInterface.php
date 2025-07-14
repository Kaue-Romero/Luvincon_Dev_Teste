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
}
