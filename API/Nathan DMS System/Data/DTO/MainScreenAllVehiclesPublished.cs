using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class MainScreenAllVehiclesPublished
    {
        public int vehicleid { get; set; }
        public int dealerid { get; set; }
        public bool published { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public int model_built_year { get; set; }
        public string body_type { get; set; }
        public int odometer { get; set; }
        public string registration_number { get; set; }
        public int doors { get; set; }
        public string transmission { get; set; }
        public string fuel { get; set; }
        public int seats { get; set; }
        public int egc_price { get; set; }
    }
}
