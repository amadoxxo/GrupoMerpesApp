namespace TiendaApi.DTOs
{
    public class CrearOrdenDto
    {
        public int UsuarioId { get; set; }
        public List<ItemOrdenDto> Productos { get; set; } = new();
    }

    public class ItemOrdenDto
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
    }
}