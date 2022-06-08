using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.Entities
{
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int vehicleid { get; set; }
        public int dealerid { get; set; }
        [ForeignKey("specificationid")]
        public Specification Specification { get; set; }
        public Dealer dealer { get; set; }
        public ICollection<Prospect> prospects { get; set; }
        public DateTime date_created { get; set; }
        public DateTime last_modified { get; set; }
        public bool published { get; set; }
        [ForeignKey("tagid")]
        public Tags tag { get; set; }
        public int? tagid { get; set; }
    }
}
