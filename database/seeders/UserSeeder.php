<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@pertamina.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'last_login_at' => now(),
        ]);

        // Create regular users
        $users = [
            ['name' => 'Security Officer 1', 'email' => 'security1@pertamina.com'],
            ['name' => 'Security Officer 2', 'email' => 'security2@pertamina.com'],
            ['name' => 'Operations Manager', 'email' => 'operations@pertamina.com'],
            ['name' => 'Control Room Operator', 'email' => 'control@pertamina.com'],
            ['name' => 'Maintenance Supervisor', 'email' => 'maintenance@pertamina.com'],
            ['name' => 'Shift Supervisor A', 'email' => 'shift.a@pertamina.com'],
            ['name' => 'Shift Supervisor B', 'email' => 'shift.b@pertamina.com'],
            ['name' => 'Shift Supervisor C', 'email' => 'shift.c@pertamina.com'],
        ];

        foreach ($users as $userData) {
            User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'role' => 'user',
                'status' => 'active',
                'last_login_at' => random_int(0, 1) ? now()->subMinutes(random_int(1, 1440)) : null,
            ]);
        }
    }
}