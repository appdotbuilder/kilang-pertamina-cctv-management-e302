<?php

namespace Database\Seeders;

use App\Models\Building;
use Illuminate\Database\Seeder;

class BuildingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $buildings = [
            ['name' => 'Crude Distillation Unit 1', 'code' => 'CDU1', 'lat' => -6.2000, 'lng' => 106.8000],
            ['name' => 'Crude Distillation Unit 2', 'code' => 'CDU2', 'lat' => -6.2010, 'lng' => 106.8010],
            ['name' => 'Fluid Catalytic Cracking Unit', 'code' => 'FCCU', 'lat' => -6.2020, 'lng' => 106.8020],
            ['name' => 'Hydrotreating Unit', 'code' => 'HTU', 'lat' => -6.2030, 'lng' => 106.8030],
            ['name' => 'Alkylation Unit', 'code' => 'ALK', 'lat' => -6.2040, 'lng' => 106.8040],
            ['name' => 'Aromatics Unit', 'code' => 'ARO', 'lat' => -6.2050, 'lng' => 106.8050],
            ['name' => 'Tank Farm A', 'code' => 'TFA', 'lat' => -6.2060, 'lng' => 106.8060],
            ['name' => 'Tank Farm B', 'code' => 'TFB', 'lat' => -6.2070, 'lng' => 106.8070],
            ['name' => 'Loading Terminal', 'code' => 'LT', 'lat' => -6.2080, 'lng' => 106.8080],
            ['name' => 'Power Plant', 'code' => 'PP', 'lat' => -6.2090, 'lng' => 106.8090],
            ['name' => 'Water Treatment Plant', 'code' => 'WTP', 'lat' => -6.2100, 'lng' => 106.8100],
            ['name' => 'Wastewater Treatment', 'code' => 'WWTP', 'lat' => -6.2110, 'lng' => 106.8110],
            ['name' => 'Control Room Central', 'code' => 'CRC', 'lat' => -6.2120, 'lng' => 106.8120],
            ['name' => 'Administration Building', 'code' => 'ADMIN', 'lat' => -6.2130, 'lng' => 106.8130],
            ['name' => 'Maintenance Workshop', 'code' => 'MW', 'lat' => -6.2140, 'lng' => 106.8140],
            ['name' => 'Laboratory Complex', 'code' => 'LAB', 'lat' => -6.2150, 'lng' => 106.8150],
            ['name' => 'Fire Station', 'code' => 'FS', 'lat' => -6.2160, 'lng' => 106.8160],
            ['name' => 'Security Gate House', 'code' => 'SEC', 'lat' => -6.2170, 'lng' => 106.8170],
        ];

        foreach ($buildings as $building) {
            Building::create([
                'name' => $building['name'],
                'code' => $building['code'],
                'description' => 'Production facility at Kilang Pertamina Internasional',
                'latitude' => $building['lat'],
                'longitude' => $building['lng'],
                'status' => 'active',
            ]);
        }
    }
}