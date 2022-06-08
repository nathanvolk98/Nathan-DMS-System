using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class AllVehiclesViewModel
    {
        public int vehicleid { get; set; }
        public int dealerid { get; set; }
        
        public bool published { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public int model_built_year { get; set; }
        public int odometer { get; set; }
        public DateTime date_created { get; set; }
        public int egc_price { get; set; }

    }
}
