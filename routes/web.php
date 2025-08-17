<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Maps
    Route::get('maps', [MapController::class, 'index'])->name('maps.index');
    Route::get('buildings/{building}', [MapController::class, 'show'])->name('buildings.show');
    
    // Cameras
    Route::get('cameras', function () {
        return Inertia::render('cameras/index');
    })->name('cameras.index');
    
    // Contacts
    Route::resource('contacts', ContactController::class);
    
    // Users (Admin only)
    Route::get('users', function () {
        return Inertia::render('users/index');
    })->name('users.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
