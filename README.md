autocode
========
copy template code directory or file into your business module directory.
复制模板代码目录或文件到您的业务模块目录.

###How to use?
--------
1. 全局安装: <blockquote>npm install -g autocode</blockquote>
2. 进入你的项目工程根目录, 运行: <blockquote>autocode init</blockquote>该方法会在根目录下自动生成__.autocode__文件夹及其子文件夹和文件
3. 进入__.autocode__目录, 编辑__config.json__, 设置您的个人信息、您想自动生成的模块所存放的目标目录和模块名的对应关系  
    配置文件中默认使用__.autocode/tpl__作为您的代码模板目录, 您也通过修改这里的配置实现自定义自己的代码模板目录
4. 把你的代码模板放入上一步配置的代码模板目录里
5. 运行: <blockquote>autocode yourModule yourCustomModuleName</blockquote>

###Inner Variable
--------
autocode包含如下内置变量: __\_\_filepath\_\___、__\_\_filename\_\___、__\_\_date\_\___、__\_\_moduleprefix\_\___, 这些变量可用于代码模板内.  
* __\_\_moduleprefix\_\___: 该变量的值是上一步的 `yourCustomModuleName`
* __\_\_filepath\_\___: 生成的文件的路径
* __\_\_filename\_\___: 生成的文件名
* __\_\_date\_\___: 生成文件的日期
    
###Additional
--------
在上述`How to use?`第5步中的`yourModule`对应于代码模板目录下各子目录名.  
比如 __.autocode/tpl/ui__ 对应的`yourModule`为__ui__
    

     



