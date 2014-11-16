autocode
代码自动生成器
========
copy template code directory or file into your business module directory.
复制模板代码目录或文件到您的业务模块目录.

###How to use?
--------
* 全局安装: npm install -g autocode
* 进入你的项目工程根目录, 运行: autocode init
    该方法会在根目录下自动生成.autocode文件夹及其子文件夹和文件
* 进入.autocode目录, 编辑config.json, 设置您的个人信息、您想自动生成的模块所存放的目标目录和模块名的对应关系
    配置文件中默认使用.autocode/tpl作为您的代码模板目录, 您也通过修改这里的配置实现自定义自己的代码模板目录
* 把你的代码模板放入上一步配置的代码模板目录里
* 运行: autocode yourModule yourCustomModuleName

###Inner Variable
--------
autocode包含如下内置变量: __filepath__、__filename__、__date__、__moduleprefix__, 这些变量可用于代码模板内.
* __moduleprefix__: 该变量的值是上一步的 yourCustomModuleName
* __filepath__: 生成的文件的路径
* __filename__: 生成的文件名
* __date__: 生成文件的日期
    
###Additional
--------
在上述`How to use?`第5步中的yourModule对应于代码模板目录下各子目录名.<br>
比如 .autocode/tpl/ui 对应的yourModule为ui
    

     



