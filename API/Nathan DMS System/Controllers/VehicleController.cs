using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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
    public class VehicleController : Controller
    {
        private readonly IDMSRepository _repository;
        private readonly ILogger<VehicleController> _logger;
        private readonly IMapper _mapper;

        public VehicleController(IDMSRepository repository, ILogger<VehicleController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("addvehicle/{dealer_id}")]
        public IActionResult AddVehicle([FromBody] AddEditVehicle dealer, int dealer_id)
        {
            var specification = _mapper.Map<Specification>(dealer);

            Vehicle newvehicle = new Vehicle
            {

                Specification = specification,
                published = false,
                dealerid = dealer_id,
                date_created = DateTime.Now,
                last_modified = DateTime.Now
            };

             _repository.AddObject(newvehicle);

            if (_repository.SaveAll())
            {
                return Created($"Dealer has been created", newvehicle);
            }

            return BadRequest();

        }

        [HttpGet]
        [Route("dealerid/{dealer_id}")]
        public async Task<IActionResult> GetVehiclesByDealerId(int dealer_id)
        {
            try
            {
                var vehicles = await _repository.GetAllVehiclesByDealerId(dealer_id);

                var newmap = _mapper.Map<IEnumerable<Vehicle>, IEnumerable<AllVehiclesViewModel>>(vehicles);

                return Ok(newmap);
            }
            catch (Exception)
            {

                _logger.LogError($"Server: Failed to get Get Vehicle By Id");
                return BadRequest($"Server: Failed to get Get Vehicle ById ");
            }
        }

        /*[HttpPatch("patchupdate/{vehicle_id}")]
        public IActionResult EditVehicle(int vehicle_id, [FromBody] JsonPatchDocument<AllVehiclesViewModel> patchDoc)
        {
            if (patchDoc == null)
            {
                _logger.LogError("patchDoc object sent from client is null.");
                return BadRequest("patchDoc object is null");
            }
            var vehicle = _repository.GetVehicleByVehicleId(vehicle_id);

            if (vehicle == null)
            {
                _logger.LogError($"Vehicle with id: {vehicle_id} doesn't exist in the database.");
                return NotFound();
            }

            var vehicleToPatch = _mapper.Map<AllVehiclesViewModel>(vehicle);

            patchDoc.ApplyTo(vehicleToPatch, ModelState);

            _mapper.Map(vehicleToPatch, vehicle);

            _repository.SaveAll();

            return NoContent();
        }*/

        [HttpPut("publishvehicle/{vehicle_id}")]

        public async Task<IActionResult> VehiclePublish(int vehicle_id, [FromBody] AllVehiclesViewModel vehicleToPublishFromClient)
        {
            if (vehicleToPublishFromClient == null)
            {
                _logger.LogError(" object sent from client is null.");
                return BadRequest("object is null");
            }
            var vehicle = await _repository.GetVehicleByVehicleId(vehicle_id);

            if (vehicle == null)
            {
                _logger.LogError($"Vehicle with id: {vehicle_id} doesn't exist in the database.");
                return NotFound();
            }

            _mapper.Map(vehicleToPublishFromClient, vehicle);

            _repository.SaveAll();

            return NoContent();
        }

        [HttpPut("editvehicle/{vehicle_id}")]
        public async Task<IActionResult> EditVehicleAsync(int vehicle_id, [FromBody] EditVehicleDTO vehicleFromClient)
        {
            if (vehicleFromClient == null)
            {
                _logger.LogError(" object sent from client is null.");
                return BadRequest("object is null");
            }
            var vehicleToEditFromDB = await _repository.GetVehicleByVehicleId(vehicle_id);

            if (vehicleToEditFromDB == null)
            {
                _logger.LogError($"Vehicle with id: {vehicle_id} doesn't exist in the database.");
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                _mapper.Map(vehicleFromClient, vehicleToEditFromDB);
                vehicleToEditFromDB.last_modified = DateTime.Now;

                _repository.SaveAll();
            }
  
            return NoContent();
        }
        [HttpGet("getvehiclebyid/{vehicle_id}")]
        public async Task <IActionResult> GetVehicleById(int vehicle_id)
        {
            try
            {
                var vehicle = await _repository.GetVehicleByVehicleId(vehicle_id);

                var newmap = _mapper.Map<EditVehicleDTO>(vehicle);

                return Ok(newmap);
            }
            catch (Exception)
            {

                _logger.LogError($"Server: Failed to get Get Vehicle By Id");
                return BadRequest($"Server: Failed to get Get Vehicle ById ");
            }

        }

        [HttpGet("getallvehicles")]
        public async Task<IActionResult> GetallPublishedVehicles()
        {
            try
            {
                var allVehicls = await _repository.GetAllVehicles();
                _logger.LogInformation("server: retrieving vehicles from the database");
                var newmap = _mapper.Map<IEnumerable<Vehicle>, IEnumerable<MainScreenAllVehiclesPublished>>(allVehicls);

                var publishedVehicle = newmap.Where(x => x.published);

                _logger.LogInformation("server:  vehicles retrieved from the database successfully");
                return Ok(publishedVehicle);

            }
            catch (Exception)
            {

                _logger.LogError($"Failed to get published vehicles");
                return BadRequest($"Failed to get published vehicles ");
            }
        }
    }
}