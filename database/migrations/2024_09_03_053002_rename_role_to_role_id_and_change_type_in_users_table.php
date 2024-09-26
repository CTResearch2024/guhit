<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameRoleToRoleIdAndChangeTypeInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Convert 'role' to 'role_id' with type unsignedBigInteger
            // If there's a foreign key constraint, drop it first
            if (Schema::hasColumn('users', 'role')) {
                // Drop any existing foreign key (if you had one)
                // $table->dropForeign(['role']);
                // Convert the column to integer before renaming
                $table->unsignedBigInteger('role')->nullable()->change();
                $table->renameColumn('role', 'role_id');
            }

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

            // Rename the column back and change the type to varchar
            $table->renameColumn('role_id', 'role');
            $table->string('role')->change();
        });
    }
}
