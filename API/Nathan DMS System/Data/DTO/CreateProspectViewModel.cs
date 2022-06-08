using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class CreateProspectViewModel
    {
        [Required(ErrorMessage = "The Name field is required.")]
        public string customer_fullname { get; set; }
        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address.")]
        public string customer_email { get; set; }
        [Required]
        [StringLength(13, MinimumLength = 10)]
        public string customer_number { get; set; }
    }
}
