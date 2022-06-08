using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data
{
    public interface IDMSRepository
    {
        void AddObject(object _object);
        Task<IEnumerable<Dealer>> GetAllDealers();
        Task<IEnumerable<Vehicle>> GetAllVehicles();
        Task<IEnumerable<Vehicle>> GetAllVehiclesByDealerId(int dealer_id);
        Task<Dealer> GetDealerById(int dealer_id);
        Task<Dealer> GetDealerUsernameAndPassword(string username, string password);
        Task<Vehicle> GetVehicleByVehicleId(int vehicle_id);
        bool SaveAll();
        Task<IEnumerable<Prospect>> ShowAllDealersProspects(int dealerid);
    }
}

