<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSubmittedArtworksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tbl_status_submitted_artworks')->where('status', 'Pending')->update([
            'comment' => 'Your artwork is submitted and waiting for approval.',
        ]);

        DB::table('tbl_status_submitted_artworks')->where('status', 'Approved')->update([
            'comment' => 'Your artwork has been approved.',
        ]);

        DB::table('tbl_status_submitted_artworks')->where('status', 'Rejected')->update([
            'comment' => 'Your artwork was rejected. Please review the guidelines.',
        ]);
    }
}
