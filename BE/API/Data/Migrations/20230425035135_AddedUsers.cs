using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7b3a28fc-8b64-4da0-aa2a-3e4cfa331b9b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a931f1f4-4568-450e-b8a4-06ac6d1a433f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "922164a7-5b5c-4c60-b34d-2cc27a91017d", null, "Member", "MEMBER" },
                    { "9c31aabf-f8e1-4975-b558-f03adf3933b3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "922164a7-5b5c-4c60-b34d-2cc27a91017d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c31aabf-f8e1-4975-b558-f03adf3933b3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7b3a28fc-8b64-4da0-aa2a-3e4cfa331b9b", null, "Admin", "ADMIN" },
                    { "a931f1f4-4568-450e-b8a4-06ac6d1a433f", null, "Member", "MEMBER" }
                });
        }
    }
}
