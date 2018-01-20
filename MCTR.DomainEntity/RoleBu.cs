namespace MCTR.DomainEntity
{
  public class RoleBu {
        public string sessionBems { get; set; }
        public string BEMS { get; set; }
        public string GROUP_CD7 { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public virtual Role MCTR_ROLE { get; set; }
    }
}
