using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaApi.DTOs;
using TiendaApi.Data;
using TiendaApi.Models;

namespace TiendaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/usuarios/registro
        [HttpPost("registro")]
        public async Task<IActionResult> Registrar([FromBody] Usuario usuario)
        {
            // Validar si el email ya existe
            var existe = await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email);
            if (existe)
            {
                return BadRequest(new { mensaje = "El correo electrónico ya está registrado." });
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Usuario registrado con éxito", usuario.Id, usuario.Nombre, usuario.Email });
        }

        // POST: api/usuarios/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto credenciales)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == credenciales.Email && u.Password == credenciales.Password);

            if (usuario == null)
            {
                return Unauthorized(new { mensaje = "Credenciales incorrectas." });
            }

            return Ok(new { mensaje = "Login exitoso", usuario.Id, usuario.Nombre, usuario.Email });
        }
    }
}