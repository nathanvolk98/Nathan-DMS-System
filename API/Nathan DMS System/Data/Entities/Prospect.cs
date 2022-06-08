using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.Entities
{
    public class Prospect
    {
        [Key]
        public int prospectid { get; set; }
        public string customer_fullname { get; set; }
        public string customer_email { get; set; }
        public string customer_number { get; set; }
        public int dealerid { get; set; }
        [ForeignKey("dealerid")]
        public Dealer dealer { get; set; }
        public int vehicleid { get; set; }
        [ForeignKey("vehicleid")]
        public Vehicle vehicle { get; set; }
      
        public DateTime prospect_created { get; set; }
    }
}
