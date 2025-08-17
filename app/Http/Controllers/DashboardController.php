<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\CctvCamera;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get statistics
        $totalBuildings = Building::count();
        $activeBuildings = Building::where('status', 'active')->count();
        
        $totalRooms = Room::count();
        $activeRooms = Room::where('status', 'active')->count();
        
        $totalCameras = CctvCamera::count();
        $onlineCameras = CctvCamera::where('status', 'online')->count();
        $offlineCameras = CctvCamera::where('status', 'offline')->count();
        $maintenanceCameras = CctvCamera::where('status', 'maintenance')->count();
        
        $stats = [
            'buildings' => [
                'total' => $totalBuildings,
                'active' => $activeBuildings,
                'inactive' => $totalBuildings - $activeBuildings,
            ],
            'rooms' => [
                'total' => $totalRooms,
                'active' => $activeRooms,
                'inactive' => $totalRooms - $activeRooms,
            ],
            'cameras' => [
                'total' => $totalCameras,
                'online' => $onlineCameras,
                'offline' => $offlineCameras,
                'maintenance' => $maintenanceCameras,
            ]
        ];

        // Admin-specific data
        if ($user && $user->isAdmin()) {
            $totalUsers = User::count();
            $activeUsers = User::where('status', 'active')->count();
            $onlineUsers = User::whereNotNull('last_login_at')
                ->where('last_login_at', '>=', now()->subMinutes(30))
                ->count();
                
            $stats['users'] = [
                'total' => $totalUsers,
                'active' => $activeUsers,
                'online' => $onlineUsers,
                'offline' => $activeUsers - $onlineUsers,
            ];
            
            $stats['signal_analytics'] = [
                'strong_signal' => random_int(450, 500),
                'medium_signal' => random_int(150, 200),
                'weak_signal' => random_int(50, 100),
                'no_signal' => random_int(0, 50),
            ];
        }

        // Recent notifications
        $notifications = $user ? $user->notifications()
            ->latest()
            ->take(5)
            ->get() : collect();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'notifications' => $notifications,
            'user_role' => $user->role ?? 'guest',
        ]);
    }
}