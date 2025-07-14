<?php

namespace App\Services;

use App\Contracts\StoreOrdersInterface;
use App\DTO\CartItemDto;

class StoreOrdersService implements StoreOrdersInterface
{
    private $api_url = "https://luvinco.proxy.beeceptor.com";

    public function __construct()
    {
        $this->api_url = env('API_URL', $this->api_url);
    }

    public function processOrder($data): array
    {
        dd($data);
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n" .
                    "Authorization: wQ8ehU2x4gj93CH9lMTnelQO3GcFvLzyqn8Fj3WA0ffQy57I60\r\n"
            ]
        ]);

        $response = @file_get_contents($this->api_url . '/orders', false, $context);

        if ($response === false) {
            $error = error_get_last()['message'] ?? 'Unknown error';
            $statusLine = $http_response_header[0] ?? '';

            if (str_contains($statusLine, '500')) {
                throw new \Exception('Falha ao conectar ao servidor, tente novamente.');
            }

            throw new \Exception("Erro ao buscar produtos: $error");
        }

        $data = json_decode($response);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception("Resposta da API inválida: " . json_last_error_msg());
        }

        if (!is_array($data)) {
            if (isset($data->status)) {
                throw new \Exception($data->status);
            }
            throw new \Exception("Formato inesperado da resposta da API.");
        }

        return array_map(fn($item) => new CartItemDto(
            product_id: (string)$item->product_id,
            name: $item->name,
            description: $item->description,
            price: (float)$item->price,
            category: $item->category,
            brand: $item->brand,
            stock: (int)$item->stock,
            image_url: $item->image_url
        ), $data);
    }
}
