using MVCEntity;
using MVCLogic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCApplication.Controllers
{

    public class HomeController : BaseController
    {

        LogicUser logicUser = new LogicUser();
        LogicGoods logicGoods = new LogicGoods();
        LogicBooks logicbooks = new LogicBooks();
        //public ActionResult Index()
        //{
        //    return View();
        //}

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}

       public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username,string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return ErrorResult("The account,password cannot be empty !!!");
            }
            else
            {
                //Call the user login method
                var data = logicUser.CheckLogin(username, password);
                if (data != null)
                {
                    return SuccessResult("Login Success");
                }
                else
                {
                    return ErrorResult("Login Falied");
                }
            }
        }

        public ActionResult GoodsList()
        {
            return View();
        }


        public string GetGoodsList(string keyWord)
        {
            var data = logicbooks.GetBookList(keyWord);
            return data.ToJsonCon();
        }

        public string GetBooksList(string keyWord)
        {
            var data = logicbooks.GetBookList(keyWord);
            return data.ToJsonCon();
        }

        public bool ReservedBook(int ID)
        {
            logicbooks.ReservedBook(ID);
            return true;
        }

        

         public bool CancelReservedBook(int ID)
        {
            logicbooks.CancelReservedBook(ID);
            return true;
        }

        public ActionResult DelGoods(int ID)
        {
            bool b = logicGoods.DelGood(ID);
            if (b)
            {
                return SuccessResult("delete successs");
            }
            else
            {
                return ErrorResult("delete falied");
            }
        }

        public ActionResult GoodsDetail()
        {
            return View();
        }
         
        public ActionResult UpdateSingleGood(Goods goods)
        {
            logicGoods.UpdateSingleGood(goods);
            return SuccessResult("add success");
        }

        public string GetSingleGood(int ID)
        {
            var data = logicGoods.GetSingleGood(ID);
            return data.ToJsonCon();
        }

        public ActionResult InsertSingleGood(Goods goods)
        {
            logicGoods.InsertGood(goods);
            return SuccessResult("add success");
        }


        public ActionResult UserList()
        {
            return View();
        }


        public string GetUserList(string keyWord)
        {
            var pageData = logicUser.GetUsersList(keyWord);
            return pageData.ToJsonCon();
        }

        public ActionResult DelUser(int ID)
        {
            bool b = logicUser.DelUser(ID);
            if (b)
            {
                return SuccessResult("Delete Successful");
            }
            else
            {
                return SuccessResult("Delete failed");
            }
        }

        public ActionResult UserDetail()
        {
            return View();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public string GetSingleUser(int ID)
        {
            var data = logicUser.GetSingleUser(ID);
            return data.ToJsonCon();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="FlowerName"></param>
        /// <param name="Price"></param>
        /// <param name="Color"></param>
        /// <returns></returns>
        public ActionResult UpdateSingleUser(User user)
        {
            logicUser.UpdateSingleUser(user);
            return SuccessResult("change success");
        }
    }
}