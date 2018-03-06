# lgj-admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

# 项目结构说明
```
.
├── build                                       // webpack config file
├── config                                      // package path
├── src                                         // source directory
|   ├── assets                                  //静态文件
│   ├── components                              // components
│   │   ├── common                              // common components
│   │   │   ├── alertTip.vue                    // popup components
│   │   │   ├── buyCart.vue                     // cart components
│   │   │   ├── computeTime.vue                 // countdown components
│   │   │   ├── loading.vue                     // the animation component when page is initialized
│   │   │   ├── mixin.js                        // mixinf components(inculde：directive-loading more，make picture address)
│   │   │   ├── ratingStar.vue                  // the five rating star component about comment
│   │   │   └── shoplist.vue                    // the resturant list common component of msite and shop page
│   │   ├── footer
│   │   │   └── footGuide.vue                   // footer common component
│   │   └── header
│   │       └── head.vue                        // header common component
│   ├── config                                  // basic configuration
│   │   ├── env.js                              // environment switch configuration
│   │   ├── fetch.js                            // git data
│   │   ├── mUtils.js                           // common function about js
│   │   └── rem.js                              // px transform rem
│   ├── images                                  // public picture
│   ├── page
│   │   ├── balance
│   │   │   ├── balance.vue                     // balance page
│   │   │   └── children
│   │   │       └── detail.vue                  // balance detail page
│   │   ├── benefit
│   │   │   ├── benefit.vue                     // benefit pahe
│   │   │   └── children
│   │   │       ├── commend.vue                 // recommend prize
│   │   │       ├── coupon.vue                  // coupon introduction
│   │   │       ├── exchange.vue                // exchange benefit
│   │   │       ├── hbDescription.vue           // benefit descripting
│   │   │       └── hbHistory.vue               // benefit's history
│   │   ├── city                 
│   │   │   └── city.vue                        // local city page
│   │   ├── confirmOrder
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── addAddress.vue          // add address page
│   │   │   │   │   └── children
│   │   │   │   │       └── searchAddress.vue   // search address page
│   │   │   │   ├── chooseAddress.vue           // choose address page
│   │   │   │   ├── invoice.vue                 // choose invoice page
│   │   │   │   ├── payment.vue                 // pay page
│   │   │   │   ├── remark.vue                  // order remark page 
│   │   │   │   └── userValidation.vue          // user validation page
│   │   │   └── confirmOrder.vue                // confirm order page
│   │   ├── download
│   │   │   └── download.vue                    // downlad App
│   │   ├── find
│   │   │   └── find.vue                        // find page
│   │   ├── food
│   │   │   └── food.vue                        // food filter sort page
│   │   ├── forget
│   │   │   └── forget.vue                      // forget password, change password
│   │   ├── home
│   │   │   └── home.vue                        // index page
│   │   ├── login
│   │   │   └── login.vue                       // login and register page
│   │   ├── msite
│   │   │   └── msite.vue                       // merchant list page
│   │   ├── order
│   │   │   ├── children
│   │   │   │   └── orderDetail.vue             // order detail page
│   │   │   └── order.vue                       // order list page
│   │   ├── points
│   │   │   ├── children
│   │   │   │   └── detail.vue                  // points detail page
│   │   │   └── points.vue                      // points page
│   │   ├── profile
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── address.vue             // address page
│   │   │   │   │   └── children
│   │   │   │   │       ├── add.vue             // add address page
│   │   │   │   │       └── children
│   │   │   │   │           └── addDetail.vue   // search address page
│   │   │   │   ├── info.vue                    // account info page
│   │   │   │   └── setusername.vue             // reset user page
│   │   │   └── profile.vue                     // user profile page
│   │   ├── search
│   │   │   └── search.vue                      // search page
│   │   ├── service
│   │   │   ├── children
│   │   │   │   └── questionDetail.vue          // question detail page
│   │   │   └── service.vue                     // service center page
│   │   ├── shop
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   └── shopSafe.vue            // shop check info page
│   │   │   │   ├── foodDetail.vue              // food detail page
│   │   │   │   └── shopDetail.vue              // shop detail page
│   │   │   └── shop.vue                        // shop filter page
│   │   └── vipcard
│   │       ├── children
│   │       │   ├── invoiceRecord.vue           // invoice record page
│   │       │   ├── useCart.vue                 // use card page
│   │       │   └── vipDescription.vue          // vip deacription page
│   │       └── vipcard.vue                     // vip handling page
│   ├── plugins                                 // plugins
│   ├── router
│   │   └── router.js                           // router configuration
│   ├── service                                 // data interaction and unified deployment
│   │   ├── getData.js                          // the unified deployment file for get data, and unified management of interfaces
│   │   └── tempdata                            // temporary data for the development
│   ├── store                                   // Vuex status management
│   │   ├── action.js                           // actions configuration
│   │   ├── getters.js                          // getters configuration
│   │   ├── index.js                            // use vuex，new store
│   │   ├── modules                             // store modules
│   │   ├── mutation-types.js                   // make const for muations
│   │   └── mutations.js                        // mutations configuration
│   └── style
│       ├── common.scss                         // common css
│       ├── mixin.scss                          // cs configuration file
│       └── swiper.min.css
│   ├── App.vue                                 // entry page js file
│   ├── main.js                                 // the main js for loading components
├── favicon.ico                                 // icon
├── index.html                                  // entry page html file
.

56 directories, 203 files
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
