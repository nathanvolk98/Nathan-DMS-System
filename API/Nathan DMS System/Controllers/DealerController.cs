using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nathan_DMS_System.Data;
using Nathan_DMS_System.Data.DTO;
using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [EnableCors("ApiCorsPolicy")]
    public class DealerController : Controller
    {
        private readonly IDMSRepository _repository;
        private readonly ILogger<DealerController> _logger;
        private readonly IMapper _mapper;

        public DealerController(IDMSRepository repository, ILogger<DealerController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("/adduser")]
        public IActionResult AddUser([FromBody] NewDealerView dealer)
        {
            var newuser = _mapper.Map<Dealer>(dealer);

            if (newuser.date_created == DateTime.MinValue || newuser.date_modified == DateTime.MinValue)
            {
                newuser.date_created = DateTime.Now;
                newuser.date_modified = DateTime.Now;
            }

            _repository.AddObject(newuser);
            if (_repository.SaveAll())
            {
                return Created($"Dealer has been created", newuser);
            }

            return BadRequest();
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task <IActionResult> GetAllDealers()
        {

            var dealers = await _repository.GetAllDealers();

            return Ok(dealers);
        }

        [HttpGet("{dealer_id}")]
        public async Task <IActionResult> GetDealerById(int dealer_id)
        {
            var dealer = await _repository.GetDealerById(dealer_id);
            if(dealer == null)
            {
               _logger.LogError($"Server: Could not find this id {dealer_id}");
                return NotFound();
            }
            return Ok(dealer);
        }

      

    }
}
