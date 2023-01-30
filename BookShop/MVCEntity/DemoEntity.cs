using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace MVCEntity
{
    public partial class DemoEntity : DbContext
    {
        public DemoEntity()
            : base("name=DemoEntity")
        {
        }

        public virtual DbSet<Goods> Goods { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Goods>()
            //     .Property(e => e.GoodName)
            //     .IsUnicode(false);

            // modelBuilder.Entity<Goods>()
            //     .Property(e => e.Color)
            //     .IsUnicode(false);

            // modelBuilder.Entity<Goods>()
            //     .Property(e => e.Brand)
            //     .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Pwd)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.RealName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Power)
                .IsUnicode(false);

            modelBuilder.Entity<Book>()
                .Property(e => e.BookName)
                .IsUnicode(false);

            modelBuilder.Entity<Book>()
                .Property(e => e.BSB)
                .IsUnicode(false);
        }
    }
}
