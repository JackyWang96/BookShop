using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace EntityFramework
{
    public partial class DemoEntity : DbContext
    {
        public DemoEntity()
            : base("name=DemoEntity1")
        {
        }

        public virtual DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .Property(e => e.BookName)
                .IsUnicode(false);

            modelBuilder.Entity<Book>()
                .Property(e => e.BSB)
                .IsUnicode(false);
        }
    }
}
