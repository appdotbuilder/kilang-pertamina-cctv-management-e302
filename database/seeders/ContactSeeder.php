<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            [
                'name' => 'Ahmad Budi Santoso',
                'title' => 'Security Manager',
                'email' => 'security.manager@pertamina.com',
                'phone' => '+62-21-1234-5678',
                'whatsapp' => '+62812-3456-7890',
                'address' => 'Kilang Pertamina Internasional, Jakarta Utara 14270',
            ],
            [
                'name' => 'Sari Dewi Lestari',
                'title' => 'CCTV Operations Supervisor',
                'email' => 'cctv.operations@pertamina.com',
                'phone' => '+62-21-1234-5679',
                'whatsapp' => '+62812-3456-7891',
                'address' => 'Control Room Central, Kilang Pertamina Internasional',
            ],
            [
                'name' => 'Bambang Wijaya',
                'title' => 'Technical Support Manager',
                'email' => 'tech.support@pertamina.com',
                'phone' => '+62-21-1234-5680',
                'whatsapp' => '+62812-3456-7892',
                'address' => 'Maintenance Workshop, Kilang Pertamina Internasional',
            ],
            [
                'name' => 'Indira Maharani',
                'title' => 'Emergency Response Coordinator',
                'email' => 'emergency@pertamina.com',
                'phone' => '+62-21-1234-5681',
                'whatsapp' => '+62812-3456-7893',
                'address' => 'Fire Station, Kilang Pertamina Internasional',
            ],
            [
                'name' => 'Rudi Hartono',
                'title' => 'IT Infrastructure Manager',
                'email' => 'it.manager@pertamina.com',
                'phone' => '+62-21-1234-5682',
                'whatsapp' => '+62812-3456-7894',
                'address' => 'Administration Building, Kilang Pertamina Internasional',
            ],
        ];

        foreach ($contacts as $contactData) {
            Contact::create(array_merge($contactData, ['status' => 'active']));
        }
    }
}