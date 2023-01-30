using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MVCEntity;


namespace MVCLogic
{
     public class LogicBooks
    {
        /// <summary>
        /// Use keyword to create the fuzzy query
        /// </summary>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public List<Book> GetBookList(String keyword)
        {
            DemoEntity demoEntity = new DemoEntity();
            Console.WriteLine(demoEntity.Books);
           
            var data = demoEntity.Books.ToList();

            if (!string.IsNullOrEmpty(keyword))
            {
                var res = data.Where(p => p.BookName.Contains(keyword)).ToList();
                return res;
            }
            return data;
        }

        /// <summary>
        /// Add a book in to database
        /// </summary>
        /// <param name="book"></param>
        public void AddBook(Book book)
        {
            DemoEntity demoEntity = new DemoEntity();
            demoEntity.Books.Add(book);
            demoEntity.SaveChanges();
        }

        /// <summary>
        /// Delete selected book
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public Boolean DeleteBook(int ID)
        {
            DemoEntity demoEntity = new DemoEntity();
            var data = demoEntity.Books.Where(p => p.ID == ID).FirstOrDefault();
            if (data != null)
            {
                demoEntity.Books.Remove(data);
                demoEntity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Find a single book by ID
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public Book FindBook(int ID)
        {
            DemoEntity demoEntity = new DemoEntity();
            var data = demoEntity.Books.Where(p => p.ID == ID).FirstOrDefault();
            return data;
        }

        /// <summary>
        /// Update book information in the database
        /// </summary>
        /// <param name="book"></param>
        public void UpdateBook(Book book)
        {
            DemoEntity demoEntity = new DemoEntity();
            var data = demoEntity.Books.Where(p => p.ID == book.ID).FirstOrDefault();
            if (data != null)
            {
                data.BookName = book.BookName;
                data.BSB = book.BSB;
                demoEntity.SaveChanges();
            }
            else
            {
                Console.WriteLine("Not find this data");
            }
        }

    }
}
