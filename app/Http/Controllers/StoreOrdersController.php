<?php

namespace App\Http\Controllers;

use App\Contracts\StoreOrdersInterface;
use App\Http\Requests\CheckoutRequest;
use App\Services\StoreOrdersService;
use Illuminate\Http\Request;

class StoreOrdersController extends Controller
{
    public function __construct(protected StoreOrdersInterface $storeOrdersInterface) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CheckoutRequest $request)
    {
        $validated = $request->validated();

        $processOrder = $this->storeOrdersInterface->processOrder($validated);

        // return response()->json([
        //     'message' => 'Order placed successfully',
        //     'order' => $order,
        // ]);
    }
}
