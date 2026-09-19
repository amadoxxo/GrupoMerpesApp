using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaApi.Data; // Ajusta según el namespace de tu DbContext
using TiendaApi.Models;
using TiendaApi.DTOs; // Donde tengas tu CrearOrdenDto
using System.Text.Json;

namespace TiendaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenesController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Cambia ApplicationDbContext por el nombre real de tu DbContext si es diferente

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

            // Iteramos sobre los productos que envía Ionic
            foreach (var item in dto.Productos)
            {
                // Buscamos el producto en la base de datos para obtener su precio real y su nombre
                var productoDb = await _context.Productos.FindAsync(item.ProductoId);

                if (productoDb != null)
                {
                    var subtotal = productoDb.Precio * item.Cantidad;
                    totalCalculado += subtotal;

                    // Guardamos una estructura limpia para el detalle
                    listaDetallesResumen.Add(new
                    {
                        productoId = productoDb.Id,
                        nombre = productoDb.Nombre,
                        precioUnitario = productoDb.Precio,
                        cantidad = item.Cantidad
                    });
                }
            }

            // Convertimos la lista de productos a un string (JSON) para guardarlo en la columna DetalleProductos
            string detalleJson = JsonSerializer.Serialize(listaDetallesResumen);

            // Creamos la nueva orden con el total real y el detalle completo
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