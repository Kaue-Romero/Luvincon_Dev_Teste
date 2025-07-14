<?php

namespace App\Http\Controllers;

use App\Contracts\StoreItemsInterface;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StoreItemsController extends Controller
{
    public function __construct(protected StoreItemsInterface $storeService) {}

    public function index()
    {
        try {
            $items = $this->storeService->getAllItems();

            return Inertia::render('Dashboard', [
                'items' => array_map(fn($item) => [
                    'product_id' => $item->product_id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'price' => $item->price,
                    'category' => $item->category,
                    'brand' => $item->brand,
                    'stock' => $item->stock,
                    'image_url' => $item->image_url,
                ], $items),
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading store items: ' . $e->getMessage());

            return Inertia::render('Dashboard', [
                'items' => [],
                'errors' => [
                    'general' => 'Failed to load items. Please try again later. ' . $e->getMessage(),
                ],
            ]);
        }
    }

    public function cart()
    {
        return Inertia::render('CartCheckout');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(StoreItems $storeItems)
    // {
    //     try {
    //         $item = $this->storeService->getItemById($storeOrders->id);
    //         return response()->json($item);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 404);
    //     }
    // }
}
