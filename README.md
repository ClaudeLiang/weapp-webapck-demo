# weapp-webapck-demo
通过webpack编译构建微信小程序

## 使用

创建微信小程序时，将目录设到build/src下，本地的开发目录在src下  

编译构建:  
```
$ npm run build
```

监听变化并重新编译  
```
$ npm run watch
```  

注意开发者工具上需要```ctrl+R```(```command+R```)来刷新
  
##说明
现有的微信开发者工具对小程序的支持已较为完善，但仍然存在以下问题：  
1、对第三方模块的支持，引入时需要完整的路径，不支持CommonJs风格的直接引入  
2、对ES2015的支持，无法使用很多很爽的新特性  
3、开发者工具的编辑和调试界面是同一屏上的不同tab，另经常双屏一边写代码一边看效果的开发同学很是不适

所以，通过这样一个简单的构建脚本，我们可以在一个屏幕上用喜爱的编辑器或IDE照常愉快的写js，在另一个屏幕上刷开发者工具看结果，提升开发体验

##注意
1、小程序的生命周期函数不要使用箭头函数，使用function才能用this访问到页面实例