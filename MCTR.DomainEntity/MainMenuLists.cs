using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public  class MainMenuLists
    {
        public string UserName { get; set; }
        public IEnumerable<MctrMainMenu> OA { get; set; }
        public IEnumerable<MctrMainMenu> SA { get; set; }
        public IEnumerable<MctrMainMenu> LA { get; set; }
        public IEnumerable<MctrMainMenu> FA { get; set; }
        public IEnumerable<MctrMainMenu> AA { get; set; }
        public IEnumerable<MctrMainMenu> MA { get; set; }
        public IEnumerable<MctrMainMenu> CA { get; set; }
        public IEnumerable<MctrMainMenu> JA { get; set; }
        public IEnumerable<MctrMainMenu> XX { get; set; }
        public IEnumerable<MctrMainMenu> SR { get; set; }
        public IEnumerable<MctrMainMenu> OR { get; set; }
        public IEnumerable<MctrMainMenu> NinetyNine { get; set; }
        public IEnumerable<MctrMainMenu> IP { get; set; }
        public IEnumerable<MctrMainMenu> SU { get; set; }
        public IEnumerable<MctrMainMenu> PA { get; set; }
        public IEnumerable<MctrMainMenu> XS { get; set; }
        public IEnumerable<MctrMainMenu> LB { get; set; }
        public IEnumerable<MctrMainMenu> LM { get; set; }
        public string MessageText { get; set; }
        public string MessageStatus { get; set; }



    }
}
