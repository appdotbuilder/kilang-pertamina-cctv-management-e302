<?php

namespace Database\Seeders;

use App\Models\CctvCamera;
use App\Models\Room;
use Illuminate\Database\Seeder;

class CctvCameraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = Room::all();
        $cameraStatuses = ['online', 'offline', 'maintenance'];
        $ipBase = '192.168.1.';
        $cameraCounter = 100;

        foreach ($rooms as $room) {
            // Create 1-3 cameras per room to reach ~700 total cameras
            $cameraCount = random_int(8, 12); // Adjust for higher total
            
            for ($i = 1; $i <= $cameraCount; $i++) {
                $cameraIp = $ipBase . $cameraCounter;
                $status = $cameraStatuses[array_rand($cameraStatuses)];
                
                // Weighted distribution: more online cameras
                if (random_int(1, 100) <= 70) {
                    $status = 'online';
                } elseif (random_int(1, 100) <= 20) {
                    $status = 'offline';
                } else {
                    $status = 'maintenance';
                }
                
                CctvCamera::create([
                    'room_id' => $room->id,
                    'name' => 'Camera ' . $room->code . '-C' . str_pad((string)$i, 2, '0', STR_PAD_LEFT),
                    'code' => $room->code . '-C' . str_pad((string)$i, 2, '0', STR_PAD_LEFT),
                    'ip_address' => $cameraIp,
                    'rtsp_url' => "rtsp://{$cameraIp}:554/stream1",
                    'hls_url' => "http://{$cameraIp}:8080/stream.m3u8",
                    'latitude' => (float)$room->latitude + (random_int(-10, 10) / 100000.0),
                    'longitude' => (float)$room->longitude + (random_int(-10, 10) / 100000.0),
                    'status' => $status,
                    'last_ping' => $status === 'online' ? now()->subMinutes(random_int(1, 30)) : null,
                    'notes' => $status === 'maintenance' ? 'Scheduled maintenance' : null,
                ]);
                
                $cameraCounter++;
                if ($cameraCounter > 254) {
                    $cameraCounter = 1;
                }
            }
        }
    }
}