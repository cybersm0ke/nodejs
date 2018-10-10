// var data = [{
//   item:'get milk'
// }   , {item:'walk dog'} , {item:'kick some coding'}];
//"test": "echo \"Error: no test specified\" && exit 1"

var bodyParser= require('body-parser');
//midleware -
var mongoose = require('mongoose');

mongoose.connect('mongodb://root:root123@ds127293.mlab.com:27293/todoapp');


var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo',todoSchema);


// var itemOne = Todo({item : 'buy flowers '}).save(function(err)
// {
//   if(err) throw err;
//
// });

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app)
{
        app.get('/todo',function(req,res)
        {
          Todo.find({},function(err,data)
            {
              if(err)throw err;
              res.render('todo',{todos:data});
            });
        });


        app.post('/todo',urlencodedParser,function(req,res)
        {

          var newTodo = Todo(req.body).save(function(err,data){

              if(err )throw err;

              res.json(data);

          });
            // data.push(req.body);
            // res.json(data);



        });



        app.delete('/todo/:item',function(req,res)
        {

          Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data)
          {
              if(err)throw err;

                res.json(data);

            });

          //   data = data.filter(function(todo)
          //   {
          //   //  console.log(req.params.item);
          //     //console.log(todo.item.replace(/ /g,'-'));
          //     return todo.item.replace(/ /g,'-') !== req.params.item ;
          //   });
          //   //console.log("updated data :" + data);
          //
          // res.json(data);
        });


};
