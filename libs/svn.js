/**
 * 通过svn得到用户信息
 * @author 	hirra
 * @param   svnPath [例如svn.meilishuo.com:80]
 * @param  	cb      [callback]
 */
exports.findUser = function(svnPath, cb) {
	var cmd = 'cd ~/.subversion/auth/svn.simple/ && ls | xargs cat $1';
	child_process.exec(cmd, function(err, data) {
		if (err) {
			cb && cb(err);
		} else {
			var fragment = data.split(svnPath)[1];
			fragment.replace(/username\n.+\n(\w+)\n/, function() {
				cb && cb(null, arguments[1]);
			})
		}
	});
};