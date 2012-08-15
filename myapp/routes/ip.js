/*
 * GET home page.
 */

exports.ip = function(req, res){
  res.render('ip', { title: 'Simple Server' });
};
