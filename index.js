exports.execute = function(){
	require('./lib/client').execute();
};

if (module === require.main) {
    exports.execute();
}
