using MVCEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCLogic
{
    public class LogicGoods
    {
        //增删查改

        //最后要做一个保存的操作（新增，删除，修改）
        //SaveChanges();
        

        /// <summary>
        /// 获取商品列表
        /// </summary>
        /// <param name="keyWord"></param>
        /// <returns></returns>
        public List<Goods> GetGoosList(string keyWord)
        {
            //实例化数据库上下文类
            DemoEntity demoEntity = new DemoEntity();
            //查询我们需要的数据
            var data = demoEntity.Goods.ToList();
            //如果keyWord不为空，就做模糊查询
            if (!string.IsNullOrEmpty(keyWord))
            {
                data = data.Where(p => p.GoodName.Contains(keyWord)).ToList();
            }
            return data;
        }


        /// <summary>
        /// 删除单条商品的数据
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DelGood(int ID)
        {
            //实例化数据库上下文类
            DemoEntity demoEntity = new DemoEntity();
            //先根据ID找到这条数据，再进行删除
            var data = demoEntity.Goods.Where(p => p.ID == ID).FirstOrDefault();
            //如果data不为null，就进行删除
            if (data != null)
            {
                //删除
                demoEntity.Goods.Remove(data);
                //最后要做一个保存的操作
                demoEntity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 获取单挑商品数据
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public Goods GetSingleGood(int ID)
        {
            //实例化数据库上下文类
            DemoEntity demoEntity = new DemoEntity();
            //根据ID找到这条数据
            var data = demoEntity.Goods.Where(p => p.ID == ID).FirstOrDefault();
            return data;
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="good"></param>
        public void UpdateSingleGood(Goods good)
        {
            //首先用对象进行数据的接受，然后根据ID，查询到这条数据，再进行重新赋值
            //实例化数据库上下文类
            DemoEntity demoEntity = new DemoEntity();
            //根据ID找到这条数据
            var data = demoEntity.Goods.Where(p => p.ID == good.ID).FirstOrDefault();
            //把我们新的值，赋值到老的这条数据上
            data.GoodName = good.GoodName;
            data.Price = good.Price;
            data.Weight = good.Weight;
            data.Color = good.Color;
            data.Brand = good.Brand;
            //最后要做一个保存的操作
            demoEntity.SaveChanges();
        }

        /// <summary>
        /// 新增一条数据
        /// </summary>
        /// <param name="good"></param>
        public void InsertGood(Goods good)
        {
            //实例化数据库上下文类
            DemoEntity demoEntity = new DemoEntity();
            //新增
            demoEntity.Goods.Add(good);
            //保存
            demoEntity.SaveChanges();
        }
    }
}
