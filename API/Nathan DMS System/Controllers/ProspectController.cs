using AutoMapper;
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
    public class ProspectController : Controller
    {
        private readonly IDMSRepository _repository;
        private readonly ILogger<ProspectController> _logger;
        private readonly IMapper _mapper;

        public ProspectController(IDMSRepository repository, ILogger<ProspectController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("createprospect/{dealerid}/{vehicleid}")]
        public IActionResult CreateProspect([FromBody] CreateProspectViewModel clientProspect, int dealerid, int vehicleid)
        {
            if (ModelState.IsValid)
            {

                Prospect Prospect = new Prospect
                {
                    customer_email = clientProspect.customer_email,
                    customer_fullname = clientProspect.customer_fullname,
                    customer_number = clientProspect.customer_number,
                    dealerid = dealerid,
                    vehicleid = vehicleid,
                    prospect_created = DateTime.Now
                };            

                _logger.LogInformation("Server: Creating Prospect...");
                _repository.AddObject(Prospect);

                if (_repository.SaveAll())
                {
                    return Created("Server: Prospect has been created", Prospect);
                }
            }

            _logger.LogError("Server: Model State not valid");
            return NoContent();
        }


        [HttpGet]
        [Route("dealersprospects/{dealerid}")]
        public async Task <IActionResult> GetAllDealersProspects(int dealerid)
        {
            try
            {
                _logger.LogInformation("server: retrieving dealers Prospects");
                var prospects = await _repository.ShowAllDealersProspects(dealerid);

                var prospectoClient = _mapper.Map<IEnumerable<Prospect>, IEnumerable<ProspectDisplay>>(prospects);


                _logger.LogInformation("server: dealers Prospects successfully retrieved");
                return Ok(prospectoClient);
            }
            catch (Exception)
            {

                _logger.LogError($"Failed to get prospects from this dealerid : {dealerid}");
                return BadRequest($"server: Failed to get prospects from this dealerid : {dealerid}");
            }
        }
    }
}
