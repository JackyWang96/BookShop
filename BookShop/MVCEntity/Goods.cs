namespace MVCEntity
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Goods
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string GoodName { get; set; }

        public decimal? Price { get; set; }

        public decimal? Weight { get; set; }

        [StringLength(50)]
        public string Color { get; set; }

        [StringLength(50)]
        public string Brand { get; set; }
    }
}
