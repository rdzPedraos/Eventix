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
        Schema::table("users", function (Blueprint $table) {
            $table->string("name", 25)->change();
            $table->string("last_name", 25)->after("name");

            $table->string("document_type_code", 10)->after("id");
            $table->string("document_number", 20)->unique()->after("document_type_code");

            $table->string("phone", 20)->after("email");

            $table->foreign("document_type_code")->references("code")->on("document_types")->cascadeOnUpdate();

            $table->dropColumn("email_verified_at");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("users", function (Blueprint $table) {
            $table->dropForeign(["document_type_code"]);

            $table->string("name")->change();
            $table->dropColumn("last_name");
            $table->dropColumn("document_type_code");
            $table->dropColumn("document_number");
            $table->dropColumn("phone");
        });
    }
};
