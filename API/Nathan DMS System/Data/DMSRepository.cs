using Microsoft.Extensions.Logging;
using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Nathan_DMS_System.Data
{
    public class DMSRepository : IDMSRepository
    {
        private readonly DMSDbContext _context;
        private readonly ILogger<DMSRepository> _logger;

        public DMSRepository(DMSDbContext ctx, ILogger<DMSRepository> logger)
        {
            _context = ctx;
            _logger = logger;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }



        public async Task<IEnumerable<Dealer>> GetAllDealers()
        {
            var dealers = await _context.Dealer.
                Include(p => p.vehicles)
                .ThenInclude(p => p.Specification)
                .ToListAsync();

            return dealers;
        }

        public void AddObject(Object _object)

        {
            _context.Add(_object);

        }
        public async Task<Dealer> GetDealerById(int dealer_id)
        {

            var dealer = await _context.Dealer
                .Include(p => p.vehicles)
                .ThenInclude(p => p.Specification)
                .FirstOrDefaultAsync(x => x.dealerid == dealer_id);

            if (dealer == null)
            {
                return null;
            }

            return dealer;
        }
        public async Task<IEnumerable<Vehicle>> GetAllVehiclesByDealerId(int dealer_id)
        {
            var vehicles = await _context.Vehicle
                .Where(p => p.dealerid == dealer_id)
                 .Include(p => p.Specification)
                 .ToListAsync();

            return vehicles;
        }
        public async Task <Vehicle> GetVehicleByVehicleId(int vehicle_id)
        {
            var vehicle = await _context.Vehicle
                .Where(p => p.vehicleid == vehicle_id)
                 .Include(p => p.Specification)
                 .FirstOrDefaultAsync();

            return vehicle;
        }

        public async Task<IEnumerable<Vehicle>> GetAllVehicles()
        {
            var allVehicles = await _context.Vehicle
                 .Include(p => p.Specification)
                 .ToListAsync();

            return allVehicles;
        }

        public async Task<Dealer> GetDealerUsernameAndPassword(string username, string password)
        { 

                var dealer = await _context.Dealer
                                   .FirstOrDefaultAsync(u => u.username == username && u.password == password);

            if (dealer != null)
            {
                return dealer;
            }
            else
            {
                _logger.LogInformation("user = null");
                return null;
            }
        }

        public async Task<IEnumerable<Prospect>> ShowAllDealersProspects(int dealerid)
        {
            var dealerProspects = await _context.Prospect
                                  .Where(x => x.dealerid == dealerid)
                                  .Include(x => x.vehicle.Specification)
                                  .ToListAsync();

            return dealerProspects;
        }
    }
}
