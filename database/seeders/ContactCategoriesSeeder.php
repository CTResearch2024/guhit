<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contact_categories')->insert([
            [
                'name' => 'General Inquiry',
                'default_message' => 'Thank you for your inquiry. We will get back to you shortly regarding your question.',
            ],
            [
                'name' => 'Content-Related',
                'default_message' => 'Your inquiry has been forwarded to our content team. We will get back to you with more information soon.',
            ],
            [
                'name' => 'Account Issues',
                'default_message' => 'Our team is reviewing your account-related issue. Please allow us some time to get back to you.',
            ],
            [
                'name' => 'Technical Support',
                'default_message' => 'Thank you for reaching out. Our technical support team is investigating the issue and will respond shortly.',
            ]
        ]);
    }
}
