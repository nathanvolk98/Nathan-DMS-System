using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.Entities
{
    public class Tags
    {
        [Key]
        public int tagid { get; set; }
        public ICollection<Vehicle> vehicles { get; set; }
    }
}
