
exports.cookies = function(req, res){

  var data = {
    'texto': 'textodeprueba'
  }

  res.render('cookies', data);
}
