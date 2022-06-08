using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Nathan_DMS_System.Data;
using Nathan_DMS_System.Data.DTO;
using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Controllers
{
    [Route("api/[Controller]/auth")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IDMSRepository _repository;

        public AccountController(ILogger<AccountController> logger, IMapper mapper,
            IConfiguration config,IDMSRepository dMSRepository)
        {
            _logger = logger;
            _config = config;
            _mapper = mapper;
            _repository = dMSRepository;
        }
        // GET api/values
        [HttpPost, Route("login")]
        public async Task <IActionResult> Login([FromBody] LoginViewModel userLoginDto)
        {
            if (userLoginDto == null)
            {
                return BadRequest("Invalid client request");
            }
            Dealer maptoDB = _mapper.Map<Dealer>(userLoginDto);

            var getUser =await _repository.GetDealerUsernameAndPassword(maptoDB.username, maptoDB.password);
            
            if (getUser != null)
            {
                var claims = new List<Claim>
             {
                 new Claim("dealerid", getUser.dealerid.ToString())
             };


                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                
                return Unauthorized();
            }
        }
    }
}
