using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MCTR.DomainEntities
{
  public class MctrMessageStatus {


        [Required]
        [DisplayName("Message Status Code")]
        [StringLength(1)]
        public string MESSAGE_STATUS { get; set; }

        [Required]
        [DisplayName("Message Status Text")]
        [StringLength(99)]
        public string MESSAGE_TEXT { get; set; }

    }
}

