namespace TiendaApi.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        // Propiedad de navegación inversa (opcional, para ver las órdenes de un usuario)
        public ICollection<Orden> Ordenes { get; set; } = new List<Orden>();
    }
}