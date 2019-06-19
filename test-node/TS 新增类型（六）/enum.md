# 解析
  1. enum 类型在 C++ 这些语言中比较常见，javascript 没有
  2. TS 在 ES 原有类型基础上加入枚举类型
  3. 这样在 TS 中也可以给一些难以理解的常量赋予一组具有意义的直观的名字，使其更为直观。对开发者比较友好，可以理解它就是一个字典
  4. TS 支持数字和字符串的枚举
  5. 定义一个枚举值时，可通过 Enum['key'] 或 Enum.key 的形式获取到对应的值 value

# 数字枚举
  1. 使用枚举值的元素值时，就像访问对象的属性一样
  2. 可使用 . 操作符和 [] 两种形式访问里面的值，和对象一样
  ```
    enum Status {
      Uploading,
      Success,
      Failed
    }
    console.log(Status.Uploading) // 0
    console.log(Status['Success'])  // 1
    console.log(Status.Failed)  // 2
  ```
  3. 定义枚举 Status 时，并没有指定索引号，因为这是默认的编号，也可自己指定
  ```
    // 修改起始编号
    enum Color {
      Red = 2,
      Blue,
      Yellow
    }
    console.log(Color.Red, Color.Blue, Color.Yellow)  // 2 3 4

    // 指定任意字段的索引值
    enum Status {
      Success = 200,
      NotFound = 404,
      Error = 500
    }
    console.log(Status.Success, Status.NotFound, Status.Error)  // 200 404 500

    // 指定部分字段，其他使用默认递增索引
    enum Status {
      Ok = 200,
      Created,
      Accepted,
      BadRequest = 400,
      Unauthorized
    }
    console.log(Status.Created, Status.Accepted, Status.Unauthorized) // 201 202 401
  ```
  4. 数字枚举定义值时，可使用计算值和常量
     要注意，如果某个字段使用了计算值或常量，那么该字段后面紧接着的字段必须设置初始值，不能使用默认的递增值
  ```
    const getValue = () => {
      return 0
    }
    enum ErrorIndex {
      a = getValue(),
      b,  // error 枚举成员必须具有初始化的值
      c // error
    }
    enum RightIndex {
      a = getValue(),
      b = 1,
      c
    } // 0 1 2
    
    const Start = 1
    enum Index {
      a = Start,
      b = 1,
      c
    } // 1 1 2
  ```

# 反向映射
  1. TS 支持反向映射，但反向映射只支持数字枚举，字符串枚举是不支持的
  ```
    enum Status {
      Success = 200,
      NotFound = 404,
      Error = 500
    }
    console.log(Status['Success'])  // 200
    console.log(Status[200])  // 'Success'
    console.log(Status[Status['Success']])  // 'Success'
    // TS 中定义的枚举，编译之后其实是对象
    // TS 会把我们定义的枚举值的字段名分别作为对象的属性名和值，把枚举值的字段值分别作为对象的值和属性名，同时添加到对象中
    // 这样既可以通过枚举值的字段名得到值，也可以通过枚举值的值得到字段名
    {
      200: 'Success',
      404: 'NotFound',
      500: 'Error',
      Error: 500,
      NotFound: 404,
      Success: 200
    }
  ```

# 字符串枚举
  1. TS 2.4 版新增了字符串枚举
  2. 字符串枚举值要求每个字段的值都必须是字符串字面量，或者是该枚举值中另一个字符串枚举成员
  ```
    enum Message {
      Error = 'Sorry, error',
      Success = 'Hoho, Success'
    }
    console.log(Message.Error)  // 'Sorry, error'

    enum Message {
      Error = 'error message',
      ServerError = Error,
      ClientError = Error
    }
    console.log(Message.Error)  // 'error message'
    console.log(Message.ServerError)  // 'error message'

    // 这里的其他枚举成员指的是同一个枚举值中的枚举成员
    // 因为字符串枚举不能使用常量或者计算值，所以也不能使用其他枚举值中的成员
  ```