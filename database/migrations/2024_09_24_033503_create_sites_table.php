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
        Schema::create('sites', function (Blueprint $table) {
            $table->unsignedSmallInteger("id", true);
            $table->string("name", 100);
            $table->string("address", 255);
            $table->softDeletes();
        });

        Schema::table("schedulers", function (Blueprint $table) {
            $table->unsignedSmallInteger("site_id");
            $table->foreign("site_id")->references("id")->on("sites");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("schedulers", function (Blueprint $table) {
            $table->dropForeign("schedulers_site_id_foreign");
            $table->dropColumn("site_id");
        });

        Schema::dropIfExists('sites');
    }
};
