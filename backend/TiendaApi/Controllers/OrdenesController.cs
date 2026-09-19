using Microsoft.AspNetCore.Mvc;
using TiendaApi.Data;
using TiendaApi.Models;
using TiendaApi.DTOs;
using System.Text.Json;

namespace TiendaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdenesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CrearOrden([FromBody] CrearOrdenDto dto)
        {
            if (dto.Productos == null || !dto.Productos.Any())
            {
                return BadRequest(new { mensaje = "El carrito de compras está vacío." });
            }

            decimal totalCalculado = 0;
            var listaDetallesResumen = new List<object>();


            foreach (var item in dto.Productos)
            {
                var productoDb = await _context.Productos.FindAsync(item.ProductoId);

                if (productoDb != null)
                {
                    var subtotal = productoDb.Precio * item.Cantidad;
                    totalCalculado += subtotal;

                    listaDetallesResumen.Add(new
                    {
                        productoId = productoDb.Id,
                        nombre = productoDb.Nombre,
                        precioUnitario = productoDb.Precio,
                        cantidad = item.Cantidad
                    });
                }
            }

            string detalleJson = JsonSerializer.Serialize(listaDetallesResumen);

            var nuevaOrden = new Orden
            {
                UsuarioId = dto.UsuarioId,
                FechaOrden = DateTime.UtcNow,
                Total = totalCalculado,
                DetalleProductos = detalleJson
            };

            _context.Ordenes.Add(nuevaOrden);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                mensaje = "¡Orden creada con éxito!", 
                ordenId = nuevaOrden.Id, 
                total = totalCalculado 
            });
        }
    }
}