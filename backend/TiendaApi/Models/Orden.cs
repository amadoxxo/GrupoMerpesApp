using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaApi.Models
{
    public class Orden
    {
        public int Id { get; set; }
        
        public int UsuarioId { get; set; }
        
        [ForeignKey("UsuarioId")]
        public Usuario? Usuario { get; set; }

        public DateTime FechaOrden { get; set; } = DateTime.UtcNow;
        public decimal Total { get; set; }
        public string DetalleProductos { get; set; } = string.Empty; 
    }
}