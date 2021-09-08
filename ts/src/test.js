// 抽象类
// abstract class Amimal{    // 抽象类不能被实例化，const animal=new Animal() xx  静态方法只能访问静态属性
//      name:string;
//      constructor(name:string){
//         this.name=name
//     }
//     abstract sayHello():void; // 抽象方法没有方法体，子类必须实现
// }
// class Dog extends Amimal{
//      static age:string  // 如果是static静态属性，必须通过Dog.age才能访问  
//      age:string  // 实例属性，通过实例化去访问
//      constructor(name:string){
//         super(name)  // 子类必须super()调用父类的constructor才能 this.age 实例化自己的属性
//         this.age='12'
//     }
//     run(){
//         console.log('run');
//     }
//     sayHello(){
//         console.log('youdog');
//     }
// }
// const dog=new Dog('dog')
// console.log(dog.sayHello())
// console.log(dog.age)
// 函数重载
// function  getName(n:string):void 
// function  getName(t:object):string 
// function  getName(a:any,b?:any):any {
//     if(typeof a == "string"){
//         return 123
//     }
//     else{
//         return true
//     }
// }
// console.log(getName({name:'d'}));
// 函数多态 
// 接口
// interface myInterface{   // 接口可以重复声明  type obj{ name:string,age:number}  type obj{ test:1}  type 不能重复声明
//     name:string;         // 接口所有属性不能有实际的值 只能是类型
//     age:number
// }
// interface myInterface{
//     test:number
// }
// const obj:myInterface={ 
//     name:'11',
//     age:1,
//     test:1
// }
// console.log(obj);
// 可索引接口
// interface arrStr{
//     [index:number]:string // 对数组的约束
// }
// let arr:arrStr=['4','4']
// console.log(arr[0]);
// 类类型接口
// interface myInte{  // 接口中的方法是抽象方法
//     name:string;
//     sayHello():void  // 类必须实现
// }
// class Myclass implements myInte{
//     name: string;
//     constructor(name:string){
//         this.name=name
//     }
//     sayHello(): void {
//         throw new Error("Method not implemented.");
//     }
// }
// 接口可以继承接口
// interface son1{
//     name:string
// }
// interface son2 extends son1{
//     age:number
// }
// class test implements son2{
//     name:string;
//     age:number  
//     constructor(name:string){
//         this.name=name
//     }
//     work(){
//         console.log('work');
//     }
// }
// console.log(new test('test').name);
// 泛型
// function  fn<T>(a:T):T {
//     return a
// } 
// function fn1<T,K>(a:T,b:K):K {
//     return b
// }
// interface myInte{
//     length:number
// }
// function fn3<T extends myInte>(a:T) {
//     return a
// }
// console.log(fn3([3,4]))
// class Person<T extends myInte>{
//     name:T
//     constructor(name:T){
//         this.name=name
//     }
// }
// let son=new Person("df")
// 泛型接口
// interface MyIer<T>{
//     (name:T):T
// }
// var gameDATA=function<T>(params:T):T {
//     return params
// }
// let myData:MyIer<number>=gameDATA
// myData(11)
// public（默认） private protected(类和子类访问) set get ts存储器
// class Person {
//     public _name: string;
//     public _age: string;
//     constructor(name:string, age:string) {
//         this._name = name
//         this._age = age
//     }
// }
// let son = new Person('son', '12')
// console.log(son._name);
// 枚举
// enum myEnum{
//     up='ip',
//     down='dfs',
//     left='sdf',
//     right='sfd'
// }
// function  response(message:myEnum):void {
//     console.log(message)
// }
// response(myEnum.down)
// 数据类型
// string boolean number array tuple enum void(没有返回值，或者返回null,undefined) never null undefined  
// 定义数组的方式
// let arr1:number[]=[1,2]
// let arr2:Array<number>=[1,2]
// let arr3:any[]=['3',44]
// 定义元组
// let tuple1:[string,number]=['d',2]
// 类型兼容性
// interface Named{
//     name:string
// }
// let x:Named
// let y={name:'2',age:1}  // y中具有name，因此可以赋值给x
// x=y
// function greet(name:Named) {
//     console.log(name);
// }
// greet(y)
// interface DBI<T>{
//     add(info:T):boolean;
//     update(info:T):boolean;
// }
// class MD<T> implements DBI<T>{
//     add(info: T): boolean {
//         console.log(info);
//         throw new Error("Method not implemented.");
//     }
//     update(info: T): boolean {
//         throw new Error("Method not implemented.");
//     }
// }
// class User{
//     name:string;
//     age:string
// }
// var user=new User()
// user.name="sf"
// user.age="df"
// var md=new MD<User>()
// md.add(user)
// 命名空间 私有，外部访问需要暴露出去
// namespace A{
//     export class dog{
//         name:string;
//         age:number
//     }
// }
// namespace B{
//     export class dog{
//         name:string;
//         age:number
//     }
// }
// var dog=new A.dog()
// 装饰器：一个方法，可以注入到类，方法，属性
// 常见装饰器：类装饰器，属性装饰器，方法装饰器，参数装饰器
// 装饰器写法：普通装饰器，装饰器工厂（可以传参）
// 1 不可传参
// function logClass(params:any){
//     //params 指向了test
//     params.prototype.name="test"
// }
// @logClass
// class test{
//     constructor(){
//     }
// }
// 2 可以传参
// function logClass(params: any) {
//     return function (target) {
//         //target 指向了test
//         console.log(target);   
//     }
// }
// @logClass('aaa')
// class test {
//     constructor() {
//     }
// }
// console.log(new test());
//类装饰器
// function logClass(target:any){
//     //params 指向了test
//     return class extends target{
//         name='bbbb'
//     }
// }
// @logClass
// class test{
//     name:string
//     constructor(){
//         this.name='aaa'
//     }
// }
// console.log(new test().name); //bbb
// 属性装饰器
// function logClass(params: any) {    
//     return function (target) {
//         //target 指向了test
//         // console.log(target);   
//     }
// }
// function logProperty(params:any){
//     return function(target:any,attr:any){
//         console.log(params);
//         target[attr]=params
//     }
// }
// @logClass("xxx")
// class test{
//     @logProperty('http')
//     url:string
//     constructor(){
//     }
//     getData(){
//         return this.url
//     }
// }
//  console.log(new test().getData()); //bbb
// 方法装饰器
//  function logMethod(params:any){
//     return function(target:any,methodName:any,desc:any){
//     }
//  }
//  class HttpClient{
//      public url:string
//      constructor(){
//      }
//      @logMethod('http')
//      getData(){
//      }
//  }
// 参数装饰器
//   function logParams(params:any){
//     return function(target:any,paramsName:any,paramsIndex:any){
//     }
//  }
//  class HttpClient{
//      public url:string
//      constructor(){
//      }
//      getData(@logParams('uuid') uuid:any){
//      }
//  }
// 装饰器执行顺序
// 属性》方法》参数》类 有多个同样装饰器，从后面往后面执行
