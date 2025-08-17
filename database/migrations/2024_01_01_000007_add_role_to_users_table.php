<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'user'])->default('user')->after('email')->comment('User role');
            $table->timestamp('last_login_at')->nullable()->after('email_verified_at')->comment('Last login timestamp');
            $table->enum('status', ['active', 'inactive'])->default('active')->after('role')->comment('User status');
            
            $table->index('role');
            $table->index('status');
            $table->index('last_login_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['status']);
            $table->dropIndex(['last_login_at']);
            $table->dropColumn(['role', 'last_login_at', 'status']);
        });
    }
};