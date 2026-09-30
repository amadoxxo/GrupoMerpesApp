using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TiendaApi.Migrations
{
    /// <inheritdoc />
    public partial class EliminarStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Productos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Productos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
