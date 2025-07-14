<?php

namespace App\Providers;

use App\Contracts\StoreItemsInterface;
use App\Contracts\StoreOrdersInterface;
use App\Services\StoreItemsService;
use App\Services\StoreOrdersService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(StoreItemsInterface::class, StoreItemsService::class);
        $this->app->bind(StoreOrdersInterface::class, StoreOrdersService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
