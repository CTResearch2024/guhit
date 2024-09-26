<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameRoleToRoleIdInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Rename the column
            $table->renameColumn('role', 'role_id');
            
            // Set foreign key constraint
            $table->foreign('role_id')
                  ->references('id')
                  ->on('roles')
                  ->onDelete('cascade'); // Adjust this based on your requirements
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['role_id']);
            
            // Rename the column back to its original name
            $table->renameColumn('role_id', 'role');
        });
    }
}
