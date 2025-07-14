<?php

namespace App\DTO;

class CartItemDto
{
    public function __construct(
        public string $product_id,
        public string $name,
        public string $description,
        public float $price,
        public string $category,
        public string $brand,
        public int $stock,
        public string $image_url
    ) {}

    public function toArray(): array
    {
        return [
            'product_id' => $this->product_id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'category' => $this->category,
            'brand' => $this->brand,
            'stock' => $this->stock,
            'image_url' => $this->image_url,
        ];
    }
}
