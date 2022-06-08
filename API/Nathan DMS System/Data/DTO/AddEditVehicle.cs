using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class AddEditVehicle
    {
        public bool admin_permission { get; set; }
        [Required]
        [MinLength(3)]
        public string make { get; set; }
        [Required]
        [MinLength(1)]
        public string model { get; set; }
        [Required]
        [Range(1910, 2022)]
        public int model_built_year { get; set; }
        [Required]
        public string body_type { get; set; }
        [Required]
        public int odometer { get; set; }
        [Required]
        public string registration_number { get; set; }
        [Required]
        [Range(0, 6)]
        public int doors { get; set; }
        [Required]
        public string transmission { get; set; }
        [Required]
        public string fuel { get; set; }
        [Required]
        [Range(1, 10)]
        public int seats { get; set; }
        public int? dap_price { get; set; }
        [Required]
        [Range(1, 10000000)]
        public int egc_price { get; set; }
    }
}