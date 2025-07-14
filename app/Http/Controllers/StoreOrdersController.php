<?php

namespace App\Http\Controllers;

use App\Contracts\StoreOrdersInterface;
use App\Http\Requests\CheckoutRequest;
use App\Services\StoreOrdersService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        try {
            $this->storeOrdersInterface->processOrder($validated);
            return redirect()->back()->with('success', 'Pedido realizado com sucesso!');
        } catch (\Exception $e) {
            Log::error('Erro ao processar pedido: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Falha ao processar pedido: ' . $e->getMessage());
        }
    }
}
