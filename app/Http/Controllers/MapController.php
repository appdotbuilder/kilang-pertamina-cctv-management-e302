<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\CctvCamera;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    /**
     * Display the interactive map interface.
     */
    public function index(Request $request)
    {
        // Get all buildings with their rooms and cameras
        $buildings = Building::with(['rooms.cameras'])->get()->map(function ($building) {
            return [
                'id' => $building->id,
                'name' => $building->name,
                'code' => $building->code,
                'latitude' => (float) $building->latitude,
                'longitude' => (float) $building->longitude,
                'status' => $building->status,
                'room_count' => $building->rooms->count(),
                'camera_count' => $building->rooms->sum(function($room) { return $room->cameras->count(); }),
                'rooms' => $building->rooms->map(function ($room) {
                    return [
                        'id' => $room->id,
                        'name' => $room->name,
                        'code' => $room->code,
                        'latitude' => (float) $room->latitude,
                        'longitude' => (float) $room->longitude,
                        'status' => $room->status,
                        'cameras' => $room->cameras->map(function ($camera) {
                            return [
                                'id' => $camera->id,
                                'name' => $camera->name,
                                'code' => $camera->code,
                                'latitude' => (float) $camera->latitude,
                                'longitude' => (float) $camera->longitude,
                                'status' => $camera->status,
                                'ip_address' => $camera->ip_address,
                                'hls_url' => $camera->hls_url,
                                'last_ping' => $camera->last_ping?->toISOString(),
                            ];
                        })->values()->toArray(),
                    ];
                })->values()->toArray(),
            ];
        })->values()->toArray();

        // Camera status summary
        $cameraStats = [
            'total' => CctvCamera::count(),
            'online' => CctvCamera::where('status', 'online')->count(),
            'offline' => CctvCamera::where('status', 'offline')->count(),
            'maintenance' => CctvCamera::where('status', 'maintenance')->count(),
        ];

        return Inertia::render('maps/index', [
            'buildings' => $buildings,
            'camera_stats' => $cameraStats,
        ]);
    }

    /**
     * Get building details with rooms and cameras.
     */
    public function show(Building $building)
    {
        $building->load(['rooms.cameras']);

        return response()->json([
            'building' => [
                'id' => $building->id,
                'name' => $building->name,
                'code' => $building->code,
                'latitude' => (float) $building->latitude,
                'longitude' => (float) $building->longitude,
                'status' => $building->status,
                'description' => $building->description,
                'rooms' => $building->rooms->map(function ($room) {
                    return [
                        'id' => $room->id,
                        'name' => $room->name,
                        'code' => $room->code,
                        'latitude' => (float) $room->latitude,
                        'longitude' => (float) $room->longitude,
                        'status' => $room->status,
                        'cameras' => $room->cameras->map(function ($camera) {
                            return [
                                'id' => $camera->id,
                                'name' => $camera->name,
                                'code' => $camera->code,
                                'latitude' => (float) $camera->latitude,
                                'longitude' => (float) $camera->longitude,
                                'status' => $camera->status,
                                'ip_address' => $camera->ip_address,
                                'hls_url' => $camera->hls_url,
                                'last_ping' => $camera->last_ping?->toISOString(),
                                'notes' => $camera->notes,
                            ];
                        })->values()->toArray(),
                    ];
                })->values()->toArray(),
            ],
        ]);
    }
}