<?php

namespace App\Contracts;

interface StoreOrdersInterface
{
    /**
     * Processes an order based on the provided data.
     *
     * The `$data` array should include:
     * - 'cardNumber': string, numeric only
     * - 'cardName': string
     * - 'cardExpiry': string
     * - 'cardCvv': string, numeric only
     * - 'cep': string, must be valid via ViaCEP
     * - 'street': string
     * - 'number': numeric
     * - 'neighborhood': string
     * - 'city': string
     * - 'state': string
     * - 'items': array of products, each with:
     *     - 'product_id': string
     *     - 'quantity': integer >= 1
     *
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     * @throws \Exception
     */
    public function processOrder(array $data): array;
}
