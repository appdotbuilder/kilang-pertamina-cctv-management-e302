<?php

namespace Database\Seeders;

use App\Models\Building;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $buildings = Building::all();
        $roomTypes = ['Control Room', 'Equipment Room', 'Storage Area', 'Office', 'Maintenance Bay'];

        foreach ($buildings as $building) {
            // Create 3-5 rooms per building
            $roomCount = random_int(3, 5);
            
            for ($i = 1; $i <= $roomCount; $i++) {
                $roomType = $roomTypes[array_rand($roomTypes)];
                
                Room::create([
                    'building_id' => $building->id,
                    'name' => $roomType . ' ' . $i,
                    'code' => $building->code . '-R' . str_pad((string)$i, 2, '0', STR_PAD_LEFT),
                    'description' => $roomType . ' in ' . $building->name,
                    'latitude' => (float)$building->latitude + (random_int(-50, 50) / 10000.0),
                    'longitude' => (float)$building->longitude + (random_int(-50, 50) / 10000.0),
                    'status' => 'active',
                ]);
            }
        }
    }
}