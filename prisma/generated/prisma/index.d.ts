
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Saved
 * 
 */
export type Saved = $Result.DefaultSelection<Prisma.$SavedPayload>
/**
 * Model SavedItem
 * 
 */
export type SavedItem = $Result.DefaultSelection<Prisma.$SavedItemPayload>
/**
 * Model Seller
 * 
 */
export type Seller = $Result.DefaultSelection<Prisma.$SellerPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductImage
 * 
 */
export type ProductImage = $Result.DefaultSelection<Prisma.$ProductImagePayload>
/**
 * Model Checkout
 * 
 */
export type Checkout = $Result.DefaultSelection<Prisma.$CheckoutPayload>
/**
 * Model CheckoutItem
 * 
 */
export type CheckoutItem = $Result.DefaultSelection<Prisma.$CheckoutItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CheckoutStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
  FULFILLED: 'FULFILLED'
};

export type CheckoutStatus = (typeof CheckoutStatus)[keyof typeof CheckoutStatus]

}

export type CheckoutStatus = $Enums.CheckoutStatus

export const CheckoutStatus: typeof $Enums.CheckoutStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.saved`: Exposes CRUD operations for the **Saved** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Saveds
    * const saveds = await prisma.saved.findMany()
    * ```
    */
  get saved(): Prisma.SavedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedItem`: Exposes CRUD operations for the **SavedItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedItems
    * const savedItems = await prisma.savedItem.findMany()
    * ```
    */
  get savedItem(): Prisma.SavedItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seller`: Exposes CRUD operations for the **Seller** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sellers
    * const sellers = await prisma.seller.findMany()
    * ```
    */
  get seller(): Prisma.SellerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductImages
    * const productImages = await prisma.productImage.findMany()
    * ```
    */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.checkout`: Exposes CRUD operations for the **Checkout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Checkouts
    * const checkouts = await prisma.checkout.findMany()
    * ```
    */
  get checkout(): Prisma.CheckoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.checkoutItem`: Exposes CRUD operations for the **CheckoutItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CheckoutItems
    * const checkoutItems = await prisma.checkoutItem.findMany()
    * ```
    */
  get checkoutItem(): Prisma.CheckoutItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Saved: 'Saved',
    SavedItem: 'SavedItem',
    Seller: 'Seller',
    Category: 'Category',
    Product: 'Product',
    ProductImage: 'ProductImage',
    Checkout: 'Checkout',
    CheckoutItem: 'CheckoutItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "saved" | "savedItem" | "seller" | "category" | "product" | "productImage" | "checkout" | "checkoutItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Saved: {
        payload: Prisma.$SavedPayload<ExtArgs>
        fields: Prisma.SavedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>
          }
          findFirst: {
            args: Prisma.SavedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>
          }
          findMany: {
            args: Prisma.SavedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>[]
          }
          create: {
            args: Prisma.SavedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>
          }
          createMany: {
            args: Prisma.SavedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>[]
          }
          delete: {
            args: Prisma.SavedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>
          }
          update: {
            args: Prisma.SavedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>
          }
          deleteMany: {
            args: Prisma.SavedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>[]
          }
          upsert: {
            args: Prisma.SavedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPayload>
          }
          aggregate: {
            args: Prisma.SavedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaved>
          }
          groupBy: {
            args: Prisma.SavedGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedCountArgs<ExtArgs>
            result: $Utils.Optional<SavedCountAggregateOutputType> | number
          }
        }
      }
      SavedItem: {
        payload: Prisma.$SavedItemPayload<ExtArgs>
        fields: Prisma.SavedItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          findFirst: {
            args: Prisma.SavedItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          findMany: {
            args: Prisma.SavedItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>[]
          }
          create: {
            args: Prisma.SavedItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          createMany: {
            args: Prisma.SavedItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>[]
          }
          delete: {
            args: Prisma.SavedItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          update: {
            args: Prisma.SavedItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          deleteMany: {
            args: Prisma.SavedItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>[]
          }
          upsert: {
            args: Prisma.SavedItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          aggregate: {
            args: Prisma.SavedItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedItem>
          }
          groupBy: {
            args: Prisma.SavedItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedItemCountArgs<ExtArgs>
            result: $Utils.Optional<SavedItemCountAggregateOutputType> | number
          }
        }
      }
      Seller: {
        payload: Prisma.$SellerPayload<ExtArgs>
        fields: Prisma.SellerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SellerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SellerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          findFirst: {
            args: Prisma.SellerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SellerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          findMany: {
            args: Prisma.SellerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>[]
          }
          create: {
            args: Prisma.SellerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          createMany: {
            args: Prisma.SellerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SellerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>[]
          }
          delete: {
            args: Prisma.SellerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          update: {
            args: Prisma.SellerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          deleteMany: {
            args: Prisma.SellerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SellerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SellerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>[]
          }
          upsert: {
            args: Prisma.SellerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          aggregate: {
            args: Prisma.SellerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeller>
          }
          groupBy: {
            args: Prisma.SellerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SellerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SellerCountArgs<ExtArgs>
            result: $Utils.Optional<SellerCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>
        fields: Prisma.ProductImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductImage>
          }
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductImageCountAggregateOutputType> | number
          }
        }
      }
      Checkout: {
        payload: Prisma.$CheckoutPayload<ExtArgs>
        fields: Prisma.CheckoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CheckoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CheckoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>
          }
          findFirst: {
            args: Prisma.CheckoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CheckoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>
          }
          findMany: {
            args: Prisma.CheckoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>[]
          }
          create: {
            args: Prisma.CheckoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>
          }
          createMany: {
            args: Prisma.CheckoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CheckoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>[]
          }
          delete: {
            args: Prisma.CheckoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>
          }
          update: {
            args: Prisma.CheckoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>
          }
          deleteMany: {
            args: Prisma.CheckoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CheckoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CheckoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>[]
          }
          upsert: {
            args: Prisma.CheckoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutPayload>
          }
          aggregate: {
            args: Prisma.CheckoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCheckout>
          }
          groupBy: {
            args: Prisma.CheckoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<CheckoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.CheckoutCountArgs<ExtArgs>
            result: $Utils.Optional<CheckoutCountAggregateOutputType> | number
          }
        }
      }
      CheckoutItem: {
        payload: Prisma.$CheckoutItemPayload<ExtArgs>
        fields: Prisma.CheckoutItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CheckoutItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CheckoutItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>
          }
          findFirst: {
            args: Prisma.CheckoutItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CheckoutItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>
          }
          findMany: {
            args: Prisma.CheckoutItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>[]
          }
          create: {
            args: Prisma.CheckoutItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>
          }
          createMany: {
            args: Prisma.CheckoutItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CheckoutItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>[]
          }
          delete: {
            args: Prisma.CheckoutItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>
          }
          update: {
            args: Prisma.CheckoutItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>
          }
          deleteMany: {
            args: Prisma.CheckoutItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CheckoutItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CheckoutItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>[]
          }
          upsert: {
            args: Prisma.CheckoutItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutItemPayload>
          }
          aggregate: {
            args: Prisma.CheckoutItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCheckoutItem>
          }
          groupBy: {
            args: Prisma.CheckoutItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CheckoutItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CheckoutItemCountArgs<ExtArgs>
            result: $Utils.Optional<CheckoutItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    saved?: SavedOmit
    savedItem?: SavedItemOmit
    seller?: SellerOmit
    category?: CategoryOmit
    product?: ProductOmit
    productImage?: ProductImageOmit
    checkout?: CheckoutOmit
    checkoutItem?: CheckoutItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    checkouts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkouts?: boolean | UserCountOutputTypeCountCheckoutsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCheckoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutWhereInput
  }


  /**
   * Count Type SavedCountOutputType
   */

  export type SavedCountOutputType = {
    items: number
  }

  export type SavedCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | SavedCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * SavedCountOutputType without action
   */
  export type SavedCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedCountOutputType
     */
    select?: SavedCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SavedCountOutputType without action
   */
  export type SavedCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedItemWhereInput
  }


  /**
   * Count Type SellerCountOutputType
   */

  export type SellerCountOutputType = {
    products: number
  }

  export type SellerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | SellerCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * SellerCountOutputType without action
   */
  export type SellerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerCountOutputType
     */
    select?: SellerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SellerCountOutputType without action
   */
  export type SellerCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    images: number
    checkoutItem: number
    savedItem: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ProductCountOutputTypeCountImagesArgs
    checkoutItem?: boolean | ProductCountOutputTypeCountCheckoutItemArgs
    savedItem?: boolean | ProductCountOutputTypeCountSavedItemArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCheckoutItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSavedItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedItemWhereInput
  }


  /**
   * Count Type CheckoutCountOutputType
   */

  export type CheckoutCountOutputType = {
    items: number
  }

  export type CheckoutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CheckoutCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CheckoutCountOutputType without action
   */
  export type CheckoutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutCountOutputType
     */
    select?: CheckoutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CheckoutCountOutputType without action
   */
  export type CheckoutCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    profilePhotoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    profilePhotoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    profilePhotoUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    profilePhotoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    profilePhotoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    profilePhotoUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    profilePhotoUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    saved?: boolean | User$savedArgs<ExtArgs>
    checkouts?: boolean | User$checkoutsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "profilePhotoUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saved?: boolean | User$savedArgs<ExtArgs>
    checkouts?: boolean | User$checkoutsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      saved: Prisma.$SavedPayload<ExtArgs> | null
      checkouts: Prisma.$CheckoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      profilePhotoUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    saved<T extends User$savedArgs<ExtArgs> = {}>(args?: Subset<T, User$savedArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    checkouts<T extends User$checkoutsArgs<ExtArgs> = {}>(args?: Subset<T, User$checkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly profilePhotoUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.saved
   */
  export type User$savedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    where?: SavedWhereInput
  }

  /**
   * User.checkouts
   */
  export type User$checkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    where?: CheckoutWhereInput
    orderBy?: CheckoutOrderByWithRelationInput | CheckoutOrderByWithRelationInput[]
    cursor?: CheckoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckoutScalarFieldEnum | CheckoutScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Saved
   */

  export type AggregateSaved = {
    _count: SavedCountAggregateOutputType | null
    _min: SavedMinAggregateOutputType | null
    _max: SavedMaxAggregateOutputType | null
  }

  export type SavedMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SavedMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SavedCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SavedMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SavedMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SavedCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SavedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Saved to aggregate.
     */
    where?: SavedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saveds to fetch.
     */
    orderBy?: SavedOrderByWithRelationInput | SavedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saveds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Saveds
    **/
    _count?: true | SavedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedMaxAggregateInputType
  }

  export type GetSavedAggregateType<T extends SavedAggregateArgs> = {
        [P in keyof T & keyof AggregateSaved]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaved[P]>
      : GetScalarType<T[P], AggregateSaved[P]>
  }




  export type SavedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedWhereInput
    orderBy?: SavedOrderByWithAggregationInput | SavedOrderByWithAggregationInput[]
    by: SavedScalarFieldEnum[] | SavedScalarFieldEnum
    having?: SavedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedCountAggregateInputType | true
    _min?: SavedMinAggregateInputType
    _max?: SavedMaxAggregateInputType
  }

  export type SavedGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: SavedCountAggregateOutputType | null
    _min: SavedMinAggregateOutputType | null
    _max: SavedMaxAggregateOutputType | null
  }

  type GetSavedGroupByPayload<T extends SavedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedGroupByOutputType[P]>
            : GetScalarType<T[P], SavedGroupByOutputType[P]>
        }
      >
    >


  export type SavedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Saved$itemsArgs<ExtArgs>
    _count?: boolean | SavedCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saved"]>

  export type SavedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saved"]>

  export type SavedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saved"]>

  export type SavedSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SavedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["saved"]>
  export type SavedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Saved$itemsArgs<ExtArgs>
    _count?: boolean | SavedCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SavedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Saved"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$SavedItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["saved"]>
    composites: {}
  }

  type SavedGetPayload<S extends boolean | null | undefined | SavedDefaultArgs> = $Result.GetResult<Prisma.$SavedPayload, S>

  type SavedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedCountAggregateInputType | true
    }

  export interface SavedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Saved'], meta: { name: 'Saved' } }
    /**
     * Find zero or one Saved that matches the filter.
     * @param {SavedFindUniqueArgs} args - Arguments to find a Saved
     * @example
     * // Get one Saved
     * const saved = await prisma.saved.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedFindUniqueArgs>(args: SelectSubset<T, SavedFindUniqueArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Saved that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedFindUniqueOrThrowArgs} args - Arguments to find a Saved
     * @example
     * // Get one Saved
     * const saved = await prisma.saved.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Saved that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFindFirstArgs} args - Arguments to find a Saved
     * @example
     * // Get one Saved
     * const saved = await prisma.saved.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedFindFirstArgs>(args?: SelectSubset<T, SavedFindFirstArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Saved that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFindFirstOrThrowArgs} args - Arguments to find a Saved
     * @example
     * // Get one Saved
     * const saved = await prisma.saved.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Saveds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Saveds
     * const saveds = await prisma.saved.findMany()
     * 
     * // Get first 10 Saveds
     * const saveds = await prisma.saved.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedWithIdOnly = await prisma.saved.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedFindManyArgs>(args?: SelectSubset<T, SavedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Saved.
     * @param {SavedCreateArgs} args - Arguments to create a Saved.
     * @example
     * // Create one Saved
     * const Saved = await prisma.saved.create({
     *   data: {
     *     // ... data to create a Saved
     *   }
     * })
     * 
     */
    create<T extends SavedCreateArgs>(args: SelectSubset<T, SavedCreateArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Saveds.
     * @param {SavedCreateManyArgs} args - Arguments to create many Saveds.
     * @example
     * // Create many Saveds
     * const saved = await prisma.saved.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedCreateManyArgs>(args?: SelectSubset<T, SavedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Saveds and returns the data saved in the database.
     * @param {SavedCreateManyAndReturnArgs} args - Arguments to create many Saveds.
     * @example
     * // Create many Saveds
     * const saved = await prisma.saved.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Saveds and only return the `id`
     * const savedWithIdOnly = await prisma.saved.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Saved.
     * @param {SavedDeleteArgs} args - Arguments to delete one Saved.
     * @example
     * // Delete one Saved
     * const Saved = await prisma.saved.delete({
     *   where: {
     *     // ... filter to delete one Saved
     *   }
     * })
     * 
     */
    delete<T extends SavedDeleteArgs>(args: SelectSubset<T, SavedDeleteArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Saved.
     * @param {SavedUpdateArgs} args - Arguments to update one Saved.
     * @example
     * // Update one Saved
     * const saved = await prisma.saved.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedUpdateArgs>(args: SelectSubset<T, SavedUpdateArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Saveds.
     * @param {SavedDeleteManyArgs} args - Arguments to filter Saveds to delete.
     * @example
     * // Delete a few Saveds
     * const { count } = await prisma.saved.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedDeleteManyArgs>(args?: SelectSubset<T, SavedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Saveds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Saveds
     * const saved = await prisma.saved.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedUpdateManyArgs>(args: SelectSubset<T, SavedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Saveds and returns the data updated in the database.
     * @param {SavedUpdateManyAndReturnArgs} args - Arguments to update many Saveds.
     * @example
     * // Update many Saveds
     * const saved = await prisma.saved.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Saveds and only return the `id`
     * const savedWithIdOnly = await prisma.saved.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Saved.
     * @param {SavedUpsertArgs} args - Arguments to update or create a Saved.
     * @example
     * // Update or create a Saved
     * const saved = await prisma.saved.upsert({
     *   create: {
     *     // ... data to create a Saved
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Saved we want to update
     *   }
     * })
     */
    upsert<T extends SavedUpsertArgs>(args: SelectSubset<T, SavedUpsertArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Saveds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedCountArgs} args - Arguments to filter Saveds to count.
     * @example
     * // Count the number of Saveds
     * const count = await prisma.saved.count({
     *   where: {
     *     // ... the filter for the Saveds we want to count
     *   }
     * })
    **/
    count<T extends SavedCountArgs>(
      args?: Subset<T, SavedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Saved.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedAggregateArgs>(args: Subset<T, SavedAggregateArgs>): Prisma.PrismaPromise<GetSavedAggregateType<T>>

    /**
     * Group by Saved.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedGroupByArgs['orderBy'] }
        : { orderBy?: SavedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Saved model
   */
  readonly fields: SavedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Saved.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Saved$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Saved$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Saved model
   */
  interface SavedFieldRefs {
    readonly id: FieldRef<"Saved", 'String'>
    readonly userId: FieldRef<"Saved", 'String'>
    readonly createdAt: FieldRef<"Saved", 'DateTime'>
    readonly updatedAt: FieldRef<"Saved", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Saved findUnique
   */
  export type SavedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * Filter, which Saved to fetch.
     */
    where: SavedWhereUniqueInput
  }

  /**
   * Saved findUniqueOrThrow
   */
  export type SavedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * Filter, which Saved to fetch.
     */
    where: SavedWhereUniqueInput
  }

  /**
   * Saved findFirst
   */
  export type SavedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * Filter, which Saved to fetch.
     */
    where?: SavedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saveds to fetch.
     */
    orderBy?: SavedOrderByWithRelationInput | SavedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Saveds.
     */
    cursor?: SavedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saveds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Saveds.
     */
    distinct?: SavedScalarFieldEnum | SavedScalarFieldEnum[]
  }

  /**
   * Saved findFirstOrThrow
   */
  export type SavedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * Filter, which Saved to fetch.
     */
    where?: SavedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saveds to fetch.
     */
    orderBy?: SavedOrderByWithRelationInput | SavedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Saveds.
     */
    cursor?: SavedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saveds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Saveds.
     */
    distinct?: SavedScalarFieldEnum | SavedScalarFieldEnum[]
  }

  /**
   * Saved findMany
   */
  export type SavedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * Filter, which Saveds to fetch.
     */
    where?: SavedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saveds to fetch.
     */
    orderBy?: SavedOrderByWithRelationInput | SavedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Saveds.
     */
    cursor?: SavedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saveds.
     */
    skip?: number
    distinct?: SavedScalarFieldEnum | SavedScalarFieldEnum[]
  }

  /**
   * Saved create
   */
  export type SavedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * The data needed to create a Saved.
     */
    data: XOR<SavedCreateInput, SavedUncheckedCreateInput>
  }

  /**
   * Saved createMany
   */
  export type SavedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Saveds.
     */
    data: SavedCreateManyInput | SavedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Saved createManyAndReturn
   */
  export type SavedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * The data used to create many Saveds.
     */
    data: SavedCreateManyInput | SavedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Saved update
   */
  export type SavedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * The data needed to update a Saved.
     */
    data: XOR<SavedUpdateInput, SavedUncheckedUpdateInput>
    /**
     * Choose, which Saved to update.
     */
    where: SavedWhereUniqueInput
  }

  /**
   * Saved updateMany
   */
  export type SavedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Saveds.
     */
    data: XOR<SavedUpdateManyMutationInput, SavedUncheckedUpdateManyInput>
    /**
     * Filter which Saveds to update
     */
    where?: SavedWhereInput
    /**
     * Limit how many Saveds to update.
     */
    limit?: number
  }

  /**
   * Saved updateManyAndReturn
   */
  export type SavedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * The data used to update Saveds.
     */
    data: XOR<SavedUpdateManyMutationInput, SavedUncheckedUpdateManyInput>
    /**
     * Filter which Saveds to update
     */
    where?: SavedWhereInput
    /**
     * Limit how many Saveds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Saved upsert
   */
  export type SavedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * The filter to search for the Saved to update in case it exists.
     */
    where: SavedWhereUniqueInput
    /**
     * In case the Saved found by the `where` argument doesn't exist, create a new Saved with this data.
     */
    create: XOR<SavedCreateInput, SavedUncheckedCreateInput>
    /**
     * In case the Saved was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedUpdateInput, SavedUncheckedUpdateInput>
  }

  /**
   * Saved delete
   */
  export type SavedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
    /**
     * Filter which Saved to delete.
     */
    where: SavedWhereUniqueInput
  }

  /**
   * Saved deleteMany
   */
  export type SavedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Saveds to delete
     */
    where?: SavedWhereInput
    /**
     * Limit how many Saveds to delete.
     */
    limit?: number
  }

  /**
   * Saved.items
   */
  export type Saved$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    where?: SavedItemWhereInput
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    cursor?: SavedItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * Saved without action
   */
  export type SavedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saved
     */
    select?: SavedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saved
     */
    omit?: SavedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedInclude<ExtArgs> | null
  }


  /**
   * Model SavedItem
   */

  export type AggregateSavedItem = {
    _count: SavedItemCountAggregateOutputType | null
    _min: SavedItemMinAggregateOutputType | null
    _max: SavedItemMaxAggregateOutputType | null
  }

  export type SavedItemMinAggregateOutputType = {
    id: string | null
    savedId: string | null
    productId: string | null
    createdAt: Date | null
  }

  export type SavedItemMaxAggregateOutputType = {
    id: string | null
    savedId: string | null
    productId: string | null
    createdAt: Date | null
  }

  export type SavedItemCountAggregateOutputType = {
    id: number
    savedId: number
    productId: number
    createdAt: number
    _all: number
  }


  export type SavedItemMinAggregateInputType = {
    id?: true
    savedId?: true
    productId?: true
    createdAt?: true
  }

  export type SavedItemMaxAggregateInputType = {
    id?: true
    savedId?: true
    productId?: true
    createdAt?: true
  }

  export type SavedItemCountAggregateInputType = {
    id?: true
    savedId?: true
    productId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedItem to aggregate.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedItems
    **/
    _count?: true | SavedItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedItemMaxAggregateInputType
  }

  export type GetSavedItemAggregateType<T extends SavedItemAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedItem[P]>
      : GetScalarType<T[P], AggregateSavedItem[P]>
  }




  export type SavedItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedItemWhereInput
    orderBy?: SavedItemOrderByWithAggregationInput | SavedItemOrderByWithAggregationInput[]
    by: SavedItemScalarFieldEnum[] | SavedItemScalarFieldEnum
    having?: SavedItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedItemCountAggregateInputType | true
    _min?: SavedItemMinAggregateInputType
    _max?: SavedItemMaxAggregateInputType
  }

  export type SavedItemGroupByOutputType = {
    id: string
    savedId: string
    productId: string
    createdAt: Date
    _count: SavedItemCountAggregateOutputType | null
    _min: SavedItemMinAggregateOutputType | null
    _max: SavedItemMaxAggregateOutputType | null
  }

  type GetSavedItemGroupByPayload<T extends SavedItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedItemGroupByOutputType[P]>
            : GetScalarType<T[P], SavedItemGroupByOutputType[P]>
        }
      >
    >


  export type SavedItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    savedId?: boolean
    productId?: boolean
    createdAt?: boolean
    saved?: boolean | SavedDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedItem"]>

  export type SavedItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    savedId?: boolean
    productId?: boolean
    createdAt?: boolean
    saved?: boolean | SavedDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedItem"]>

  export type SavedItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    savedId?: boolean
    productId?: boolean
    createdAt?: boolean
    saved?: boolean | SavedDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedItem"]>

  export type SavedItemSelectScalar = {
    id?: boolean
    savedId?: boolean
    productId?: boolean
    createdAt?: boolean
  }

  export type SavedItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "savedId" | "productId" | "createdAt", ExtArgs["result"]["savedItem"]>
  export type SavedItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saved?: boolean | SavedDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SavedItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saved?: boolean | SavedDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SavedItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saved?: boolean | SavedDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $SavedItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedItem"
    objects: {
      saved: Prisma.$SavedPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      savedId: string
      productId: string
      createdAt: Date
    }, ExtArgs["result"]["savedItem"]>
    composites: {}
  }

  type SavedItemGetPayload<S extends boolean | null | undefined | SavedItemDefaultArgs> = $Result.GetResult<Prisma.$SavedItemPayload, S>

  type SavedItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedItemCountAggregateInputType | true
    }

  export interface SavedItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedItem'], meta: { name: 'SavedItem' } }
    /**
     * Find zero or one SavedItem that matches the filter.
     * @param {SavedItemFindUniqueArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedItemFindUniqueArgs>(args: SelectSubset<T, SavedItemFindUniqueArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedItemFindUniqueOrThrowArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedItemFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemFindFirstArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedItemFindFirstArgs>(args?: SelectSubset<T, SavedItemFindFirstArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemFindFirstOrThrowArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedItemFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedItems
     * const savedItems = await prisma.savedItem.findMany()
     * 
     * // Get first 10 SavedItems
     * const savedItems = await prisma.savedItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedItemWithIdOnly = await prisma.savedItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedItemFindManyArgs>(args?: SelectSubset<T, SavedItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedItem.
     * @param {SavedItemCreateArgs} args - Arguments to create a SavedItem.
     * @example
     * // Create one SavedItem
     * const SavedItem = await prisma.savedItem.create({
     *   data: {
     *     // ... data to create a SavedItem
     *   }
     * })
     * 
     */
    create<T extends SavedItemCreateArgs>(args: SelectSubset<T, SavedItemCreateArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedItems.
     * @param {SavedItemCreateManyArgs} args - Arguments to create many SavedItems.
     * @example
     * // Create many SavedItems
     * const savedItem = await prisma.savedItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedItemCreateManyArgs>(args?: SelectSubset<T, SavedItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedItems and returns the data saved in the database.
     * @param {SavedItemCreateManyAndReturnArgs} args - Arguments to create many SavedItems.
     * @example
     * // Create many SavedItems
     * const savedItem = await prisma.savedItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedItems and only return the `id`
     * const savedItemWithIdOnly = await prisma.savedItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedItemCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedItem.
     * @param {SavedItemDeleteArgs} args - Arguments to delete one SavedItem.
     * @example
     * // Delete one SavedItem
     * const SavedItem = await prisma.savedItem.delete({
     *   where: {
     *     // ... filter to delete one SavedItem
     *   }
     * })
     * 
     */
    delete<T extends SavedItemDeleteArgs>(args: SelectSubset<T, SavedItemDeleteArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedItem.
     * @param {SavedItemUpdateArgs} args - Arguments to update one SavedItem.
     * @example
     * // Update one SavedItem
     * const savedItem = await prisma.savedItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedItemUpdateArgs>(args: SelectSubset<T, SavedItemUpdateArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedItems.
     * @param {SavedItemDeleteManyArgs} args - Arguments to filter SavedItems to delete.
     * @example
     * // Delete a few SavedItems
     * const { count } = await prisma.savedItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedItemDeleteManyArgs>(args?: SelectSubset<T, SavedItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedItems
     * const savedItem = await prisma.savedItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedItemUpdateManyArgs>(args: SelectSubset<T, SavedItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedItems and returns the data updated in the database.
     * @param {SavedItemUpdateManyAndReturnArgs} args - Arguments to update many SavedItems.
     * @example
     * // Update many SavedItems
     * const savedItem = await prisma.savedItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedItems and only return the `id`
     * const savedItemWithIdOnly = await prisma.savedItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedItemUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedItem.
     * @param {SavedItemUpsertArgs} args - Arguments to update or create a SavedItem.
     * @example
     * // Update or create a SavedItem
     * const savedItem = await prisma.savedItem.upsert({
     *   create: {
     *     // ... data to create a SavedItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedItem we want to update
     *   }
     * })
     */
    upsert<T extends SavedItemUpsertArgs>(args: SelectSubset<T, SavedItemUpsertArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemCountArgs} args - Arguments to filter SavedItems to count.
     * @example
     * // Count the number of SavedItems
     * const count = await prisma.savedItem.count({
     *   where: {
     *     // ... the filter for the SavedItems we want to count
     *   }
     * })
    **/
    count<T extends SavedItemCountArgs>(
      args?: Subset<T, SavedItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedItemAggregateArgs>(args: Subset<T, SavedItemAggregateArgs>): Prisma.PrismaPromise<GetSavedItemAggregateType<T>>

    /**
     * Group by SavedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedItemGroupByArgs['orderBy'] }
        : { orderBy?: SavedItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedItem model
   */
  readonly fields: SavedItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    saved<T extends SavedDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SavedDefaultArgs<ExtArgs>>): Prisma__SavedClient<$Result.GetResult<Prisma.$SavedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedItem model
   */
  interface SavedItemFieldRefs {
    readonly id: FieldRef<"SavedItem", 'String'>
    readonly savedId: FieldRef<"SavedItem", 'String'>
    readonly productId: FieldRef<"SavedItem", 'String'>
    readonly createdAt: FieldRef<"SavedItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedItem findUnique
   */
  export type SavedItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem findUniqueOrThrow
   */
  export type SavedItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem findFirst
   */
  export type SavedItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedItems.
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedItems.
     */
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * SavedItem findFirstOrThrow
   */
  export type SavedItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedItems.
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedItems.
     */
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * SavedItem findMany
   */
  export type SavedItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItems to fetch.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedItems.
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * SavedItem create
   */
  export type SavedItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedItem.
     */
    data: XOR<SavedItemCreateInput, SavedItemUncheckedCreateInput>
  }

  /**
   * SavedItem createMany
   */
  export type SavedItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedItems.
     */
    data: SavedItemCreateManyInput | SavedItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedItem createManyAndReturn
   */
  export type SavedItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * The data used to create many SavedItems.
     */
    data: SavedItemCreateManyInput | SavedItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedItem update
   */
  export type SavedItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedItem.
     */
    data: XOR<SavedItemUpdateInput, SavedItemUncheckedUpdateInput>
    /**
     * Choose, which SavedItem to update.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem updateMany
   */
  export type SavedItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedItems.
     */
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyInput>
    /**
     * Filter which SavedItems to update
     */
    where?: SavedItemWhereInput
    /**
     * Limit how many SavedItems to update.
     */
    limit?: number
  }

  /**
   * SavedItem updateManyAndReturn
   */
  export type SavedItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * The data used to update SavedItems.
     */
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyInput>
    /**
     * Filter which SavedItems to update
     */
    where?: SavedItemWhereInput
    /**
     * Limit how many SavedItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedItem upsert
   */
  export type SavedItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedItem to update in case it exists.
     */
    where: SavedItemWhereUniqueInput
    /**
     * In case the SavedItem found by the `where` argument doesn't exist, create a new SavedItem with this data.
     */
    create: XOR<SavedItemCreateInput, SavedItemUncheckedCreateInput>
    /**
     * In case the SavedItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedItemUpdateInput, SavedItemUncheckedUpdateInput>
  }

  /**
   * SavedItem delete
   */
  export type SavedItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter which SavedItem to delete.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem deleteMany
   */
  export type SavedItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedItems to delete
     */
    where?: SavedItemWhereInput
    /**
     * Limit how many SavedItems to delete.
     */
    limit?: number
  }

  /**
   * SavedItem without action
   */
  export type SavedItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
  }


  /**
   * Model Seller
   */

  export type AggregateSeller = {
    _count: SellerCountAggregateOutputType | null
    _min: SellerMinAggregateOutputType | null
    _max: SellerMaxAggregateOutputType | null
  }

  export type SellerMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    profilePhotoUrl: string | null
    motto: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SellerMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    profilePhotoUrl: string | null
    motto: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SellerCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    profilePhotoUrl: number
    motto: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SellerMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    profilePhotoUrl?: true
    motto?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SellerMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    profilePhotoUrl?: true
    motto?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SellerCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    profilePhotoUrl?: true
    motto?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SellerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seller to aggregate.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sellers
    **/
    _count?: true | SellerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SellerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SellerMaxAggregateInputType
  }

  export type GetSellerAggregateType<T extends SellerAggregateArgs> = {
        [P in keyof T & keyof AggregateSeller]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeller[P]>
      : GetScalarType<T[P], AggregateSeller[P]>
  }




  export type SellerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SellerWhereInput
    orderBy?: SellerOrderByWithAggregationInput | SellerOrderByWithAggregationInput[]
    by: SellerScalarFieldEnum[] | SellerScalarFieldEnum
    having?: SellerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SellerCountAggregateInputType | true
    _min?: SellerMinAggregateInputType
    _max?: SellerMaxAggregateInputType
  }

  export type SellerGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    profilePhotoUrl: string | null
    motto: string | null
    createdAt: Date
    updatedAt: Date
    _count: SellerCountAggregateOutputType | null
    _min: SellerMinAggregateOutputType | null
    _max: SellerMaxAggregateOutputType | null
  }

  type GetSellerGroupByPayload<T extends SellerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SellerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SellerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SellerGroupByOutputType[P]>
            : GetScalarType<T[P], SellerGroupByOutputType[P]>
        }
      >
    >


  export type SellerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    motto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Seller$productsArgs<ExtArgs>
    _count?: boolean | SellerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seller"]>

  export type SellerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    motto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seller"]>

  export type SellerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    motto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seller"]>

  export type SellerSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    profilePhotoUrl?: boolean
    motto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SellerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "profilePhotoUrl" | "motto" | "createdAt" | "updatedAt", ExtArgs["result"]["seller"]>
  export type SellerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Seller$productsArgs<ExtArgs>
    _count?: boolean | SellerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SellerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SellerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SellerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Seller"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      profilePhotoUrl: string | null
      motto: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["seller"]>
    composites: {}
  }

  type SellerGetPayload<S extends boolean | null | undefined | SellerDefaultArgs> = $Result.GetResult<Prisma.$SellerPayload, S>

  type SellerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SellerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SellerCountAggregateInputType | true
    }

  export interface SellerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Seller'], meta: { name: 'Seller' } }
    /**
     * Find zero or one Seller that matches the filter.
     * @param {SellerFindUniqueArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SellerFindUniqueArgs>(args: SelectSubset<T, SellerFindUniqueArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Seller that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SellerFindUniqueOrThrowArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SellerFindUniqueOrThrowArgs>(args: SelectSubset<T, SellerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seller that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerFindFirstArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SellerFindFirstArgs>(args?: SelectSubset<T, SellerFindFirstArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seller that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerFindFirstOrThrowArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SellerFindFirstOrThrowArgs>(args?: SelectSubset<T, SellerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sellers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sellers
     * const sellers = await prisma.seller.findMany()
     * 
     * // Get first 10 Sellers
     * const sellers = await prisma.seller.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sellerWithIdOnly = await prisma.seller.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SellerFindManyArgs>(args?: SelectSubset<T, SellerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Seller.
     * @param {SellerCreateArgs} args - Arguments to create a Seller.
     * @example
     * // Create one Seller
     * const Seller = await prisma.seller.create({
     *   data: {
     *     // ... data to create a Seller
     *   }
     * })
     * 
     */
    create<T extends SellerCreateArgs>(args: SelectSubset<T, SellerCreateArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sellers.
     * @param {SellerCreateManyArgs} args - Arguments to create many Sellers.
     * @example
     * // Create many Sellers
     * const seller = await prisma.seller.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SellerCreateManyArgs>(args?: SelectSubset<T, SellerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sellers and returns the data saved in the database.
     * @param {SellerCreateManyAndReturnArgs} args - Arguments to create many Sellers.
     * @example
     * // Create many Sellers
     * const seller = await prisma.seller.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sellers and only return the `id`
     * const sellerWithIdOnly = await prisma.seller.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SellerCreateManyAndReturnArgs>(args?: SelectSubset<T, SellerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Seller.
     * @param {SellerDeleteArgs} args - Arguments to delete one Seller.
     * @example
     * // Delete one Seller
     * const Seller = await prisma.seller.delete({
     *   where: {
     *     // ... filter to delete one Seller
     *   }
     * })
     * 
     */
    delete<T extends SellerDeleteArgs>(args: SelectSubset<T, SellerDeleteArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Seller.
     * @param {SellerUpdateArgs} args - Arguments to update one Seller.
     * @example
     * // Update one Seller
     * const seller = await prisma.seller.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SellerUpdateArgs>(args: SelectSubset<T, SellerUpdateArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sellers.
     * @param {SellerDeleteManyArgs} args - Arguments to filter Sellers to delete.
     * @example
     * // Delete a few Sellers
     * const { count } = await prisma.seller.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SellerDeleteManyArgs>(args?: SelectSubset<T, SellerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sellers
     * const seller = await prisma.seller.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SellerUpdateManyArgs>(args: SelectSubset<T, SellerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sellers and returns the data updated in the database.
     * @param {SellerUpdateManyAndReturnArgs} args - Arguments to update many Sellers.
     * @example
     * // Update many Sellers
     * const seller = await prisma.seller.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sellers and only return the `id`
     * const sellerWithIdOnly = await prisma.seller.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SellerUpdateManyAndReturnArgs>(args: SelectSubset<T, SellerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Seller.
     * @param {SellerUpsertArgs} args - Arguments to update or create a Seller.
     * @example
     * // Update or create a Seller
     * const seller = await prisma.seller.upsert({
     *   create: {
     *     // ... data to create a Seller
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seller we want to update
     *   }
     * })
     */
    upsert<T extends SellerUpsertArgs>(args: SelectSubset<T, SellerUpsertArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerCountArgs} args - Arguments to filter Sellers to count.
     * @example
     * // Count the number of Sellers
     * const count = await prisma.seller.count({
     *   where: {
     *     // ... the filter for the Sellers we want to count
     *   }
     * })
    **/
    count<T extends SellerCountArgs>(
      args?: Subset<T, SellerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SellerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Seller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SellerAggregateArgs>(args: Subset<T, SellerAggregateArgs>): Prisma.PrismaPromise<GetSellerAggregateType<T>>

    /**
     * Group by Seller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SellerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SellerGroupByArgs['orderBy'] }
        : { orderBy?: SellerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SellerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSellerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Seller model
   */
  readonly fields: SellerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Seller.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SellerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Seller$productsArgs<ExtArgs> = {}>(args?: Subset<T, Seller$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Seller model
   */
  interface SellerFieldRefs {
    readonly id: FieldRef<"Seller", 'String'>
    readonly username: FieldRef<"Seller", 'String'>
    readonly email: FieldRef<"Seller", 'String'>
    readonly password: FieldRef<"Seller", 'String'>
    readonly profilePhotoUrl: FieldRef<"Seller", 'String'>
    readonly motto: FieldRef<"Seller", 'String'>
    readonly createdAt: FieldRef<"Seller", 'DateTime'>
    readonly updatedAt: FieldRef<"Seller", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Seller findUnique
   */
  export type SellerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller findUniqueOrThrow
   */
  export type SellerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller findFirst
   */
  export type SellerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sellers.
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sellers.
     */
    distinct?: SellerScalarFieldEnum | SellerScalarFieldEnum[]
  }

  /**
   * Seller findFirstOrThrow
   */
  export type SellerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sellers.
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sellers.
     */
    distinct?: SellerScalarFieldEnum | SellerScalarFieldEnum[]
  }

  /**
   * Seller findMany
   */
  export type SellerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Sellers to fetch.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sellers.
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    distinct?: SellerScalarFieldEnum | SellerScalarFieldEnum[]
  }

  /**
   * Seller create
   */
  export type SellerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * The data needed to create a Seller.
     */
    data: XOR<SellerCreateInput, SellerUncheckedCreateInput>
  }

  /**
   * Seller createMany
   */
  export type SellerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sellers.
     */
    data: SellerCreateManyInput | SellerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Seller createManyAndReturn
   */
  export type SellerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * The data used to create many Sellers.
     */
    data: SellerCreateManyInput | SellerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Seller update
   */
  export type SellerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * The data needed to update a Seller.
     */
    data: XOR<SellerUpdateInput, SellerUncheckedUpdateInput>
    /**
     * Choose, which Seller to update.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller updateMany
   */
  export type SellerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sellers.
     */
    data: XOR<SellerUpdateManyMutationInput, SellerUncheckedUpdateManyInput>
    /**
     * Filter which Sellers to update
     */
    where?: SellerWhereInput
    /**
     * Limit how many Sellers to update.
     */
    limit?: number
  }

  /**
   * Seller updateManyAndReturn
   */
  export type SellerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * The data used to update Sellers.
     */
    data: XOR<SellerUpdateManyMutationInput, SellerUncheckedUpdateManyInput>
    /**
     * Filter which Sellers to update
     */
    where?: SellerWhereInput
    /**
     * Limit how many Sellers to update.
     */
    limit?: number
  }

  /**
   * Seller upsert
   */
  export type SellerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * The filter to search for the Seller to update in case it exists.
     */
    where: SellerWhereUniqueInput
    /**
     * In case the Seller found by the `where` argument doesn't exist, create a new Seller with this data.
     */
    create: XOR<SellerCreateInput, SellerUncheckedCreateInput>
    /**
     * In case the Seller was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SellerUpdateInput, SellerUncheckedUpdateInput>
  }

  /**
   * Seller delete
   */
  export type SellerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter which Seller to delete.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller deleteMany
   */
  export type SellerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sellers to delete
     */
    where?: SellerWhereInput
    /**
     * Limit how many Sellers to delete.
     */
    limit?: number
  }

  /**
   * Seller.products
   */
  export type Seller$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Seller without action
   */
  export type SellerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    quantity: number | null
    price: Decimal | null
  }

  export type ProductSumAggregateOutputType = {
    quantity: number | null
    price: Decimal | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    categoryId: string | null
    quantity: number | null
    price: Decimal | null
    sellerId: string | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    categoryId: string | null
    quantity: number | null
    price: Decimal | null
    sellerId: string | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    categoryId: number
    quantity: number
    price: number
    sellerId: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type ProductSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    categoryId?: true
    quantity?: true
    price?: true
    sellerId?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    categoryId?: true
    quantity?: true
    price?: true
    sellerId?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    categoryId?: true
    quantity?: true
    price?: true
    sellerId?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    description: string | null
    categoryId: string | null
    quantity: number
    price: Decimal
    sellerId: string
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    quantity?: boolean
    price?: boolean
    sellerId?: boolean
    createdAt?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    checkoutItem?: boolean | Product$checkoutItemArgs<ExtArgs>
    savedItem?: boolean | Product$savedItemArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    quantity?: boolean
    price?: boolean
    sellerId?: boolean
    createdAt?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    quantity?: boolean
    price?: boolean
    sellerId?: boolean
    createdAt?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    quantity?: boolean
    price?: boolean
    sellerId?: boolean
    createdAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "categoryId" | "quantity" | "price" | "sellerId" | "createdAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    checkoutItem?: boolean | Product$checkoutItemArgs<ExtArgs>
    savedItem?: boolean | Product$savedItemArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      seller: Prisma.$SellerPayload<ExtArgs>
      images: Prisma.$ProductImagePayload<ExtArgs>[]
      checkoutItem: Prisma.$CheckoutItemPayload<ExtArgs>[]
      savedItem: Prisma.$SavedItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      categoryId: string | null
      quantity: number
      price: Prisma.Decimal
      sellerId: string
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Product$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    seller<T extends SellerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SellerDefaultArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Product$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Product$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkoutItem<T extends Product$checkoutItemArgs<ExtArgs> = {}>(args?: Subset<T, Product$checkoutItemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedItem<T extends Product$savedItemArgs<ExtArgs> = {}>(args?: Subset<T, Product$savedItemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly quantity: FieldRef<"Product", 'Int'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly sellerId: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.category
   */
  export type Product$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Product.images
   */
  export type Product$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    cursor?: ProductImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * Product.checkoutItem
   */
  export type Product$checkoutItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    where?: CheckoutItemWhereInput
    orderBy?: CheckoutItemOrderByWithRelationInput | CheckoutItemOrderByWithRelationInput[]
    cursor?: CheckoutItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckoutItemScalarFieldEnum | CheckoutItemScalarFieldEnum[]
  }

  /**
   * Product.savedItem
   */
  export type Product$savedItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    where?: SavedItemWhereInput
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    cursor?: SavedItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  export type ProductImageAvgAggregateOutputType = {
    order: number | null
  }

  export type ProductImageSumAggregateOutputType = {
    order: number | null
  }

  export type ProductImageMinAggregateOutputType = {
    id: string | null
    productId: string | null
    imageUrl: string | null
    order: number | null
    createdAt: Date | null
  }

  export type ProductImageMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    imageUrl: string | null
    order: number | null
    createdAt: Date | null
  }

  export type ProductImageCountAggregateOutputType = {
    id: number
    productId: number
    imageUrl: number
    order: number
    createdAt: number
    _all: number
  }


  export type ProductImageAvgAggregateInputType = {
    order?: true
  }

  export type ProductImageSumAggregateInputType = {
    order?: true
  }

  export type ProductImageMinAggregateInputType = {
    id?: true
    productId?: true
    imageUrl?: true
    order?: true
    createdAt?: true
  }

  export type ProductImageMaxAggregateInputType = {
    id?: true
    productId?: true
    imageUrl?: true
    order?: true
    createdAt?: true
  }

  export type ProductImageCountAggregateInputType = {
    id?: true
    productId?: true
    imageUrl?: true
    order?: true
    createdAt?: true
    _all?: true
  }

  export type ProductImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductImages
    **/
    _count?: true | ProductImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductImageMaxAggregateInputType
  }

  export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>
  }




  export type ProductImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithAggregationInput | ProductImageOrderByWithAggregationInput[]
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum
    having?: ProductImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductImageCountAggregateInputType | true
    _avg?: ProductImageAvgAggregateInputType
    _sum?: ProductImageSumAggregateInputType
    _min?: ProductImageMinAggregateInputType
    _max?: ProductImageMaxAggregateInputType
  }

  export type ProductImageGroupByOutputType = {
    id: string
    productId: string
    imageUrl: string
    order: number
    createdAt: Date
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    imageUrl?: boolean
    order?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    imageUrl?: boolean
    order?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    imageUrl?: boolean
    order?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectScalar = {
    id?: boolean
    productId?: boolean
    imageUrl?: boolean
    order?: boolean
    createdAt?: boolean
  }

  export type ProductImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "imageUrl" | "order" | "createdAt", ExtArgs["result"]["productImage"]>
  export type ProductImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductImage"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      imageUrl: string
      order: number
      createdAt: Date
    }, ExtArgs["result"]["productImage"]>
    composites: {}
  }

  type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = $Result.GetResult<Prisma.$ProductImagePayload, S>

  type ProductImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductImageCountAggregateInputType | true
    }

  export interface ProductImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'], meta: { name: 'ProductImage' } }
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     * 
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productImageWithIdOnly = await prisma.productImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductImageFindManyArgs>(args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     * 
     */
    create<T extends ProductImageCreateArgs>(args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductImageCreateManyArgs>(args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductImages and returns the data saved in the database.
     * @param {ProductImageCreateManyAndReturnArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     * 
     */
    delete<T extends ProductImageDeleteArgs>(args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductImageUpdateArgs>(args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductImageUpdateManyArgs>(args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages and returns the data updated in the database.
     * @param {ProductImageUpdateManyAndReturnArgs} args - Arguments to update many ProductImages.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
    **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductImageAggregateArgs>(args: Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductImage model
   */
  readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductImage model
   */
  interface ProductImageFieldRefs {
    readonly id: FieldRef<"ProductImage", 'String'>
    readonly productId: FieldRef<"ProductImage", 'String'>
    readonly imageUrl: FieldRef<"ProductImage", 'String'>
    readonly order: FieldRef<"ProductImage", 'Int'>
    readonly createdAt: FieldRef<"ProductImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
  }

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductImage createManyAndReturn
   */
  export type ProductImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
  }

  /**
   * ProductImage updateManyAndReturn
   */
  export type ProductImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
  }

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to delete.
     */
    limit?: number
  }

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
  }


  /**
   * Model Checkout
   */

  export type AggregateCheckout = {
    _count: CheckoutCountAggregateOutputType | null
    _avg: CheckoutAvgAggregateOutputType | null
    _sum: CheckoutSumAggregateOutputType | null
    _min: CheckoutMinAggregateOutputType | null
    _max: CheckoutMaxAggregateOutputType | null
  }

  export type CheckoutAvgAggregateOutputType = {
    total: Decimal | null
  }

  export type CheckoutSumAggregateOutputType = {
    total: Decimal | null
  }

  export type CheckoutMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.CheckoutStatus | null
    total: Decimal | null
    createdAt: Date | null
  }

  export type CheckoutMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.CheckoutStatus | null
    total: Decimal | null
    createdAt: Date | null
  }

  export type CheckoutCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    total: number
    createdAt: number
    _all: number
  }


  export type CheckoutAvgAggregateInputType = {
    total?: true
  }

  export type CheckoutSumAggregateInputType = {
    total?: true
  }

  export type CheckoutMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    total?: true
    createdAt?: true
  }

  export type CheckoutMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    total?: true
    createdAt?: true
  }

  export type CheckoutCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    total?: true
    createdAt?: true
    _all?: true
  }

  export type CheckoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Checkout to aggregate.
     */
    where?: CheckoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Checkouts to fetch.
     */
    orderBy?: CheckoutOrderByWithRelationInput | CheckoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CheckoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Checkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Checkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Checkouts
    **/
    _count?: true | CheckoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckoutMaxAggregateInputType
  }

  export type GetCheckoutAggregateType<T extends CheckoutAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckout[P]>
      : GetScalarType<T[P], AggregateCheckout[P]>
  }




  export type CheckoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutWhereInput
    orderBy?: CheckoutOrderByWithAggregationInput | CheckoutOrderByWithAggregationInput[]
    by: CheckoutScalarFieldEnum[] | CheckoutScalarFieldEnum
    having?: CheckoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckoutCountAggregateInputType | true
    _avg?: CheckoutAvgAggregateInputType
    _sum?: CheckoutSumAggregateInputType
    _min?: CheckoutMinAggregateInputType
    _max?: CheckoutMaxAggregateInputType
  }

  export type CheckoutGroupByOutputType = {
    id: string
    userId: string | null
    status: $Enums.CheckoutStatus
    total: Decimal
    createdAt: Date
    _count: CheckoutCountAggregateOutputType | null
    _avg: CheckoutAvgAggregateOutputType | null
    _sum: CheckoutSumAggregateOutputType | null
    _min: CheckoutMinAggregateOutputType | null
    _max: CheckoutMaxAggregateOutputType | null
  }

  type GetCheckoutGroupByPayload<T extends CheckoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckoutGroupByOutputType[P]>
            : GetScalarType<T[P], CheckoutGroupByOutputType[P]>
        }
      >
    >


  export type CheckoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    total?: boolean
    createdAt?: boolean
    user?: boolean | Checkout$userArgs<ExtArgs>
    items?: boolean | Checkout$itemsArgs<ExtArgs>
    _count?: boolean | CheckoutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkout"]>

  export type CheckoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    total?: boolean
    createdAt?: boolean
    user?: boolean | Checkout$userArgs<ExtArgs>
  }, ExtArgs["result"]["checkout"]>

  export type CheckoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    total?: boolean
    createdAt?: boolean
    user?: boolean | Checkout$userArgs<ExtArgs>
  }, ExtArgs["result"]["checkout"]>

  export type CheckoutSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    total?: boolean
    createdAt?: boolean
  }

  export type CheckoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "total" | "createdAt", ExtArgs["result"]["checkout"]>
  export type CheckoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Checkout$userArgs<ExtArgs>
    items?: boolean | Checkout$itemsArgs<ExtArgs>
    _count?: boolean | CheckoutCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CheckoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Checkout$userArgs<ExtArgs>
  }
  export type CheckoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Checkout$userArgs<ExtArgs>
  }

  export type $CheckoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Checkout"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      items: Prisma.$CheckoutItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      status: $Enums.CheckoutStatus
      total: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["checkout"]>
    composites: {}
  }

  type CheckoutGetPayload<S extends boolean | null | undefined | CheckoutDefaultArgs> = $Result.GetResult<Prisma.$CheckoutPayload, S>

  type CheckoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CheckoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CheckoutCountAggregateInputType | true
    }

  export interface CheckoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Checkout'], meta: { name: 'Checkout' } }
    /**
     * Find zero or one Checkout that matches the filter.
     * @param {CheckoutFindUniqueArgs} args - Arguments to find a Checkout
     * @example
     * // Get one Checkout
     * const checkout = await prisma.checkout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CheckoutFindUniqueArgs>(args: SelectSubset<T, CheckoutFindUniqueArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Checkout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CheckoutFindUniqueOrThrowArgs} args - Arguments to find a Checkout
     * @example
     * // Get one Checkout
     * const checkout = await prisma.checkout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CheckoutFindUniqueOrThrowArgs>(args: SelectSubset<T, CheckoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Checkout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutFindFirstArgs} args - Arguments to find a Checkout
     * @example
     * // Get one Checkout
     * const checkout = await prisma.checkout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CheckoutFindFirstArgs>(args?: SelectSubset<T, CheckoutFindFirstArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Checkout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutFindFirstOrThrowArgs} args - Arguments to find a Checkout
     * @example
     * // Get one Checkout
     * const checkout = await prisma.checkout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CheckoutFindFirstOrThrowArgs>(args?: SelectSubset<T, CheckoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Checkouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Checkouts
     * const checkouts = await prisma.checkout.findMany()
     * 
     * // Get first 10 Checkouts
     * const checkouts = await prisma.checkout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkoutWithIdOnly = await prisma.checkout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CheckoutFindManyArgs>(args?: SelectSubset<T, CheckoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Checkout.
     * @param {CheckoutCreateArgs} args - Arguments to create a Checkout.
     * @example
     * // Create one Checkout
     * const Checkout = await prisma.checkout.create({
     *   data: {
     *     // ... data to create a Checkout
     *   }
     * })
     * 
     */
    create<T extends CheckoutCreateArgs>(args: SelectSubset<T, CheckoutCreateArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Checkouts.
     * @param {CheckoutCreateManyArgs} args - Arguments to create many Checkouts.
     * @example
     * // Create many Checkouts
     * const checkout = await prisma.checkout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CheckoutCreateManyArgs>(args?: SelectSubset<T, CheckoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Checkouts and returns the data saved in the database.
     * @param {CheckoutCreateManyAndReturnArgs} args - Arguments to create many Checkouts.
     * @example
     * // Create many Checkouts
     * const checkout = await prisma.checkout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Checkouts and only return the `id`
     * const checkoutWithIdOnly = await prisma.checkout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CheckoutCreateManyAndReturnArgs>(args?: SelectSubset<T, CheckoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Checkout.
     * @param {CheckoutDeleteArgs} args - Arguments to delete one Checkout.
     * @example
     * // Delete one Checkout
     * const Checkout = await prisma.checkout.delete({
     *   where: {
     *     // ... filter to delete one Checkout
     *   }
     * })
     * 
     */
    delete<T extends CheckoutDeleteArgs>(args: SelectSubset<T, CheckoutDeleteArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Checkout.
     * @param {CheckoutUpdateArgs} args - Arguments to update one Checkout.
     * @example
     * // Update one Checkout
     * const checkout = await prisma.checkout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CheckoutUpdateArgs>(args: SelectSubset<T, CheckoutUpdateArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Checkouts.
     * @param {CheckoutDeleteManyArgs} args - Arguments to filter Checkouts to delete.
     * @example
     * // Delete a few Checkouts
     * const { count } = await prisma.checkout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CheckoutDeleteManyArgs>(args?: SelectSubset<T, CheckoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Checkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Checkouts
     * const checkout = await prisma.checkout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CheckoutUpdateManyArgs>(args: SelectSubset<T, CheckoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Checkouts and returns the data updated in the database.
     * @param {CheckoutUpdateManyAndReturnArgs} args - Arguments to update many Checkouts.
     * @example
     * // Update many Checkouts
     * const checkout = await prisma.checkout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Checkouts and only return the `id`
     * const checkoutWithIdOnly = await prisma.checkout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CheckoutUpdateManyAndReturnArgs>(args: SelectSubset<T, CheckoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Checkout.
     * @param {CheckoutUpsertArgs} args - Arguments to update or create a Checkout.
     * @example
     * // Update or create a Checkout
     * const checkout = await prisma.checkout.upsert({
     *   create: {
     *     // ... data to create a Checkout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Checkout we want to update
     *   }
     * })
     */
    upsert<T extends CheckoutUpsertArgs>(args: SelectSubset<T, CheckoutUpsertArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Checkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutCountArgs} args - Arguments to filter Checkouts to count.
     * @example
     * // Count the number of Checkouts
     * const count = await prisma.checkout.count({
     *   where: {
     *     // ... the filter for the Checkouts we want to count
     *   }
     * })
    **/
    count<T extends CheckoutCountArgs>(
      args?: Subset<T, CheckoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Checkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CheckoutAggregateArgs>(args: Subset<T, CheckoutAggregateArgs>): Prisma.PrismaPromise<GetCheckoutAggregateType<T>>

    /**
     * Group by Checkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CheckoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CheckoutGroupByArgs['orderBy'] }
        : { orderBy?: CheckoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CheckoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Checkout model
   */
  readonly fields: CheckoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Checkout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CheckoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Checkout$userArgs<ExtArgs> = {}>(args?: Subset<T, Checkout$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Checkout$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Checkout$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Checkout model
   */
  interface CheckoutFieldRefs {
    readonly id: FieldRef<"Checkout", 'String'>
    readonly userId: FieldRef<"Checkout", 'String'>
    readonly status: FieldRef<"Checkout", 'CheckoutStatus'>
    readonly total: FieldRef<"Checkout", 'Decimal'>
    readonly createdAt: FieldRef<"Checkout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Checkout findUnique
   */
  export type CheckoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * Filter, which Checkout to fetch.
     */
    where: CheckoutWhereUniqueInput
  }

  /**
   * Checkout findUniqueOrThrow
   */
  export type CheckoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * Filter, which Checkout to fetch.
     */
    where: CheckoutWhereUniqueInput
  }

  /**
   * Checkout findFirst
   */
  export type CheckoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * Filter, which Checkout to fetch.
     */
    where?: CheckoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Checkouts to fetch.
     */
    orderBy?: CheckoutOrderByWithRelationInput | CheckoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Checkouts.
     */
    cursor?: CheckoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Checkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Checkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Checkouts.
     */
    distinct?: CheckoutScalarFieldEnum | CheckoutScalarFieldEnum[]
  }

  /**
   * Checkout findFirstOrThrow
   */
  export type CheckoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * Filter, which Checkout to fetch.
     */
    where?: CheckoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Checkouts to fetch.
     */
    orderBy?: CheckoutOrderByWithRelationInput | CheckoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Checkouts.
     */
    cursor?: CheckoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Checkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Checkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Checkouts.
     */
    distinct?: CheckoutScalarFieldEnum | CheckoutScalarFieldEnum[]
  }

  /**
   * Checkout findMany
   */
  export type CheckoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * Filter, which Checkouts to fetch.
     */
    where?: CheckoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Checkouts to fetch.
     */
    orderBy?: CheckoutOrderByWithRelationInput | CheckoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Checkouts.
     */
    cursor?: CheckoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Checkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Checkouts.
     */
    skip?: number
    distinct?: CheckoutScalarFieldEnum | CheckoutScalarFieldEnum[]
  }

  /**
   * Checkout create
   */
  export type CheckoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Checkout.
     */
    data: XOR<CheckoutCreateInput, CheckoutUncheckedCreateInput>
  }

  /**
   * Checkout createMany
   */
  export type CheckoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Checkouts.
     */
    data: CheckoutCreateManyInput | CheckoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Checkout createManyAndReturn
   */
  export type CheckoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * The data used to create many Checkouts.
     */
    data: CheckoutCreateManyInput | CheckoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Checkout update
   */
  export type CheckoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Checkout.
     */
    data: XOR<CheckoutUpdateInput, CheckoutUncheckedUpdateInput>
    /**
     * Choose, which Checkout to update.
     */
    where: CheckoutWhereUniqueInput
  }

  /**
   * Checkout updateMany
   */
  export type CheckoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Checkouts.
     */
    data: XOR<CheckoutUpdateManyMutationInput, CheckoutUncheckedUpdateManyInput>
    /**
     * Filter which Checkouts to update
     */
    where?: CheckoutWhereInput
    /**
     * Limit how many Checkouts to update.
     */
    limit?: number
  }

  /**
   * Checkout updateManyAndReturn
   */
  export type CheckoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * The data used to update Checkouts.
     */
    data: XOR<CheckoutUpdateManyMutationInput, CheckoutUncheckedUpdateManyInput>
    /**
     * Filter which Checkouts to update
     */
    where?: CheckoutWhereInput
    /**
     * Limit how many Checkouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Checkout upsert
   */
  export type CheckoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Checkout to update in case it exists.
     */
    where: CheckoutWhereUniqueInput
    /**
     * In case the Checkout found by the `where` argument doesn't exist, create a new Checkout with this data.
     */
    create: XOR<CheckoutCreateInput, CheckoutUncheckedCreateInput>
    /**
     * In case the Checkout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CheckoutUpdateInput, CheckoutUncheckedUpdateInput>
  }

  /**
   * Checkout delete
   */
  export type CheckoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
    /**
     * Filter which Checkout to delete.
     */
    where: CheckoutWhereUniqueInput
  }

  /**
   * Checkout deleteMany
   */
  export type CheckoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Checkouts to delete
     */
    where?: CheckoutWhereInput
    /**
     * Limit how many Checkouts to delete.
     */
    limit?: number
  }

  /**
   * Checkout.user
   */
  export type Checkout$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Checkout.items
   */
  export type Checkout$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    where?: CheckoutItemWhereInput
    orderBy?: CheckoutItemOrderByWithRelationInput | CheckoutItemOrderByWithRelationInput[]
    cursor?: CheckoutItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckoutItemScalarFieldEnum | CheckoutItemScalarFieldEnum[]
  }

  /**
   * Checkout without action
   */
  export type CheckoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Checkout
     */
    select?: CheckoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Checkout
     */
    omit?: CheckoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutInclude<ExtArgs> | null
  }


  /**
   * Model CheckoutItem
   */

  export type AggregateCheckoutItem = {
    _count: CheckoutItemCountAggregateOutputType | null
    _avg: CheckoutItemAvgAggregateOutputType | null
    _sum: CheckoutItemSumAggregateOutputType | null
    _min: CheckoutItemMinAggregateOutputType | null
    _max: CheckoutItemMaxAggregateOutputType | null
  }

  export type CheckoutItemAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type CheckoutItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type CheckoutItemMinAggregateOutputType = {
    id: string | null
    checkoutId: string | null
    productId: string | null
    quantity: number | null
    unitPrice: Decimal | null
    productName: string | null
  }

  export type CheckoutItemMaxAggregateOutputType = {
    id: string | null
    checkoutId: string | null
    productId: string | null
    quantity: number | null
    unitPrice: Decimal | null
    productName: string | null
  }

  export type CheckoutItemCountAggregateOutputType = {
    id: number
    checkoutId: number
    productId: number
    quantity: number
    unitPrice: number
    productName: number
    _all: number
  }


  export type CheckoutItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type CheckoutItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type CheckoutItemMinAggregateInputType = {
    id?: true
    checkoutId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    productName?: true
  }

  export type CheckoutItemMaxAggregateInputType = {
    id?: true
    checkoutId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    productName?: true
  }

  export type CheckoutItemCountAggregateInputType = {
    id?: true
    checkoutId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    productName?: true
    _all?: true
  }

  export type CheckoutItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutItem to aggregate.
     */
    where?: CheckoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutItems to fetch.
     */
    orderBy?: CheckoutItemOrderByWithRelationInput | CheckoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CheckoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CheckoutItems
    **/
    _count?: true | CheckoutItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckoutItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckoutItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckoutItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckoutItemMaxAggregateInputType
  }

  export type GetCheckoutItemAggregateType<T extends CheckoutItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckoutItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckoutItem[P]>
      : GetScalarType<T[P], AggregateCheckoutItem[P]>
  }




  export type CheckoutItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutItemWhereInput
    orderBy?: CheckoutItemOrderByWithAggregationInput | CheckoutItemOrderByWithAggregationInput[]
    by: CheckoutItemScalarFieldEnum[] | CheckoutItemScalarFieldEnum
    having?: CheckoutItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckoutItemCountAggregateInputType | true
    _avg?: CheckoutItemAvgAggregateInputType
    _sum?: CheckoutItemSumAggregateInputType
    _min?: CheckoutItemMinAggregateInputType
    _max?: CheckoutItemMaxAggregateInputType
  }

  export type CheckoutItemGroupByOutputType = {
    id: string
    checkoutId: string
    productId: string
    quantity: number
    unitPrice: Decimal
    productName: string
    _count: CheckoutItemCountAggregateOutputType | null
    _avg: CheckoutItemAvgAggregateOutputType | null
    _sum: CheckoutItemSumAggregateOutputType | null
    _min: CheckoutItemMinAggregateOutputType | null
    _max: CheckoutItemMaxAggregateOutputType | null
  }

  type GetCheckoutItemGroupByPayload<T extends CheckoutItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckoutItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckoutItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckoutItemGroupByOutputType[P]>
            : GetScalarType<T[P], CheckoutItemGroupByOutputType[P]>
        }
      >
    >


  export type CheckoutItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkoutId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    productName?: boolean
    checkout?: boolean | CheckoutDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkoutItem"]>

  export type CheckoutItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkoutId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    productName?: boolean
    checkout?: boolean | CheckoutDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkoutItem"]>

  export type CheckoutItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkoutId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    productName?: boolean
    checkout?: boolean | CheckoutDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkoutItem"]>

  export type CheckoutItemSelectScalar = {
    id?: boolean
    checkoutId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    productName?: boolean
  }

  export type CheckoutItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "checkoutId" | "productId" | "quantity" | "unitPrice" | "productName", ExtArgs["result"]["checkoutItem"]>
  export type CheckoutItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkout?: boolean | CheckoutDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type CheckoutItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkout?: boolean | CheckoutDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type CheckoutItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkout?: boolean | CheckoutDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $CheckoutItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CheckoutItem"
    objects: {
      checkout: Prisma.$CheckoutPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      checkoutId: string
      productId: string
      quantity: number
      unitPrice: Prisma.Decimal
      productName: string
    }, ExtArgs["result"]["checkoutItem"]>
    composites: {}
  }

  type CheckoutItemGetPayload<S extends boolean | null | undefined | CheckoutItemDefaultArgs> = $Result.GetResult<Prisma.$CheckoutItemPayload, S>

  type CheckoutItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CheckoutItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CheckoutItemCountAggregateInputType | true
    }

  export interface CheckoutItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CheckoutItem'], meta: { name: 'CheckoutItem' } }
    /**
     * Find zero or one CheckoutItem that matches the filter.
     * @param {CheckoutItemFindUniqueArgs} args - Arguments to find a CheckoutItem
     * @example
     * // Get one CheckoutItem
     * const checkoutItem = await prisma.checkoutItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CheckoutItemFindUniqueArgs>(args: SelectSubset<T, CheckoutItemFindUniqueArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CheckoutItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CheckoutItemFindUniqueOrThrowArgs} args - Arguments to find a CheckoutItem
     * @example
     * // Get one CheckoutItem
     * const checkoutItem = await prisma.checkoutItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CheckoutItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CheckoutItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckoutItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemFindFirstArgs} args - Arguments to find a CheckoutItem
     * @example
     * // Get one CheckoutItem
     * const checkoutItem = await prisma.checkoutItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CheckoutItemFindFirstArgs>(args?: SelectSubset<T, CheckoutItemFindFirstArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckoutItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemFindFirstOrThrowArgs} args - Arguments to find a CheckoutItem
     * @example
     * // Get one CheckoutItem
     * const checkoutItem = await prisma.checkoutItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CheckoutItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CheckoutItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CheckoutItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CheckoutItems
     * const checkoutItems = await prisma.checkoutItem.findMany()
     * 
     * // Get first 10 CheckoutItems
     * const checkoutItems = await prisma.checkoutItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkoutItemWithIdOnly = await prisma.checkoutItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CheckoutItemFindManyArgs>(args?: SelectSubset<T, CheckoutItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CheckoutItem.
     * @param {CheckoutItemCreateArgs} args - Arguments to create a CheckoutItem.
     * @example
     * // Create one CheckoutItem
     * const CheckoutItem = await prisma.checkoutItem.create({
     *   data: {
     *     // ... data to create a CheckoutItem
     *   }
     * })
     * 
     */
    create<T extends CheckoutItemCreateArgs>(args: SelectSubset<T, CheckoutItemCreateArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CheckoutItems.
     * @param {CheckoutItemCreateManyArgs} args - Arguments to create many CheckoutItems.
     * @example
     * // Create many CheckoutItems
     * const checkoutItem = await prisma.checkoutItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CheckoutItemCreateManyArgs>(args?: SelectSubset<T, CheckoutItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CheckoutItems and returns the data saved in the database.
     * @param {CheckoutItemCreateManyAndReturnArgs} args - Arguments to create many CheckoutItems.
     * @example
     * // Create many CheckoutItems
     * const checkoutItem = await prisma.checkoutItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CheckoutItems and only return the `id`
     * const checkoutItemWithIdOnly = await prisma.checkoutItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CheckoutItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CheckoutItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CheckoutItem.
     * @param {CheckoutItemDeleteArgs} args - Arguments to delete one CheckoutItem.
     * @example
     * // Delete one CheckoutItem
     * const CheckoutItem = await prisma.checkoutItem.delete({
     *   where: {
     *     // ... filter to delete one CheckoutItem
     *   }
     * })
     * 
     */
    delete<T extends CheckoutItemDeleteArgs>(args: SelectSubset<T, CheckoutItemDeleteArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CheckoutItem.
     * @param {CheckoutItemUpdateArgs} args - Arguments to update one CheckoutItem.
     * @example
     * // Update one CheckoutItem
     * const checkoutItem = await prisma.checkoutItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CheckoutItemUpdateArgs>(args: SelectSubset<T, CheckoutItemUpdateArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CheckoutItems.
     * @param {CheckoutItemDeleteManyArgs} args - Arguments to filter CheckoutItems to delete.
     * @example
     * // Delete a few CheckoutItems
     * const { count } = await prisma.checkoutItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CheckoutItemDeleteManyArgs>(args?: SelectSubset<T, CheckoutItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckoutItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CheckoutItems
     * const checkoutItem = await prisma.checkoutItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CheckoutItemUpdateManyArgs>(args: SelectSubset<T, CheckoutItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckoutItems and returns the data updated in the database.
     * @param {CheckoutItemUpdateManyAndReturnArgs} args - Arguments to update many CheckoutItems.
     * @example
     * // Update many CheckoutItems
     * const checkoutItem = await prisma.checkoutItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CheckoutItems and only return the `id`
     * const checkoutItemWithIdOnly = await prisma.checkoutItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CheckoutItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CheckoutItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CheckoutItem.
     * @param {CheckoutItemUpsertArgs} args - Arguments to update or create a CheckoutItem.
     * @example
     * // Update or create a CheckoutItem
     * const checkoutItem = await prisma.checkoutItem.upsert({
     *   create: {
     *     // ... data to create a CheckoutItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CheckoutItem we want to update
     *   }
     * })
     */
    upsert<T extends CheckoutItemUpsertArgs>(args: SelectSubset<T, CheckoutItemUpsertArgs<ExtArgs>>): Prisma__CheckoutItemClient<$Result.GetResult<Prisma.$CheckoutItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CheckoutItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemCountArgs} args - Arguments to filter CheckoutItems to count.
     * @example
     * // Count the number of CheckoutItems
     * const count = await prisma.checkoutItem.count({
     *   where: {
     *     // ... the filter for the CheckoutItems we want to count
     *   }
     * })
    **/
    count<T extends CheckoutItemCountArgs>(
      args?: Subset<T, CheckoutItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckoutItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CheckoutItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CheckoutItemAggregateArgs>(args: Subset<T, CheckoutItemAggregateArgs>): Prisma.PrismaPromise<GetCheckoutItemAggregateType<T>>

    /**
     * Group by CheckoutItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CheckoutItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CheckoutItemGroupByArgs['orderBy'] }
        : { orderBy?: CheckoutItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CheckoutItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckoutItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CheckoutItem model
   */
  readonly fields: CheckoutItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CheckoutItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CheckoutItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    checkout<T extends CheckoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CheckoutDefaultArgs<ExtArgs>>): Prisma__CheckoutClient<$Result.GetResult<Prisma.$CheckoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CheckoutItem model
   */
  interface CheckoutItemFieldRefs {
    readonly id: FieldRef<"CheckoutItem", 'String'>
    readonly checkoutId: FieldRef<"CheckoutItem", 'String'>
    readonly productId: FieldRef<"CheckoutItem", 'String'>
    readonly quantity: FieldRef<"CheckoutItem", 'Int'>
    readonly unitPrice: FieldRef<"CheckoutItem", 'Decimal'>
    readonly productName: FieldRef<"CheckoutItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CheckoutItem findUnique
   */
  export type CheckoutItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutItem to fetch.
     */
    where: CheckoutItemWhereUniqueInput
  }

  /**
   * CheckoutItem findUniqueOrThrow
   */
  export type CheckoutItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutItem to fetch.
     */
    where: CheckoutItemWhereUniqueInput
  }

  /**
   * CheckoutItem findFirst
   */
  export type CheckoutItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutItem to fetch.
     */
    where?: CheckoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutItems to fetch.
     */
    orderBy?: CheckoutItemOrderByWithRelationInput | CheckoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutItems.
     */
    cursor?: CheckoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutItems.
     */
    distinct?: CheckoutItemScalarFieldEnum | CheckoutItemScalarFieldEnum[]
  }

  /**
   * CheckoutItem findFirstOrThrow
   */
  export type CheckoutItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutItem to fetch.
     */
    where?: CheckoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutItems to fetch.
     */
    orderBy?: CheckoutItemOrderByWithRelationInput | CheckoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutItems.
     */
    cursor?: CheckoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutItems.
     */
    distinct?: CheckoutItemScalarFieldEnum | CheckoutItemScalarFieldEnum[]
  }

  /**
   * CheckoutItem findMany
   */
  export type CheckoutItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutItems to fetch.
     */
    where?: CheckoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutItems to fetch.
     */
    orderBy?: CheckoutItemOrderByWithRelationInput | CheckoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CheckoutItems.
     */
    cursor?: CheckoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutItems.
     */
    skip?: number
    distinct?: CheckoutItemScalarFieldEnum | CheckoutItemScalarFieldEnum[]
  }

  /**
   * CheckoutItem create
   */
  export type CheckoutItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CheckoutItem.
     */
    data: XOR<CheckoutItemCreateInput, CheckoutItemUncheckedCreateInput>
  }

  /**
   * CheckoutItem createMany
   */
  export type CheckoutItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CheckoutItems.
     */
    data: CheckoutItemCreateManyInput | CheckoutItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CheckoutItem createManyAndReturn
   */
  export type CheckoutItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * The data used to create many CheckoutItems.
     */
    data: CheckoutItemCreateManyInput | CheckoutItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CheckoutItem update
   */
  export type CheckoutItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CheckoutItem.
     */
    data: XOR<CheckoutItemUpdateInput, CheckoutItemUncheckedUpdateInput>
    /**
     * Choose, which CheckoutItem to update.
     */
    where: CheckoutItemWhereUniqueInput
  }

  /**
   * CheckoutItem updateMany
   */
  export type CheckoutItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CheckoutItems.
     */
    data: XOR<CheckoutItemUpdateManyMutationInput, CheckoutItemUncheckedUpdateManyInput>
    /**
     * Filter which CheckoutItems to update
     */
    where?: CheckoutItemWhereInput
    /**
     * Limit how many CheckoutItems to update.
     */
    limit?: number
  }

  /**
   * CheckoutItem updateManyAndReturn
   */
  export type CheckoutItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * The data used to update CheckoutItems.
     */
    data: XOR<CheckoutItemUpdateManyMutationInput, CheckoutItemUncheckedUpdateManyInput>
    /**
     * Filter which CheckoutItems to update
     */
    where?: CheckoutItemWhereInput
    /**
     * Limit how many CheckoutItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CheckoutItem upsert
   */
  export type CheckoutItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CheckoutItem to update in case it exists.
     */
    where: CheckoutItemWhereUniqueInput
    /**
     * In case the CheckoutItem found by the `where` argument doesn't exist, create a new CheckoutItem with this data.
     */
    create: XOR<CheckoutItemCreateInput, CheckoutItemUncheckedCreateInput>
    /**
     * In case the CheckoutItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CheckoutItemUpdateInput, CheckoutItemUncheckedUpdateInput>
  }

  /**
   * CheckoutItem delete
   */
  export type CheckoutItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
    /**
     * Filter which CheckoutItem to delete.
     */
    where: CheckoutItemWhereUniqueInput
  }

  /**
   * CheckoutItem deleteMany
   */
  export type CheckoutItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutItems to delete
     */
    where?: CheckoutItemWhereInput
    /**
     * Limit how many CheckoutItems to delete.
     */
    limit?: number
  }

  /**
   * CheckoutItem without action
   */
  export type CheckoutItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutItem
     */
    select?: CheckoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutItem
     */
    omit?: CheckoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    profilePhotoUrl: 'profilePhotoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SavedScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SavedScalarFieldEnum = (typeof SavedScalarFieldEnum)[keyof typeof SavedScalarFieldEnum]


  export const SavedItemScalarFieldEnum: {
    id: 'id',
    savedId: 'savedId',
    productId: 'productId',
    createdAt: 'createdAt'
  };

  export type SavedItemScalarFieldEnum = (typeof SavedItemScalarFieldEnum)[keyof typeof SavedItemScalarFieldEnum]


  export const SellerScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    profilePhotoUrl: 'profilePhotoUrl',
    motto: 'motto',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SellerScalarFieldEnum = (typeof SellerScalarFieldEnum)[keyof typeof SellerScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    categoryId: 'categoryId',
    quantity: 'quantity',
    price: 'price',
    sellerId: 'sellerId',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductImageScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    imageUrl: 'imageUrl',
    order: 'order',
    createdAt: 'createdAt'
  };

  export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum]


  export const CheckoutScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    total: 'total',
    createdAt: 'createdAt'
  };

  export type CheckoutScalarFieldEnum = (typeof CheckoutScalarFieldEnum)[keyof typeof CheckoutScalarFieldEnum]


  export const CheckoutItemScalarFieldEnum: {
    id: 'id',
    checkoutId: 'checkoutId',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    productName: 'productName'
  };

  export type CheckoutItemScalarFieldEnum = (typeof CheckoutItemScalarFieldEnum)[keyof typeof CheckoutItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'CheckoutStatus'
   */
  export type EnumCheckoutStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CheckoutStatus'>
    


  /**
   * Reference to a field of type 'CheckoutStatus[]'
   */
  export type ListEnumCheckoutStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CheckoutStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    profilePhotoUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    saved?: XOR<SavedNullableScalarRelationFilter, SavedWhereInput> | null
    checkouts?: CheckoutListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    saved?: SavedOrderByWithRelationInput
    checkouts?: CheckoutOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    profilePhotoUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    saved?: XOR<SavedNullableScalarRelationFilter, SavedWhereInput> | null
    checkouts?: CheckoutListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    profilePhotoUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SavedWhereInput = {
    AND?: SavedWhereInput | SavedWhereInput[]
    OR?: SavedWhereInput[]
    NOT?: SavedWhereInput | SavedWhereInput[]
    id?: StringFilter<"Saved"> | string
    userId?: StringFilter<"Saved"> | string
    createdAt?: DateTimeFilter<"Saved"> | Date | string
    updatedAt?: DateTimeFilter<"Saved"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: SavedItemListRelationFilter
  }

  export type SavedOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: SavedItemOrderByRelationAggregateInput
  }

  export type SavedWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: SavedWhereInput | SavedWhereInput[]
    OR?: SavedWhereInput[]
    NOT?: SavedWhereInput | SavedWhereInput[]
    createdAt?: DateTimeFilter<"Saved"> | Date | string
    updatedAt?: DateTimeFilter<"Saved"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: SavedItemListRelationFilter
  }, "id" | "userId">

  export type SavedOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SavedCountOrderByAggregateInput
    _max?: SavedMaxOrderByAggregateInput
    _min?: SavedMinOrderByAggregateInput
  }

  export type SavedScalarWhereWithAggregatesInput = {
    AND?: SavedScalarWhereWithAggregatesInput | SavedScalarWhereWithAggregatesInput[]
    OR?: SavedScalarWhereWithAggregatesInput[]
    NOT?: SavedScalarWhereWithAggregatesInput | SavedScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Saved"> | string
    userId?: StringWithAggregatesFilter<"Saved"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Saved"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Saved"> | Date | string
  }

  export type SavedItemWhereInput = {
    AND?: SavedItemWhereInput | SavedItemWhereInput[]
    OR?: SavedItemWhereInput[]
    NOT?: SavedItemWhereInput | SavedItemWhereInput[]
    id?: StringFilter<"SavedItem"> | string
    savedId?: StringFilter<"SavedItem"> | string
    productId?: StringFilter<"SavedItem"> | string
    createdAt?: DateTimeFilter<"SavedItem"> | Date | string
    saved?: XOR<SavedScalarRelationFilter, SavedWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type SavedItemOrderByWithRelationInput = {
    id?: SortOrder
    savedId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    saved?: SavedOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type SavedItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    savedId_productId?: SavedItemSavedIdProductIdCompoundUniqueInput
    AND?: SavedItemWhereInput | SavedItemWhereInput[]
    OR?: SavedItemWhereInput[]
    NOT?: SavedItemWhereInput | SavedItemWhereInput[]
    savedId?: StringFilter<"SavedItem"> | string
    productId?: StringFilter<"SavedItem"> | string
    createdAt?: DateTimeFilter<"SavedItem"> | Date | string
    saved?: XOR<SavedScalarRelationFilter, SavedWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "savedId_productId">

  export type SavedItemOrderByWithAggregationInput = {
    id?: SortOrder
    savedId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedItemCountOrderByAggregateInput
    _max?: SavedItemMaxOrderByAggregateInput
    _min?: SavedItemMinOrderByAggregateInput
  }

  export type SavedItemScalarWhereWithAggregatesInput = {
    AND?: SavedItemScalarWhereWithAggregatesInput | SavedItemScalarWhereWithAggregatesInput[]
    OR?: SavedItemScalarWhereWithAggregatesInput[]
    NOT?: SavedItemScalarWhereWithAggregatesInput | SavedItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SavedItem"> | string
    savedId?: StringWithAggregatesFilter<"SavedItem"> | string
    productId?: StringWithAggregatesFilter<"SavedItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedItem"> | Date | string
  }

  export type SellerWhereInput = {
    AND?: SellerWhereInput | SellerWhereInput[]
    OR?: SellerWhereInput[]
    NOT?: SellerWhereInput | SellerWhereInput[]
    id?: StringFilter<"Seller"> | string
    username?: StringFilter<"Seller"> | string
    email?: StringFilter<"Seller"> | string
    password?: StringFilter<"Seller"> | string
    profilePhotoUrl?: StringNullableFilter<"Seller"> | string | null
    motto?: StringNullableFilter<"Seller"> | string | null
    createdAt?: DateTimeFilter<"Seller"> | Date | string
    updatedAt?: DateTimeFilter<"Seller"> | Date | string
    products?: ProductListRelationFilter
  }

  export type SellerOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    motto?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type SellerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: SellerWhereInput | SellerWhereInput[]
    OR?: SellerWhereInput[]
    NOT?: SellerWhereInput | SellerWhereInput[]
    username?: StringFilter<"Seller"> | string
    password?: StringFilter<"Seller"> | string
    profilePhotoUrl?: StringNullableFilter<"Seller"> | string | null
    motto?: StringNullableFilter<"Seller"> | string | null
    createdAt?: DateTimeFilter<"Seller"> | Date | string
    updatedAt?: DateTimeFilter<"Seller"> | Date | string
    products?: ProductListRelationFilter
  }, "id" | "email">

  export type SellerOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    motto?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SellerCountOrderByAggregateInput
    _max?: SellerMaxOrderByAggregateInput
    _min?: SellerMinOrderByAggregateInput
  }

  export type SellerScalarWhereWithAggregatesInput = {
    AND?: SellerScalarWhereWithAggregatesInput | SellerScalarWhereWithAggregatesInput[]
    OR?: SellerScalarWhereWithAggregatesInput[]
    NOT?: SellerScalarWhereWithAggregatesInput | SellerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Seller"> | string
    username?: StringWithAggregatesFilter<"Seller"> | string
    email?: StringWithAggregatesFilter<"Seller"> | string
    password?: StringWithAggregatesFilter<"Seller"> | string
    profilePhotoUrl?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    motto?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Seller"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Seller"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    createdAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringNullableFilter<"Product"> | string | null
    quantity?: IntFilter<"Product"> | number
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sellerId?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    seller?: XOR<SellerScalarRelationFilter, SellerWhereInput>
    images?: ProductImageListRelationFilter
    checkoutItem?: CheckoutItemListRelationFilter
    savedItem?: SavedItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    quantity?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    seller?: SellerOrderByWithRelationInput
    images?: ProductImageOrderByRelationAggregateInput
    checkoutItem?: CheckoutItemOrderByRelationAggregateInput
    savedItem?: SavedItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringNullableFilter<"Product"> | string | null
    quantity?: IntFilter<"Product"> | number
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sellerId?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    seller?: XOR<SellerScalarRelationFilter, SellerWhereInput>
    images?: ProductImageListRelationFilter
    checkoutItem?: CheckoutItemListRelationFilter
    savedItem?: SavedItemListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    quantity?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    quantity?: IntWithAggregatesFilter<"Product"> | number
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sellerId?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    id?: StringFilter<"ProductImage"> | string
    productId?: StringFilter<"ProductImage"> | string
    imageUrl?: StringFilter<"ProductImage"> | string
    order?: IntFilter<"ProductImage"> | number
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductImageOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    productId?: StringFilter<"ProductImage"> | string
    imageUrl?: StringFilter<"ProductImage"> | string
    order?: IntFilter<"ProductImage"> | number
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductImageOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    _count?: ProductImageCountOrderByAggregateInput
    _avg?: ProductImageAvgOrderByAggregateInput
    _max?: ProductImageMaxOrderByAggregateInput
    _min?: ProductImageMinOrderByAggregateInput
    _sum?: ProductImageSumOrderByAggregateInput
  }

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    OR?: ProductImageScalarWhereWithAggregatesInput[]
    NOT?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductImage"> | string
    productId?: StringWithAggregatesFilter<"ProductImage"> | string
    imageUrl?: StringWithAggregatesFilter<"ProductImage"> | string
    order?: IntWithAggregatesFilter<"ProductImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductImage"> | Date | string
  }

  export type CheckoutWhereInput = {
    AND?: CheckoutWhereInput | CheckoutWhereInput[]
    OR?: CheckoutWhereInput[]
    NOT?: CheckoutWhereInput | CheckoutWhereInput[]
    id?: StringFilter<"Checkout"> | string
    userId?: StringNullableFilter<"Checkout"> | string | null
    status?: EnumCheckoutStatusFilter<"Checkout"> | $Enums.CheckoutStatus
    total?: DecimalFilter<"Checkout"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Checkout"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    items?: CheckoutItemListRelationFilter
  }

  export type CheckoutOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    status?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: CheckoutItemOrderByRelationAggregateInput
  }

  export type CheckoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CheckoutWhereInput | CheckoutWhereInput[]
    OR?: CheckoutWhereInput[]
    NOT?: CheckoutWhereInput | CheckoutWhereInput[]
    userId?: StringNullableFilter<"Checkout"> | string | null
    status?: EnumCheckoutStatusFilter<"Checkout"> | $Enums.CheckoutStatus
    total?: DecimalFilter<"Checkout"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Checkout"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    items?: CheckoutItemListRelationFilter
  }, "id">

  export type CheckoutOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    status?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    _count?: CheckoutCountOrderByAggregateInput
    _avg?: CheckoutAvgOrderByAggregateInput
    _max?: CheckoutMaxOrderByAggregateInput
    _min?: CheckoutMinOrderByAggregateInput
    _sum?: CheckoutSumOrderByAggregateInput
  }

  export type CheckoutScalarWhereWithAggregatesInput = {
    AND?: CheckoutScalarWhereWithAggregatesInput | CheckoutScalarWhereWithAggregatesInput[]
    OR?: CheckoutScalarWhereWithAggregatesInput[]
    NOT?: CheckoutScalarWhereWithAggregatesInput | CheckoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Checkout"> | string
    userId?: StringNullableWithAggregatesFilter<"Checkout"> | string | null
    status?: EnumCheckoutStatusWithAggregatesFilter<"Checkout"> | $Enums.CheckoutStatus
    total?: DecimalWithAggregatesFilter<"Checkout"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Checkout"> | Date | string
  }

  export type CheckoutItemWhereInput = {
    AND?: CheckoutItemWhereInput | CheckoutItemWhereInput[]
    OR?: CheckoutItemWhereInput[]
    NOT?: CheckoutItemWhereInput | CheckoutItemWhereInput[]
    id?: StringFilter<"CheckoutItem"> | string
    checkoutId?: StringFilter<"CheckoutItem"> | string
    productId?: StringFilter<"CheckoutItem"> | string
    quantity?: IntFilter<"CheckoutItem"> | number
    unitPrice?: DecimalFilter<"CheckoutItem"> | Decimal | DecimalJsLike | number | string
    productName?: StringFilter<"CheckoutItem"> | string
    checkout?: XOR<CheckoutScalarRelationFilter, CheckoutWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type CheckoutItemOrderByWithRelationInput = {
    id?: SortOrder
    checkoutId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    productName?: SortOrder
    checkout?: CheckoutOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type CheckoutItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CheckoutItemWhereInput | CheckoutItemWhereInput[]
    OR?: CheckoutItemWhereInput[]
    NOT?: CheckoutItemWhereInput | CheckoutItemWhereInput[]
    checkoutId?: StringFilter<"CheckoutItem"> | string
    productId?: StringFilter<"CheckoutItem"> | string
    quantity?: IntFilter<"CheckoutItem"> | number
    unitPrice?: DecimalFilter<"CheckoutItem"> | Decimal | DecimalJsLike | number | string
    productName?: StringFilter<"CheckoutItem"> | string
    checkout?: XOR<CheckoutScalarRelationFilter, CheckoutWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type CheckoutItemOrderByWithAggregationInput = {
    id?: SortOrder
    checkoutId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    productName?: SortOrder
    _count?: CheckoutItemCountOrderByAggregateInput
    _avg?: CheckoutItemAvgOrderByAggregateInput
    _max?: CheckoutItemMaxOrderByAggregateInput
    _min?: CheckoutItemMinOrderByAggregateInput
    _sum?: CheckoutItemSumOrderByAggregateInput
  }

  export type CheckoutItemScalarWhereWithAggregatesInput = {
    AND?: CheckoutItemScalarWhereWithAggregatesInput | CheckoutItemScalarWhereWithAggregatesInput[]
    OR?: CheckoutItemScalarWhereWithAggregatesInput[]
    NOT?: CheckoutItemScalarWhereWithAggregatesInput | CheckoutItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CheckoutItem"> | string
    checkoutId?: StringWithAggregatesFilter<"CheckoutItem"> | string
    productId?: StringWithAggregatesFilter<"CheckoutItem"> | string
    quantity?: IntWithAggregatesFilter<"CheckoutItem"> | number
    unitPrice?: DecimalWithAggregatesFilter<"CheckoutItem"> | Decimal | DecimalJsLike | number | string
    productName?: StringWithAggregatesFilter<"CheckoutItem"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    saved?: SavedCreateNestedOneWithoutUserInput
    checkouts?: CheckoutCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    saved?: SavedUncheckedCreateNestedOneWithoutUserInput
    checkouts?: CheckoutUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saved?: SavedUpdateOneWithoutUserNestedInput
    checkouts?: CheckoutUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saved?: SavedUncheckedUpdateOneWithoutUserNestedInput
    checkouts?: CheckoutUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSavedInput
    items?: SavedItemCreateNestedManyWithoutSavedInput
  }

  export type SavedUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SavedItemUncheckedCreateNestedManyWithoutSavedInput
  }

  export type SavedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedNestedInput
    items?: SavedItemUpdateManyWithoutSavedNestedInput
  }

  export type SavedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SavedItemUncheckedUpdateManyWithoutSavedNestedInput
  }

  export type SavedCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SavedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemCreateInput = {
    id?: string
    createdAt?: Date | string
    saved: SavedCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutSavedItemInput
  }

  export type SavedItemUncheckedCreateInput = {
    id?: string
    savedId: string
    productId: string
    createdAt?: Date | string
  }

  export type SavedItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saved?: SavedUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutSavedItemNestedInput
  }

  export type SavedItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemCreateManyInput = {
    id?: string
    savedId: string
    productId: string
    createdAt?: Date | string
  }

  export type SavedItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    motto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutSellerInput
  }

  export type SellerUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    motto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutSellerInput
  }

  export type SellerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    motto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutSellerNestedInput
  }

  export type SellerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    motto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type SellerCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    motto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    motto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    motto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    seller: SellerCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemCreateNestedManyWithoutProductInput
    savedItem?: SavedItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemUncheckedCreateNestedManyWithoutProductInput
    savedItem?: SavedItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUncheckedUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageCreateInput = {
    id?: string
    imageUrl: string
    order?: number
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutImagesInput
  }

  export type ProductImageUncheckedCreateInput = {
    id?: string
    productId: string
    imageUrl: string
    order?: number
    createdAt?: Date | string
  }

  export type ProductImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProductImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageCreateManyInput = {
    id?: string
    productId: string
    imageUrl: string
    order?: number
    createdAt?: Date | string
  }

  export type ProductImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutCreateInput = {
    id?: string
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutCheckoutsInput
    items?: CheckoutItemCreateNestedManyWithoutCheckoutInput
  }

  export type CheckoutUncheckedCreateInput = {
    id?: string
    userId?: string | null
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    items?: CheckoutItemUncheckedCreateNestedManyWithoutCheckoutInput
  }

  export type CheckoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCheckoutsNestedInput
    items?: CheckoutItemUpdateManyWithoutCheckoutNestedInput
  }

  export type CheckoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CheckoutItemUncheckedUpdateManyWithoutCheckoutNestedInput
  }

  export type CheckoutCreateManyInput = {
    id?: string
    userId?: string | null
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type CheckoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutItemCreateInput = {
    id?: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
    checkout: CheckoutCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutCheckoutItemInput
  }

  export type CheckoutItemUncheckedCreateInput = {
    id?: string
    checkoutId: string
    productId: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
  }

  export type CheckoutItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
    checkout?: CheckoutUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutCheckoutItemNestedInput
  }

  export type CheckoutItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }

  export type CheckoutItemCreateManyInput = {
    id?: string
    checkoutId: string
    productId: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
  }

  export type CheckoutItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }

  export type CheckoutItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SavedNullableScalarRelationFilter = {
    is?: SavedWhereInput | null
    isNot?: SavedWhereInput | null
  }

  export type CheckoutListRelationFilter = {
    every?: CheckoutWhereInput
    some?: CheckoutWhereInput
    none?: CheckoutWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CheckoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SavedItemListRelationFilter = {
    every?: SavedItemWhereInput
    some?: SavedItemWhereInput
    none?: SavedItemWhereInput
  }

  export type SavedItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SavedMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SavedMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SavedScalarRelationFilter = {
    is?: SavedWhereInput
    isNot?: SavedWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type SavedItemSavedIdProductIdCompoundUniqueInput = {
    savedId: string
    productId: string
  }

  export type SavedItemCountOrderByAggregateInput = {
    id?: SortOrder
    savedId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedItemMaxOrderByAggregateInput = {
    id?: SortOrder
    savedId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedItemMinOrderByAggregateInput = {
    id?: SortOrder
    savedId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SellerCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrder
    motto?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrder
    motto?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    profilePhotoUrl?: SortOrder
    motto?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type SellerScalarRelationFilter = {
    is?: SellerWhereInput
    isNot?: SellerWhereInput
  }

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput
    some?: ProductImageWhereInput
    none?: ProductImageWhereInput
  }

  export type CheckoutItemListRelationFilter = {
    every?: CheckoutItemWhereInput
    some?: CheckoutItemWhereInput
    none?: CheckoutItemWhereInput
  }

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CheckoutItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ProductImageCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductImageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ProductImageMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductImageMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductImageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumCheckoutStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutStatus | EnumCheckoutStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutStatusFilter<$PrismaModel> | $Enums.CheckoutStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CheckoutCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type CheckoutAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type CheckoutMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type CheckoutMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type CheckoutSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type EnumCheckoutStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutStatus | EnumCheckoutStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutStatusWithAggregatesFilter<$PrismaModel> | $Enums.CheckoutStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCheckoutStatusFilter<$PrismaModel>
    _max?: NestedEnumCheckoutStatusFilter<$PrismaModel>
  }

  export type CheckoutScalarRelationFilter = {
    is?: CheckoutWhereInput
    isNot?: CheckoutWhereInput
  }

  export type CheckoutItemCountOrderByAggregateInput = {
    id?: SortOrder
    checkoutId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    productName?: SortOrder
  }

  export type CheckoutItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type CheckoutItemMaxOrderByAggregateInput = {
    id?: SortOrder
    checkoutId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    productName?: SortOrder
  }

  export type CheckoutItemMinOrderByAggregateInput = {
    id?: SortOrder
    checkoutId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    productName?: SortOrder
  }

  export type CheckoutItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type SavedCreateNestedOneWithoutUserInput = {
    create?: XOR<SavedCreateWithoutUserInput, SavedUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedCreateOrConnectWithoutUserInput
    connect?: SavedWhereUniqueInput
  }

  export type CheckoutCreateNestedManyWithoutUserInput = {
    create?: XOR<CheckoutCreateWithoutUserInput, CheckoutUncheckedCreateWithoutUserInput> | CheckoutCreateWithoutUserInput[] | CheckoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckoutCreateOrConnectWithoutUserInput | CheckoutCreateOrConnectWithoutUserInput[]
    createMany?: CheckoutCreateManyUserInputEnvelope
    connect?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
  }

  export type SavedUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SavedCreateWithoutUserInput, SavedUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedCreateOrConnectWithoutUserInput
    connect?: SavedWhereUniqueInput
  }

  export type CheckoutUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CheckoutCreateWithoutUserInput, CheckoutUncheckedCreateWithoutUserInput> | CheckoutCreateWithoutUserInput[] | CheckoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckoutCreateOrConnectWithoutUserInput | CheckoutCreateOrConnectWithoutUserInput[]
    createMany?: CheckoutCreateManyUserInputEnvelope
    connect?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SavedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SavedCreateWithoutUserInput, SavedUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedCreateOrConnectWithoutUserInput
    upsert?: SavedUpsertWithoutUserInput
    disconnect?: SavedWhereInput | boolean
    delete?: SavedWhereInput | boolean
    connect?: SavedWhereUniqueInput
    update?: XOR<XOR<SavedUpdateToOneWithWhereWithoutUserInput, SavedUpdateWithoutUserInput>, SavedUncheckedUpdateWithoutUserInput>
  }

  export type CheckoutUpdateManyWithoutUserNestedInput = {
    create?: XOR<CheckoutCreateWithoutUserInput, CheckoutUncheckedCreateWithoutUserInput> | CheckoutCreateWithoutUserInput[] | CheckoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckoutCreateOrConnectWithoutUserInput | CheckoutCreateOrConnectWithoutUserInput[]
    upsert?: CheckoutUpsertWithWhereUniqueWithoutUserInput | CheckoutUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CheckoutCreateManyUserInputEnvelope
    set?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    disconnect?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    delete?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    connect?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    update?: CheckoutUpdateWithWhereUniqueWithoutUserInput | CheckoutUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CheckoutUpdateManyWithWhereWithoutUserInput | CheckoutUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CheckoutScalarWhereInput | CheckoutScalarWhereInput[]
  }

  export type SavedUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SavedCreateWithoutUserInput, SavedUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedCreateOrConnectWithoutUserInput
    upsert?: SavedUpsertWithoutUserInput
    disconnect?: SavedWhereInput | boolean
    delete?: SavedWhereInput | boolean
    connect?: SavedWhereUniqueInput
    update?: XOR<XOR<SavedUpdateToOneWithWhereWithoutUserInput, SavedUpdateWithoutUserInput>, SavedUncheckedUpdateWithoutUserInput>
  }

  export type CheckoutUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CheckoutCreateWithoutUserInput, CheckoutUncheckedCreateWithoutUserInput> | CheckoutCreateWithoutUserInput[] | CheckoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckoutCreateOrConnectWithoutUserInput | CheckoutCreateOrConnectWithoutUserInput[]
    upsert?: CheckoutUpsertWithWhereUniqueWithoutUserInput | CheckoutUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CheckoutCreateManyUserInputEnvelope
    set?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    disconnect?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    delete?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    connect?: CheckoutWhereUniqueInput | CheckoutWhereUniqueInput[]
    update?: CheckoutUpdateWithWhereUniqueWithoutUserInput | CheckoutUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CheckoutUpdateManyWithWhereWithoutUserInput | CheckoutUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CheckoutScalarWhereInput | CheckoutScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSavedInput = {
    create?: XOR<UserCreateWithoutSavedInput, UserUncheckedCreateWithoutSavedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedInput
    connect?: UserWhereUniqueInput
  }

  export type SavedItemCreateNestedManyWithoutSavedInput = {
    create?: XOR<SavedItemCreateWithoutSavedInput, SavedItemUncheckedCreateWithoutSavedInput> | SavedItemCreateWithoutSavedInput[] | SavedItemUncheckedCreateWithoutSavedInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutSavedInput | SavedItemCreateOrConnectWithoutSavedInput[]
    createMany?: SavedItemCreateManySavedInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type SavedItemUncheckedCreateNestedManyWithoutSavedInput = {
    create?: XOR<SavedItemCreateWithoutSavedInput, SavedItemUncheckedCreateWithoutSavedInput> | SavedItemCreateWithoutSavedInput[] | SavedItemUncheckedCreateWithoutSavedInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutSavedInput | SavedItemCreateOrConnectWithoutSavedInput[]
    createMany?: SavedItemCreateManySavedInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSavedNestedInput = {
    create?: XOR<UserCreateWithoutSavedInput, UserUncheckedCreateWithoutSavedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedInput
    upsert?: UserUpsertWithoutSavedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedInput, UserUpdateWithoutSavedInput>, UserUncheckedUpdateWithoutSavedInput>
  }

  export type SavedItemUpdateManyWithoutSavedNestedInput = {
    create?: XOR<SavedItemCreateWithoutSavedInput, SavedItemUncheckedCreateWithoutSavedInput> | SavedItemCreateWithoutSavedInput[] | SavedItemUncheckedCreateWithoutSavedInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutSavedInput | SavedItemCreateOrConnectWithoutSavedInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutSavedInput | SavedItemUpsertWithWhereUniqueWithoutSavedInput[]
    createMany?: SavedItemCreateManySavedInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutSavedInput | SavedItemUpdateWithWhereUniqueWithoutSavedInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutSavedInput | SavedItemUpdateManyWithWhereWithoutSavedInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type SavedItemUncheckedUpdateManyWithoutSavedNestedInput = {
    create?: XOR<SavedItemCreateWithoutSavedInput, SavedItemUncheckedCreateWithoutSavedInput> | SavedItemCreateWithoutSavedInput[] | SavedItemUncheckedCreateWithoutSavedInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutSavedInput | SavedItemCreateOrConnectWithoutSavedInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutSavedInput | SavedItemUpsertWithWhereUniqueWithoutSavedInput[]
    createMany?: SavedItemCreateManySavedInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutSavedInput | SavedItemUpdateWithWhereUniqueWithoutSavedInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutSavedInput | SavedItemUpdateManyWithWhereWithoutSavedInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type SavedCreateNestedOneWithoutItemsInput = {
    create?: XOR<SavedCreateWithoutItemsInput, SavedUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SavedCreateOrConnectWithoutItemsInput
    connect?: SavedWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSavedItemInput = {
    create?: XOR<ProductCreateWithoutSavedItemInput, ProductUncheckedCreateWithoutSavedItemInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSavedItemInput
    connect?: ProductWhereUniqueInput
  }

  export type SavedUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<SavedCreateWithoutItemsInput, SavedUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SavedCreateOrConnectWithoutItemsInput
    upsert?: SavedUpsertWithoutItemsInput
    connect?: SavedWhereUniqueInput
    update?: XOR<XOR<SavedUpdateToOneWithWhereWithoutItemsInput, SavedUpdateWithoutItemsInput>, SavedUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutSavedItemNestedInput = {
    create?: XOR<ProductCreateWithoutSavedItemInput, ProductUncheckedCreateWithoutSavedItemInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSavedItemInput
    upsert?: ProductUpsertWithoutSavedItemInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSavedItemInput, ProductUpdateWithoutSavedItemInput>, ProductUncheckedUpdateWithoutSavedItemInput>
  }

  export type ProductCreateNestedManyWithoutSellerInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSellerInput | ProductUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSellerInput | ProductUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSellerInput | ProductUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSellerInput | ProductUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSellerInput | ProductUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSellerInput | ProductUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type SellerCreateNestedOneWithoutProductsInput = {
    create?: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SellerCreateOrConnectWithoutProductsInput
    connect?: SellerWhereUniqueInput
  }

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type CheckoutItemCreateNestedManyWithoutProductInput = {
    create?: XOR<CheckoutItemCreateWithoutProductInput, CheckoutItemUncheckedCreateWithoutProductInput> | CheckoutItemCreateWithoutProductInput[] | CheckoutItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutProductInput | CheckoutItemCreateOrConnectWithoutProductInput[]
    createMany?: CheckoutItemCreateManyProductInputEnvelope
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
  }

  export type SavedItemCreateNestedManyWithoutProductInput = {
    create?: XOR<SavedItemCreateWithoutProductInput, SavedItemUncheckedCreateWithoutProductInput> | SavedItemCreateWithoutProductInput[] | SavedItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutProductInput | SavedItemCreateOrConnectWithoutProductInput[]
    createMany?: SavedItemCreateManyProductInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type CheckoutItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CheckoutItemCreateWithoutProductInput, CheckoutItemUncheckedCreateWithoutProductInput> | CheckoutItemCreateWithoutProductInput[] | CheckoutItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutProductInput | CheckoutItemCreateOrConnectWithoutProductInput[]
    createMany?: CheckoutItemCreateManyProductInputEnvelope
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
  }

  export type SavedItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SavedItemCreateWithoutProductInput, SavedItemUncheckedCreateWithoutProductInput> | SavedItemCreateWithoutProductInput[] | SavedItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutProductInput | SavedItemCreateOrConnectWithoutProductInput[]
    createMany?: SavedItemCreateManyProductInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CategoryUpdateOneWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type SellerUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SellerCreateOrConnectWithoutProductsInput
    upsert?: SellerUpsertWithoutProductsInput
    connect?: SellerWhereUniqueInput
    update?: XOR<XOR<SellerUpdateToOneWithWhereWithoutProductsInput, SellerUpdateWithoutProductsInput>, SellerUncheckedUpdateWithoutProductsInput>
  }

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type CheckoutItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<CheckoutItemCreateWithoutProductInput, CheckoutItemUncheckedCreateWithoutProductInput> | CheckoutItemCreateWithoutProductInput[] | CheckoutItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutProductInput | CheckoutItemCreateOrConnectWithoutProductInput[]
    upsert?: CheckoutItemUpsertWithWhereUniqueWithoutProductInput | CheckoutItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CheckoutItemCreateManyProductInputEnvelope
    set?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    disconnect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    delete?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    update?: CheckoutItemUpdateWithWhereUniqueWithoutProductInput | CheckoutItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CheckoutItemUpdateManyWithWhereWithoutProductInput | CheckoutItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CheckoutItemScalarWhereInput | CheckoutItemScalarWhereInput[]
  }

  export type SavedItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<SavedItemCreateWithoutProductInput, SavedItemUncheckedCreateWithoutProductInput> | SavedItemCreateWithoutProductInput[] | SavedItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutProductInput | SavedItemCreateOrConnectWithoutProductInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutProductInput | SavedItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SavedItemCreateManyProductInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutProductInput | SavedItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutProductInput | SavedItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type CheckoutItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CheckoutItemCreateWithoutProductInput, CheckoutItemUncheckedCreateWithoutProductInput> | CheckoutItemCreateWithoutProductInput[] | CheckoutItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutProductInput | CheckoutItemCreateOrConnectWithoutProductInput[]
    upsert?: CheckoutItemUpsertWithWhereUniqueWithoutProductInput | CheckoutItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CheckoutItemCreateManyProductInputEnvelope
    set?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    disconnect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    delete?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    update?: CheckoutItemUpdateWithWhereUniqueWithoutProductInput | CheckoutItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CheckoutItemUpdateManyWithWhereWithoutProductInput | CheckoutItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CheckoutItemScalarWhereInput | CheckoutItemScalarWhereInput[]
  }

  export type SavedItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SavedItemCreateWithoutProductInput, SavedItemUncheckedCreateWithoutProductInput> | SavedItemCreateWithoutProductInput[] | SavedItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutProductInput | SavedItemCreateOrConnectWithoutProductInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutProductInput | SavedItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SavedItemCreateManyProductInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutProductInput | SavedItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutProductInput | SavedItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    upsert?: ProductUpsertWithoutImagesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutImagesInput, ProductUpdateWithoutImagesInput>, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type UserCreateNestedOneWithoutCheckoutsInput = {
    create?: XOR<UserCreateWithoutCheckoutsInput, UserUncheckedCreateWithoutCheckoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCheckoutsInput
    connect?: UserWhereUniqueInput
  }

  export type CheckoutItemCreateNestedManyWithoutCheckoutInput = {
    create?: XOR<CheckoutItemCreateWithoutCheckoutInput, CheckoutItemUncheckedCreateWithoutCheckoutInput> | CheckoutItemCreateWithoutCheckoutInput[] | CheckoutItemUncheckedCreateWithoutCheckoutInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutCheckoutInput | CheckoutItemCreateOrConnectWithoutCheckoutInput[]
    createMany?: CheckoutItemCreateManyCheckoutInputEnvelope
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
  }

  export type CheckoutItemUncheckedCreateNestedManyWithoutCheckoutInput = {
    create?: XOR<CheckoutItemCreateWithoutCheckoutInput, CheckoutItemUncheckedCreateWithoutCheckoutInput> | CheckoutItemCreateWithoutCheckoutInput[] | CheckoutItemUncheckedCreateWithoutCheckoutInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutCheckoutInput | CheckoutItemCreateOrConnectWithoutCheckoutInput[]
    createMany?: CheckoutItemCreateManyCheckoutInputEnvelope
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
  }

  export type EnumCheckoutStatusFieldUpdateOperationsInput = {
    set?: $Enums.CheckoutStatus
  }

  export type UserUpdateOneWithoutCheckoutsNestedInput = {
    create?: XOR<UserCreateWithoutCheckoutsInput, UserUncheckedCreateWithoutCheckoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCheckoutsInput
    upsert?: UserUpsertWithoutCheckoutsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCheckoutsInput, UserUpdateWithoutCheckoutsInput>, UserUncheckedUpdateWithoutCheckoutsInput>
  }

  export type CheckoutItemUpdateManyWithoutCheckoutNestedInput = {
    create?: XOR<CheckoutItemCreateWithoutCheckoutInput, CheckoutItemUncheckedCreateWithoutCheckoutInput> | CheckoutItemCreateWithoutCheckoutInput[] | CheckoutItemUncheckedCreateWithoutCheckoutInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutCheckoutInput | CheckoutItemCreateOrConnectWithoutCheckoutInput[]
    upsert?: CheckoutItemUpsertWithWhereUniqueWithoutCheckoutInput | CheckoutItemUpsertWithWhereUniqueWithoutCheckoutInput[]
    createMany?: CheckoutItemCreateManyCheckoutInputEnvelope
    set?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    disconnect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    delete?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    update?: CheckoutItemUpdateWithWhereUniqueWithoutCheckoutInput | CheckoutItemUpdateWithWhereUniqueWithoutCheckoutInput[]
    updateMany?: CheckoutItemUpdateManyWithWhereWithoutCheckoutInput | CheckoutItemUpdateManyWithWhereWithoutCheckoutInput[]
    deleteMany?: CheckoutItemScalarWhereInput | CheckoutItemScalarWhereInput[]
  }

  export type CheckoutItemUncheckedUpdateManyWithoutCheckoutNestedInput = {
    create?: XOR<CheckoutItemCreateWithoutCheckoutInput, CheckoutItemUncheckedCreateWithoutCheckoutInput> | CheckoutItemCreateWithoutCheckoutInput[] | CheckoutItemUncheckedCreateWithoutCheckoutInput[]
    connectOrCreate?: CheckoutItemCreateOrConnectWithoutCheckoutInput | CheckoutItemCreateOrConnectWithoutCheckoutInput[]
    upsert?: CheckoutItemUpsertWithWhereUniqueWithoutCheckoutInput | CheckoutItemUpsertWithWhereUniqueWithoutCheckoutInput[]
    createMany?: CheckoutItemCreateManyCheckoutInputEnvelope
    set?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    disconnect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    delete?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    connect?: CheckoutItemWhereUniqueInput | CheckoutItemWhereUniqueInput[]
    update?: CheckoutItemUpdateWithWhereUniqueWithoutCheckoutInput | CheckoutItemUpdateWithWhereUniqueWithoutCheckoutInput[]
    updateMany?: CheckoutItemUpdateManyWithWhereWithoutCheckoutInput | CheckoutItemUpdateManyWithWhereWithoutCheckoutInput[]
    deleteMany?: CheckoutItemScalarWhereInput | CheckoutItemScalarWhereInput[]
  }

  export type CheckoutCreateNestedOneWithoutItemsInput = {
    create?: XOR<CheckoutCreateWithoutItemsInput, CheckoutUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CheckoutCreateOrConnectWithoutItemsInput
    connect?: CheckoutWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutCheckoutItemInput = {
    create?: XOR<ProductCreateWithoutCheckoutItemInput, ProductUncheckedCreateWithoutCheckoutItemInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCheckoutItemInput
    connect?: ProductWhereUniqueInput
  }

  export type CheckoutUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CheckoutCreateWithoutItemsInput, CheckoutUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CheckoutCreateOrConnectWithoutItemsInput
    upsert?: CheckoutUpsertWithoutItemsInput
    connect?: CheckoutWhereUniqueInput
    update?: XOR<XOR<CheckoutUpdateToOneWithWhereWithoutItemsInput, CheckoutUpdateWithoutItemsInput>, CheckoutUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutCheckoutItemNestedInput = {
    create?: XOR<ProductCreateWithoutCheckoutItemInput, ProductUncheckedCreateWithoutCheckoutItemInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCheckoutItemInput
    upsert?: ProductUpsertWithoutCheckoutItemInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCheckoutItemInput, ProductUpdateWithoutCheckoutItemInput>, ProductUncheckedUpdateWithoutCheckoutItemInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumCheckoutStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutStatus | EnumCheckoutStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutStatusFilter<$PrismaModel> | $Enums.CheckoutStatus
  }

  export type NestedEnumCheckoutStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutStatus | EnumCheckoutStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutStatus[] | ListEnumCheckoutStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutStatusWithAggregatesFilter<$PrismaModel> | $Enums.CheckoutStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCheckoutStatusFilter<$PrismaModel>
    _max?: NestedEnumCheckoutStatusFilter<$PrismaModel>
  }

  export type SavedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SavedItemCreateNestedManyWithoutSavedInput
  }

  export type SavedUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SavedItemUncheckedCreateNestedManyWithoutSavedInput
  }

  export type SavedCreateOrConnectWithoutUserInput = {
    where: SavedWhereUniqueInput
    create: XOR<SavedCreateWithoutUserInput, SavedUncheckedCreateWithoutUserInput>
  }

  export type CheckoutCreateWithoutUserInput = {
    id?: string
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    items?: CheckoutItemCreateNestedManyWithoutCheckoutInput
  }

  export type CheckoutUncheckedCreateWithoutUserInput = {
    id?: string
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    items?: CheckoutItemUncheckedCreateNestedManyWithoutCheckoutInput
  }

  export type CheckoutCreateOrConnectWithoutUserInput = {
    where: CheckoutWhereUniqueInput
    create: XOR<CheckoutCreateWithoutUserInput, CheckoutUncheckedCreateWithoutUserInput>
  }

  export type CheckoutCreateManyUserInputEnvelope = {
    data: CheckoutCreateManyUserInput | CheckoutCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedUpsertWithoutUserInput = {
    update: XOR<SavedUpdateWithoutUserInput, SavedUncheckedUpdateWithoutUserInput>
    create: XOR<SavedCreateWithoutUserInput, SavedUncheckedCreateWithoutUserInput>
    where?: SavedWhereInput
  }

  export type SavedUpdateToOneWithWhereWithoutUserInput = {
    where?: SavedWhereInput
    data: XOR<SavedUpdateWithoutUserInput, SavedUncheckedUpdateWithoutUserInput>
  }

  export type SavedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SavedItemUpdateManyWithoutSavedNestedInput
  }

  export type SavedUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SavedItemUncheckedUpdateManyWithoutSavedNestedInput
  }

  export type CheckoutUpsertWithWhereUniqueWithoutUserInput = {
    where: CheckoutWhereUniqueInput
    update: XOR<CheckoutUpdateWithoutUserInput, CheckoutUncheckedUpdateWithoutUserInput>
    create: XOR<CheckoutCreateWithoutUserInput, CheckoutUncheckedCreateWithoutUserInput>
  }

  export type CheckoutUpdateWithWhereUniqueWithoutUserInput = {
    where: CheckoutWhereUniqueInput
    data: XOR<CheckoutUpdateWithoutUserInput, CheckoutUncheckedUpdateWithoutUserInput>
  }

  export type CheckoutUpdateManyWithWhereWithoutUserInput = {
    where: CheckoutScalarWhereInput
    data: XOR<CheckoutUpdateManyMutationInput, CheckoutUncheckedUpdateManyWithoutUserInput>
  }

  export type CheckoutScalarWhereInput = {
    AND?: CheckoutScalarWhereInput | CheckoutScalarWhereInput[]
    OR?: CheckoutScalarWhereInput[]
    NOT?: CheckoutScalarWhereInput | CheckoutScalarWhereInput[]
    id?: StringFilter<"Checkout"> | string
    userId?: StringNullableFilter<"Checkout"> | string | null
    status?: EnumCheckoutStatusFilter<"Checkout"> | $Enums.CheckoutStatus
    total?: DecimalFilter<"Checkout"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Checkout"> | Date | string
  }

  export type UserCreateWithoutSavedInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    checkouts?: CheckoutCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    checkouts?: CheckoutUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedInput, UserUncheckedCreateWithoutSavedInput>
  }

  export type SavedItemCreateWithoutSavedInput = {
    id?: string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutSavedItemInput
  }

  export type SavedItemUncheckedCreateWithoutSavedInput = {
    id?: string
    productId: string
    createdAt?: Date | string
  }

  export type SavedItemCreateOrConnectWithoutSavedInput = {
    where: SavedItemWhereUniqueInput
    create: XOR<SavedItemCreateWithoutSavedInput, SavedItemUncheckedCreateWithoutSavedInput>
  }

  export type SavedItemCreateManySavedInputEnvelope = {
    data: SavedItemCreateManySavedInput | SavedItemCreateManySavedInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSavedInput = {
    update: XOR<UserUpdateWithoutSavedInput, UserUncheckedUpdateWithoutSavedInput>
    create: XOR<UserCreateWithoutSavedInput, UserUncheckedCreateWithoutSavedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedInput, UserUncheckedUpdateWithoutSavedInput>
  }

  export type UserUpdateWithoutSavedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkouts?: CheckoutUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkouts?: CheckoutUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SavedItemUpsertWithWhereUniqueWithoutSavedInput = {
    where: SavedItemWhereUniqueInput
    update: XOR<SavedItemUpdateWithoutSavedInput, SavedItemUncheckedUpdateWithoutSavedInput>
    create: XOR<SavedItemCreateWithoutSavedInput, SavedItemUncheckedCreateWithoutSavedInput>
  }

  export type SavedItemUpdateWithWhereUniqueWithoutSavedInput = {
    where: SavedItemWhereUniqueInput
    data: XOR<SavedItemUpdateWithoutSavedInput, SavedItemUncheckedUpdateWithoutSavedInput>
  }

  export type SavedItemUpdateManyWithWhereWithoutSavedInput = {
    where: SavedItemScalarWhereInput
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyWithoutSavedInput>
  }

  export type SavedItemScalarWhereInput = {
    AND?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
    OR?: SavedItemScalarWhereInput[]
    NOT?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
    id?: StringFilter<"SavedItem"> | string
    savedId?: StringFilter<"SavedItem"> | string
    productId?: StringFilter<"SavedItem"> | string
    createdAt?: DateTimeFilter<"SavedItem"> | Date | string
  }

  export type SavedCreateWithoutItemsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSavedInput
  }

  export type SavedUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SavedCreateOrConnectWithoutItemsInput = {
    where: SavedWhereUniqueInput
    create: XOR<SavedCreateWithoutItemsInput, SavedUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutSavedItemInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    seller: SellerCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSavedItemInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSavedItemInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSavedItemInput, ProductUncheckedCreateWithoutSavedItemInput>
  }

  export type SavedUpsertWithoutItemsInput = {
    update: XOR<SavedUpdateWithoutItemsInput, SavedUncheckedUpdateWithoutItemsInput>
    create: XOR<SavedCreateWithoutItemsInput, SavedUncheckedCreateWithoutItemsInput>
    where?: SavedWhereInput
  }

  export type SavedUpdateToOneWithWhereWithoutItemsInput = {
    where?: SavedWhereInput
    data: XOR<SavedUpdateWithoutItemsInput, SavedUncheckedUpdateWithoutItemsInput>
  }

  export type SavedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedNestedInput
  }

  export type SavedUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutSavedItemInput = {
    update: XOR<ProductUpdateWithoutSavedItemInput, ProductUncheckedUpdateWithoutSavedItemInput>
    create: XOR<ProductCreateWithoutSavedItemInput, ProductUncheckedCreateWithoutSavedItemInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSavedItemInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSavedItemInput, ProductUncheckedUpdateWithoutSavedItemInput>
  }

  export type ProductUpdateWithoutSavedItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSavedItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutSellerInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemCreateNestedManyWithoutProductInput
    savedItem?: SavedItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSellerInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemUncheckedCreateNestedManyWithoutProductInput
    savedItem?: SavedItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSellerInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput>
  }

  export type ProductCreateManySellerInputEnvelope = {
    data: ProductCreateManySellerInput | ProductCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutSellerInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutSellerInput, ProductUncheckedUpdateWithoutSellerInput>
    create: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutSellerInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutSellerInput, ProductUncheckedUpdateWithoutSellerInput>
  }

  export type ProductUpdateManyWithWhereWithoutSellerInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutSellerInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringNullableFilter<"Product"> | string | null
    quantity?: IntFilter<"Product"> | number
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sellerId?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    seller: SellerCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemCreateNestedManyWithoutProductInput
    savedItem?: SavedItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    checkoutItem?: CheckoutItemUncheckedCreateNestedManyWithoutProductInput
    savedItem?: SavedItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type SellerCreateWithoutProductsInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    motto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerUncheckedCreateWithoutProductsInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    motto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerCreateOrConnectWithoutProductsInput = {
    where: SellerWhereUniqueInput
    create: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
  }

  export type ProductImageCreateWithoutProductInput = {
    id?: string
    imageUrl: string
    order?: number
    createdAt?: Date | string
  }

  export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: string
    imageUrl: string
    order?: number
    createdAt?: Date | string
  }

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageCreateManyProductInputEnvelope = {
    data: ProductImageCreateManyProductInput | ProductImageCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CheckoutItemCreateWithoutProductInput = {
    id?: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
    checkout: CheckoutCreateNestedOneWithoutItemsInput
  }

  export type CheckoutItemUncheckedCreateWithoutProductInput = {
    id?: string
    checkoutId: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
  }

  export type CheckoutItemCreateOrConnectWithoutProductInput = {
    where: CheckoutItemWhereUniqueInput
    create: XOR<CheckoutItemCreateWithoutProductInput, CheckoutItemUncheckedCreateWithoutProductInput>
  }

  export type CheckoutItemCreateManyProductInputEnvelope = {
    data: CheckoutItemCreateManyProductInput | CheckoutItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type SavedItemCreateWithoutProductInput = {
    id?: string
    createdAt?: Date | string
    saved: SavedCreateNestedOneWithoutItemsInput
  }

  export type SavedItemUncheckedCreateWithoutProductInput = {
    id?: string
    savedId: string
    createdAt?: Date | string
  }

  export type SavedItemCreateOrConnectWithoutProductInput = {
    where: SavedItemWhereUniqueInput
    create: XOR<SavedItemCreateWithoutProductInput, SavedItemUncheckedCreateWithoutProductInput>
  }

  export type SavedItemCreateManyProductInputEnvelope = {
    data: SavedItemCreateManyProductInput | SavedItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerUpsertWithoutProductsInput = {
    update: XOR<SellerUpdateWithoutProductsInput, SellerUncheckedUpdateWithoutProductsInput>
    create: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
    where?: SellerWhereInput
  }

  export type SellerUpdateToOneWithWhereWithoutProductsInput = {
    where?: SellerWhereInput
    data: XOR<SellerUpdateWithoutProductsInput, SellerUncheckedUpdateWithoutProductsInput>
  }

  export type SellerUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    motto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    motto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    update: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    data: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
  }

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    OR?: ProductImageScalarWhereInput[]
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    id?: StringFilter<"ProductImage"> | string
    productId?: StringFilter<"ProductImage"> | string
    imageUrl?: StringFilter<"ProductImage"> | string
    order?: IntFilter<"ProductImage"> | number
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string
  }

  export type CheckoutItemUpsertWithWhereUniqueWithoutProductInput = {
    where: CheckoutItemWhereUniqueInput
    update: XOR<CheckoutItemUpdateWithoutProductInput, CheckoutItemUncheckedUpdateWithoutProductInput>
    create: XOR<CheckoutItemCreateWithoutProductInput, CheckoutItemUncheckedCreateWithoutProductInput>
  }

  export type CheckoutItemUpdateWithWhereUniqueWithoutProductInput = {
    where: CheckoutItemWhereUniqueInput
    data: XOR<CheckoutItemUpdateWithoutProductInput, CheckoutItemUncheckedUpdateWithoutProductInput>
  }

  export type CheckoutItemUpdateManyWithWhereWithoutProductInput = {
    where: CheckoutItemScalarWhereInput
    data: XOR<CheckoutItemUpdateManyMutationInput, CheckoutItemUncheckedUpdateManyWithoutProductInput>
  }

  export type CheckoutItemScalarWhereInput = {
    AND?: CheckoutItemScalarWhereInput | CheckoutItemScalarWhereInput[]
    OR?: CheckoutItemScalarWhereInput[]
    NOT?: CheckoutItemScalarWhereInput | CheckoutItemScalarWhereInput[]
    id?: StringFilter<"CheckoutItem"> | string
    checkoutId?: StringFilter<"CheckoutItem"> | string
    productId?: StringFilter<"CheckoutItem"> | string
    quantity?: IntFilter<"CheckoutItem"> | number
    unitPrice?: DecimalFilter<"CheckoutItem"> | Decimal | DecimalJsLike | number | string
    productName?: StringFilter<"CheckoutItem"> | string
  }

  export type SavedItemUpsertWithWhereUniqueWithoutProductInput = {
    where: SavedItemWhereUniqueInput
    update: XOR<SavedItemUpdateWithoutProductInput, SavedItemUncheckedUpdateWithoutProductInput>
    create: XOR<SavedItemCreateWithoutProductInput, SavedItemUncheckedCreateWithoutProductInput>
  }

  export type SavedItemUpdateWithWhereUniqueWithoutProductInput = {
    where: SavedItemWhereUniqueInput
    data: XOR<SavedItemUpdateWithoutProductInput, SavedItemUncheckedUpdateWithoutProductInput>
  }

  export type SavedItemUpdateManyWithWhereWithoutProductInput = {
    where: SavedItemScalarWhereInput
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductCreateWithoutImagesInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    seller: SellerCreateNestedOneWithoutProductsInput
    checkoutItem?: CheckoutItemCreateNestedManyWithoutProductInput
    savedItem?: SavedItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
    checkoutItem?: CheckoutItemUncheckedCreateNestedManyWithoutProductInput
    savedItem?: SavedItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
  }

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
    checkoutItem?: CheckoutItemUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutItem?: CheckoutItemUncheckedUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutCheckoutsInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    saved?: SavedCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCheckoutsInput = {
    id?: string
    username: string
    email: string
    password: string
    profilePhotoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    saved?: SavedUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCheckoutsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCheckoutsInput, UserUncheckedCreateWithoutCheckoutsInput>
  }

  export type CheckoutItemCreateWithoutCheckoutInput = {
    id?: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
    product: ProductCreateNestedOneWithoutCheckoutItemInput
  }

  export type CheckoutItemUncheckedCreateWithoutCheckoutInput = {
    id?: string
    productId: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
  }

  export type CheckoutItemCreateOrConnectWithoutCheckoutInput = {
    where: CheckoutItemWhereUniqueInput
    create: XOR<CheckoutItemCreateWithoutCheckoutInput, CheckoutItemUncheckedCreateWithoutCheckoutInput>
  }

  export type CheckoutItemCreateManyCheckoutInputEnvelope = {
    data: CheckoutItemCreateManyCheckoutInput | CheckoutItemCreateManyCheckoutInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCheckoutsInput = {
    update: XOR<UserUpdateWithoutCheckoutsInput, UserUncheckedUpdateWithoutCheckoutsInput>
    create: XOR<UserCreateWithoutCheckoutsInput, UserUncheckedCreateWithoutCheckoutsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCheckoutsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCheckoutsInput, UserUncheckedUpdateWithoutCheckoutsInput>
  }

  export type UserUpdateWithoutCheckoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saved?: SavedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCheckoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saved?: SavedUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CheckoutItemUpsertWithWhereUniqueWithoutCheckoutInput = {
    where: CheckoutItemWhereUniqueInput
    update: XOR<CheckoutItemUpdateWithoutCheckoutInput, CheckoutItemUncheckedUpdateWithoutCheckoutInput>
    create: XOR<CheckoutItemCreateWithoutCheckoutInput, CheckoutItemUncheckedCreateWithoutCheckoutInput>
  }

  export type CheckoutItemUpdateWithWhereUniqueWithoutCheckoutInput = {
    where: CheckoutItemWhereUniqueInput
    data: XOR<CheckoutItemUpdateWithoutCheckoutInput, CheckoutItemUncheckedUpdateWithoutCheckoutInput>
  }

  export type CheckoutItemUpdateManyWithWhereWithoutCheckoutInput = {
    where: CheckoutItemScalarWhereInput
    data: XOR<CheckoutItemUpdateManyMutationInput, CheckoutItemUncheckedUpdateManyWithoutCheckoutInput>
  }

  export type CheckoutCreateWithoutItemsInput = {
    id?: string
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutCheckoutsInput
  }

  export type CheckoutUncheckedCreateWithoutItemsInput = {
    id?: string
    userId?: string | null
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type CheckoutCreateOrConnectWithoutItemsInput = {
    where: CheckoutWhereUniqueInput
    create: XOR<CheckoutCreateWithoutItemsInput, CheckoutUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutCheckoutItemInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    seller: SellerCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    savedItem?: SavedItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCheckoutItemInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    savedItem?: SavedItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCheckoutItemInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCheckoutItemInput, ProductUncheckedCreateWithoutCheckoutItemInput>
  }

  export type CheckoutUpsertWithoutItemsInput = {
    update: XOR<CheckoutUpdateWithoutItemsInput, CheckoutUncheckedUpdateWithoutItemsInput>
    create: XOR<CheckoutCreateWithoutItemsInput, CheckoutUncheckedCreateWithoutItemsInput>
    where?: CheckoutWhereInput
  }

  export type CheckoutUpdateToOneWithWhereWithoutItemsInput = {
    where?: CheckoutWhereInput
    data: XOR<CheckoutUpdateWithoutItemsInput, CheckoutUncheckedUpdateWithoutItemsInput>
  }

  export type CheckoutUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCheckoutsNestedInput
  }

  export type CheckoutUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutCheckoutItemInput = {
    update: XOR<ProductUpdateWithoutCheckoutItemInput, ProductUncheckedUpdateWithoutCheckoutItemInput>
    create: XOR<ProductCreateWithoutCheckoutItemInput, ProductUncheckedCreateWithoutCheckoutItemInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCheckoutItemInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCheckoutItemInput, ProductUncheckedUpdateWithoutCheckoutItemInput>
  }

  export type ProductUpdateWithoutCheckoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCheckoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CheckoutCreateManyUserInput = {
    id?: string
    status?: $Enums.CheckoutStatus
    total: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type CheckoutUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CheckoutItemUpdateManyWithoutCheckoutNestedInput
  }

  export type CheckoutUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CheckoutItemUncheckedUpdateManyWithoutCheckoutNestedInput
  }

  export type CheckoutUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutStatusFieldUpdateOperationsInput | $Enums.CheckoutStatus
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemCreateManySavedInput = {
    id?: string
    productId: string
    createdAt?: Date | string
  }

  export type SavedItemUpdateWithoutSavedInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSavedItemNestedInput
  }

  export type SavedItemUncheckedUpdateWithoutSavedInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUncheckedUpdateManyWithoutSavedInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManySellerInput = {
    id?: string
    name: string
    description?: string | null
    categoryId?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type ProductUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUncheckedUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    sellerId: string
    createdAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    checkoutItem?: CheckoutItemUncheckedUpdateManyWithoutProductNestedInput
    savedItem?: SavedItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageCreateManyProductInput = {
    id?: string
    imageUrl: string
    order?: number
    createdAt?: Date | string
  }

  export type CheckoutItemCreateManyProductInput = {
    id?: string
    checkoutId: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
  }

  export type SavedItemCreateManyProductInput = {
    id?: string
    savedId: string
    createdAt?: Date | string
  }

  export type ProductImageUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
    checkout?: CheckoutUpdateOneRequiredWithoutItemsNestedInput
  }

  export type CheckoutItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }

  export type CheckoutItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }

  export type SavedItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saved?: SavedUpdateOneRequiredWithoutItemsNestedInput
  }

  export type SavedItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutItemCreateManyCheckoutInput = {
    id?: string
    productId: string
    quantity?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    productName: string
  }

  export type CheckoutItemUpdateWithoutCheckoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneRequiredWithoutCheckoutItemNestedInput
  }

  export type CheckoutItemUncheckedUpdateWithoutCheckoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }

  export type CheckoutItemUncheckedUpdateManyWithoutCheckoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    productName?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}