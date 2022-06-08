using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class ProspectDisplay
    {
        public int prospectid { get; set; }
        public string customer_fullname { get; set; }
        public string customer_email { get; set; }
        public string customer_number { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public int model_built_year { get; set; }
        public DateTime prospect_created { get; set; }
    }
}
