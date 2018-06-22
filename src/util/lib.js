import {
    fetch_address,
    fetch_chef,
    identify_user,
    get_chef,
    showsignIn,
    showsignUp,
    updating_user_info,
    signout,
    signup,
    update_cart,
    showaddmenu,
    menuview,
    showaddCard,
    show_receipt,
    add_receipt,
    addcard,
    transaction,
    order,
    cleartransaction,
    showpaymentinfo,
    showorderhistory,
    shownotification,
    showbasicinformation,
    edit_user,
    orderhistory,
    chef_Cuisine,
    showDifChefsError,
    delete_cart,
    forgot_password,
    showforgotpassword,
    clear_receipt,
    showfirstpageloader,
    prev_path,
    is_restaurant,
    apartment_info,
    delivery_info,
    order_error,
    time_to_reauthenticate,
    transaction_error
} from '../data_Container/action/actions'
import storage from '../data_Container/store'
import axios from 'axios'
import ajx from './ajax'
import requestPromise from 'request-promise'
import africaistalking from 'africaistalking'

export default {
    toggleSignin() {
        storage.dispatch(showsignIn(storage.getState().page.showsignIn))
        this.noscroll()
    },

    toggleSignUp() {
        storage.dispatch(showsignUp(storage.getState().page.showsignUp))
        this.noscroll()
    },
    toggleshowfirstpageloader() {
        storage.dispatch(showfirstpageloader(storage.getState().page.showfirstpageloader))
        this.noscroll()
    },
    toggleSignin_noscroll() {
        storage.dispatch(showsignIn(storage.getState().page.showsignIn))
    },

    toggleSignUp_noscroll() {
        storage.dispatch(showsignUp(storage.getState().page.showsignUp))
    },

    toggleShowcard() {
        storage.dispatch(showaddCard(storage.getState().page.showaddCard))
        this.noscroll()
    },
    toggleShowdifcheferror() {
        storage.dispatch(showDifChefsError(storage.getState().page.showdifcheferror))
        this.noscroll()
    },
    toggleshowforgotpassword() {
        storage.dispatch(showforgotpassword(storage.getState().page.showforgotpasswordpage))
        this.noscroll()
    },
    toggleshoworder_error() {
        storage.dispatch(order_error(storage.getState().page.showordererrorpage))
        this.noscroll()
    },
    toggleShowReceipt: () => storage.dispatch(show_receipt(storage.getState().page.showreceipt)),

    generateReceipt: (a) => storage.dispatch(add_receipt(a)),
    isRestaurant(_) {
        storage.dispatch(is_restaurant({
            isRestaurant: false,
            path: _
        }))
    },

    previouspath(_) {
        storage.dispatch(prev_path(_))
    },
    saveapartmentinfo(_) {
        storage.dispatch(apartment_info(_))
    },
    savedeliveryinfo(_) {
        storage.dispatch(delivery_info(_))
    },
    signin(email, password) {
        storage.dispatch(identify_user(email, password))
            .then(() => storage.dispatch(updating_user_info(storage.getState().user.user.uid)))
            .then(() => { this.toggleSignin() })
            .catch((e) => {
                (storage.getState().user.error.response.data.msg === "Paystack token does not exists") ?
                    this.toggleSignin() :
                    null
            })
    },

    addmenu() {
        const pole = document.getElementsByTagName("BODY")[0];
        const he = document.getElementById('head')
        this.noscroll()
        if (pole !== null && he !== null) {
            storage.dispatch(showaddmenu(storage.getState().page.showaddmenu))
        }
    },
    noscroll() {
        const pole = document.getElementsByTagName("BODY")[0];
        const he = document.getElementById('head')
        if (pole !== null && he !== null) {
            if (pole.classList.contains('popups')) {
                pole.classList.remove("popups")
                he.classList.remove('scr')
            } else {
                pole.classList.add("popups")
                he.classList.add('scr')
            }
        }
    },

    signup(email, firstname, lastname, password, mobile, isCustomer) {
        storage.dispatch(signup(email, firstname, lastname, password, mobile, isCustomer))
            .then(() => storage.dispatch(identify_user(email, password)))
            .then(() => this.toggleSignUp())
            .catch((e) => console.log('Sorry! There was a problem', e))
    },

    signout: () => storage.dispatch(signout()),

    //add items to cart
    updateCart(cart) {
        if (!Object.keys(storage.getState().cart.cart).length) {
            storage.dispatch(clear_receipt())
        }
        storage.dispatch(update_cart(cart))
    },
    deleteCart(food) {
        var newCart = storage.getState().cart.cart
        delete newCart[food]
        var cart = {}
        cart.cart = newCart
        var total = Object.keys(newCart).map(
            (key, i) => newCart[key].totalCost).reduce(
                (sum, value) => sum + value, 0).toFixed(2)
        cart.total = total
        this.updateCart(cart)
    },
    quantityUpdate(Quantity, key) {
        if (Quantity === "") {
            Quantity = 0
        }
        var price = parseInt(storage.getState().cart.cart[key].price, 10),
            totalCost = price * parseInt(Quantity, 10),
            newCart = storage.getState().cart.cart, cart = {}
        newCart[key].quantity = parseInt(Quantity, 10)
        newCart[key].totalCost = parseInt(totalCost, 10)
        var total = Object.keys(newCart).map(
            (key, i) => newCart[key].totalCost).reduce(
                (sum, value) => sum + value, 0).toFixed(2)
        cart.cart = newCart
        cart.total = total
        this.updateCart(cart)
    },
    async addItem(menu) {
        await storage.dispatch(menuview(menu))
        this.addmenu()
    },
    //chefs by cuisine dispatcher
    updatechefbycuisine(_) {
        storage.dispatch(get_chef(this.chefcloseby(_)))
    },
    //get chef data
    chefcloseby(result) {
        var yourChef, cuisine
        if (typeof result === 'string') {

            yourChef = storage.getState().chef.chefAndCuisine[`${result}`][0]
            cuisine = result

            /*.filter((chef)=>chef.role==="Super Chef")*/
        } else {
            yourChef = result
            cuisine = result.cuisine
        }
        if (yourChef) {
            var categorizedMenu = {}, categ
            if (Array.isArray(yourChef.menu)) {
                categ = Array.from(new Set(yourChef.menu.map((menu) =>
                    menu.category)))
            } else {
                let _ = Object.keys(yourChef.menu)
                let to = _.map((o) => yourChef.menu[`${o}`])
                yourChef = {
                    ...yourChef,
                    menu: to
                }
                categ = Array.from(new Set(yourChef.menu.map((menu) =>
                    menu.category)))
            }

            //var menuP=yourChef.menu.filter(items=>categ.indexOf(items.category)>-1).filter(item=>item.visibility===true)
            for (var i = 0; i < categ.length; i++) {
                var menuPerCategory = [];
                yourChef.menu.map(
                    (items) => {
                        if (items.category === categ[i]) {
                            if (items.visibility) {
                                menuPerCategory.push(items);
                            }
                            //menuPerCategory.push(items);
                        }
                    })
                if (menuPerCategory.length > 0) {
                    categorizedMenu[`${categ[i]}`] = menuPerCategory;
                }
            }
            return {
                menu: categorizedMenu,
                yourChef: yourChef,
                categ: Object.keys(categorizedMenu),
                cuisine: cuisine
            }
        } else {
            return {
                menu: [],
                yourChef: {},
                categ: [],
                cuisine: null
            }
        }
    },
    chefResult(val) {
        let _
        if (typeof val === 'string') {
            _ = val
        } else {
            _ = val.lat + "/" + val.lng
        }
        return (
            storage.dispatch(fetch_chef(_))
                .then(() => (typeof val !== 'string') ?
                    this.chefCuisines(storage.getState().chef.chefsInYourArea) :
                    this.updatechefbycuisine(storage.getState().chef.chefsInYourArea))
                .catch((e) => console.log('Sorry! There was a problem', e))
        )
    },
    chefCuisines(chefs) {
        var cuisines = Array.from(new Set(chefs.map((chef) => chef.cuisine)))
        var chefAndCuisine = {}, chefPerCuisine = []
        cuisines.forEach((cui) => {
            chefs.forEach((chef) => {
                if (chef.cuisine === cui) {
                    chefPerCuisine.push(chef)
                }
            })
            chefAndCuisine[`${cui}`] = chefPerCuisine
            chefPerCuisine = []
        }
        )
        storage.dispatch(chef_Cuisine(chefAndCuisine))
    },
    //cart decoration and to notify if cart has items in it
    //_y->id of shopping cart icon container
    addClass(_y) {
        const l = document.getElementById(_y);
        const sc = document.getElementsByClassName('shopping-cart');
        const na = document.getElementsByClassName('s-cart');
        if (l !== null & sc !== null) {
            if (Object.keys(storage.getState().cart.cart).length) {
                for (let i = 0; i < sc.length; i++) {
                    if (!sc[i].classList.contains('color-white')) {
                        sc[i].classList.add('color-white')
                    }
                }
                for (let c = 0; c < na.length; c++) {
                    if (na[c].classList.contains('no-disp')) {
                        na[c].classList.remove('no-disp')
                    }
                }
                if (!l.classList.contains('s-cart-filled')) {
                    l.classList.add('s-cart-filled')
                }
            }
            else if (!Object.keys(storage.getState().cart.cart).length) {
                for (let i = 0; i < sc.length; i++) {
                    if (sc[i].classList.contains('color-white')) {
                        sc[i].classList.remove('color-white')
                    }
                }
                for (let p = 0; p < na.length; p++) {
                    if (!na[p].classList.contains('no-disp')) {
                        na[p].classList.add('no-disp')
                    }
                }
                if (l.classList.contains('s-cart-filled')) {
                    l.classList.remove('s-cart-filled')

                }

            }
        }
    },
    //left-padding fix for certain view state
    floatingpadd() {
        var h = document.getElementById('head');
        if (h.classList.contains('ab')) {
            h.classList.remove('ab');
            h.classList.add('bc')
        }
    },
    //onmount cart effects for headers
    //l->id of shopping cart icon container
    cki(l) {
        (storage.getState().chef.fetched) ?
            (this.addClass(l),
                this.floatingpadd()) :
            null
    },
    //displays more menu items
    show() {
        const m = document.getElementById('mt');
        if (m.classList.contains('d')) {
            m.classList.remove('d')
        } else {
            m.classList.add('d')
        }
    },
    //highlights selected menu
    changecol(e) {
        var category = document.getElementsByClassName("m-categories");
        var uniquecategory = document.getElementsByClassName(e.currentTarget.dataset.categ);
        for (var i = 0; i < category.length; i++) {
            if (category[i].classList.contains('l-selecting')) {
                category[i].classList.remove("l-selecting");
            }
        }

        for (var _i = 0; _i < uniquecategory.length; _i++) {
            uniquecategory[_i].classList.add("l-selecting")
        }
    },
    amountofitems() {
        return Object.keys(storage.getState().cart.cart).map(
            (val, key) => storage.getState().cart.cart[val].quantity).reduce(
                (a, b) => a + b, 0)
    },
    reauth(auth, email) {
        let options = {
            method: 'POST',
            url: ajx.reauth,
            headers: ajx.paystack,
            body: JSON.stringify({
                "authorization_code": auth,
                "email": email,
                "amount": 100
            })
        }
        return requestPromise(options)
    },
    addcard(cardNumber, ccv, expirationMonth, expirationYear) {
        var uid = storage.getState().user.user.uid;
        var token = storage.getState().user.user.token;
        var email = storage.getState().user.user.email;
        var url = ajx.addcard + uid;
        storage.dispatch(addcard(axios({
            method: 'post',
            url: url,
            headers: { token, uid },
            data: {
                email,
                cardNumber,
                ccv,
                expirationMonth,
                expirationYear
            }
        })))
            .then((res) => res.value)
            .then((resp) => {
                this.reauth(resp.data.data.authorization_code, resp.data.data.customer.email)
                    .then(_res => {
                        let url = JSON.parse(_res).data.reauthorization_url
                        storage.dispatch(time_to_reauthenticate(url))
                    })
                    /*.then(()=>(storage.getState().page.showaddCard)? 
                            this.toggleShowcard():
                            null)*/
                    .then(() => console.log('done'))
                    .catch(e => console.log(e))
                return resp
            })
            .catch(e => console.log(e))
    },
    reauthorize() {
        this.toggleShowcard()
        storage.dispatch(time_to_reauthenticate(""))
    },
    checkBalance(amount) {
        axios.get(ajx.carddtlsendpoint + storage.getState().user.user.uid)
            .then(res => {
                let cardAuthCode = res.data.data.cardAuthCode,
                    email = storage.getState().user.user.email

                let options = {
                    method: 'POST',
                    url: ajx.checkBalance,
                    headers: ajx.paystack,
                    body: {
                        "authorization_code": cardAuthCode,
                        email,
                        amount
                    },
                    json: true
                }
                requestPromise(options)
                    .then((res) => {
                        (res.message === "Authorization is valid for this amount") ?
                            this.processtransact() :
                            alert(res.message)
                    })
                    .catch(e => {
                        storage.dispatch(transaction_error(e.error.message))
                    })
            })
    },
    toggleTransactionError(_) {
        storage.dispatch(transaction_error(_))
    },
    placeorder() {
        let token = storage.getState().user.user.token,
            chefUid = storage.getState().chef.yourChef.uid,
            transaction = storage.getState().user.transaction,
            chefName = storage.getState().chef.yourChef.first_name + " " + storage.getState().chef.yourChef.last_name,
            chefPhoneNumber = storage.getState().chef.yourChef.phone_number,
            p = transaction.map((_) => {
                return axios({
                    method: 'post',
                    url: ajx.placeorderendpoint,
                    headers: { token, chefUid },
                    data: { transaction: _ }
                })
            })
        storage.dispatch(order(p))
            .then((res) => {
                this.sendMessage(chefName, chefPhoneNumber)
                this.createReceipt();
                storage.dispatch(cleartransaction())
            })
            .catch((err) => {
                console.log("please try again", err);
                this.toggleshoworder_error()
            })
    },
    timewillpass() {
        var k = Object.keys(storage.getState().cart.cart),
            a = k.map((val, key) => {
                var h = parseInt(storage.getState().cart.cart[`${val}`].hour, 10) * 60,
                    m = parseInt(storage.getState().cart.cart[`${val}`].min, 10)
                return (h + m) * 60 * 1000
            }),
            v = Math.max(...a.map((a) => parseInt(a, 10))),
            t = new Date((new Date().getTime()) + v),
            today = new Date(),
            h1 = parseInt(today.getHours(), 10),
            m1 = parseInt(today.getMinutes(), 10),
            d1 = today.getDay(),
            d = t.getDay(),
            h = t.getHours(),
            m = t.getMinutes(),
            _a = this.timeformatter(m1, h1, d1),
            _b = this.timeformatter(m, h, d),
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        return {
            timewillpass: days[_b.day] + " " + _b.hour + " : " + _b.minute,
            current: today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + ", " + days[_a.day] + " " + _a.hour + " : " + _a.minute
        }
    },
    timeformatter(m, h, d) {
        var m1 = m, h1 = h, d1 = d
        if (m1 > 59) {
            m1 -= 60
            h1 += 1
        }
        if (h1 >= 24) {
            h1 -= 24
            d1 += 1
        }
        if (h1 < 10) {
            h1 = "0" + h1;
        }
        if (m1 < 10) {
            m1 = '0' + m1
        }
        return {
            day: d1,
            hour: h1,
            minute: m1
        }
    },
    createReceipt() {
        const receipt = storage.getState().cart,
            tax = 0,
            deliveryFee = storage.getState().chef.yourChef.delivery_charge,
            chefProfilepic = storage.getState().chef.yourChef.profile_photo,
            receiptGenerated = storage.getState().receipt.receiptGenerated
        this.generateReceipt({
            receipt,
            tax,
            deliveryFee,
            chefProfilepic,
            receiptGenerated
        })
    },
    newtransact(_v) {
        let _b = storage.getState().user.transaction
        _b.push(_v)
        storage.dispatch(transaction(_b))
    },
    async processtransact() {
        var chefUid = storage.getState().chef.yourChef.uid,
            customerUid = storage.getState().user.user.uid,
            customerName = storage.getState().user.user.first_name + " " + storage.getState().user.user.last_name,
            customerEmail = storage.getState().user.user.email,
            customerImage = storage.getState().user.user.profile_photo,
            coupon_used = false,
            chefName = storage.getState().chef.yourChef.first_name + " " + storage.getState().chef.yourChef.last_name,
            chefEmail = storage.getState().chef.yourChef.email,
            customerAddress = storage.getState().address.Location,
            chefImage = storage.getState().chef.yourChef.profile_photo,
            customerPhoneNumber = storage.getState().user.user.mobile,
            payment_option = "card",
            items = Object.keys(storage.getState().cart.cart);
        var coupon = (coupon_used) ? 500 : 0;

        Object.keys(storage.getState().cart.cart).forEach((menu, key) => {
            var quantity = storage.getState().cart.cart[`${items[key]}`].quantity,
                originalAmt = storage.getState().cart.cart[`${items[key]}`].totalCost,
                item = items[key],
                charge_customer = true,
                change_amount = originalAmt - coupon,
                description = storage.getState().cart.cart[`${items[key]}`].desc,
                additionalInfo = storage.getState().cart.cart[`${items[key]}`].chefinstruction,
                transaction = [{
                    chefUid,
                    customerUid,
                    originalAmt,
                    item,
                    customerAddress,
                    description,
                    quantity,
                    customerName,
                    customerEmail,
                    customerImage,
                    chefName,
                    chefEmail,
                    chefImage,
                    customerPhoneNumber,
                    payment_option,
                    coupon_used,
                    additionalInfo,
                    charge_customer,
                    change_amount
                }]
            this.newtransact(transaction)
        })
        var adlo = storage.getState().address,
            deliveryCharge = [{
                chefUid,
                customerUid,
                originalAmt: storage.getState().chef.yourChef.delivery_charge,
                item: "Delivery fee",
                customerAddress: {
                    lat: adlo.lat,
                    lng: adlo.lng,
                    address: adlo.Location
                },
                description: "",
                quantity: 1,
                customerName,
                customerEmail,
                customerImage,
                chefName,
                chefEmail,
                chefImage,
                customerPhoneNumber,
                payment_option,
                coupon_used,
                additionalInfo: {
                    ApartmentInfo: adlo.apartment,
                    DeliveryNote: adlo.deliverynote
                },
                charge_customer: true,
                change_amount: storage.getState().chef.yourChef.delivery_charge
            }]
        this.newtransact(deliveryCharge)
        this.placeorder()
    },

    showpaymentinfo(e) {
        storage.dispatch(showpaymentinfo(storage.getState().page.showpaymentinfo))
        this.highsel(e)
    },
    shownotification(e) {
        storage.dispatch(shownotification(storage.getState().page.shownotification))
        this.highsel(e)
    },
    showbasicinformation(e) {
        e.preventDefault()
        storage.dispatch(showbasicinformation(storage.getState().page.showbasicinformation))
        this.highsel(e)
    },
    showorderhistory(e) {
        storage.dispatch(showorderhistory(storage.getState().page.showorderhistory))
        this.highsel(e)
    },
    highsel(e) {
        e.preventDefault()
        let menuItem = document.getElementsByClassName("l-menu-item")
        for (var i = 0; i < menuItem.length; i++) {
            if (menuItem[i].classList.contains('l-menu-item')) {
                menuItem[i].classList.remove("l-select");
            }
        }
        document.getElementById(e.currentTarget.dataset.key).classList.add("l-select");
    },
    newcard(e) {
        e.preventDefault()
        var number = document.getElementById("cardNumber").value,
            cvv = document.getElementById("CVVNumber").value,
            expiry_month = document.getElementById("MonthNumber").value,
            expiry_year = document.getElementById("YearNumber").value
        if (number === "" || cvv === "" || expiry_year === "" || expiry_month === "") {
            (number === "") ?
                console.log("number field cannot be empty") :
                (cvv === "") ?
                    console.log("cvv field cannot be empty") :
                    (expiry_year === "" || expiry_month === "") ?
                        console.log("expiry field cannot be empty") :
                        null
        }
        else {
            this.addcard(number, cvv, expiry_month, expiry_year)
        }
    },
    orderhistory() {
        let uid = storage.getState().user.user.uid,
            token = storage.getState().user.user.token,
            url = ajx.order_history + uid
        storage.dispatch(orderhistory(axios({ method: 'get', url: url, headers: { token, uid } })))
    },
    address(a, b) {
        storage.dispatch(fetch_address(a, b))
    },
    addcuisine(_) {
        (_) ?
            (window.innerWidth > 1025) ?
                _.innerHTML = "&#9662" + storage.getState().chef.currentCuisine :
                _.innerHTML = "&#9662" :
            null
    },
    clear_Cart() {
        storage.dispatch(delete_cart())
        this.toggleShowdifcheferror()
    },
    forgotPassword(email) {
        storage.dispatch(forgot_password(email))
            .then(() => this.toggleshowforgotpassword())
            .catch(e => console.log(e))
    },
    edit_user(e, _) {
        e.preventDefault()
        storage.dispatch(edit_user(_))
            .catch((e) => console.log("Whoops!!!", e))
    },
    forgotPasswordfromSignin() {
        this.toggleSignin()
        this.toggleshowforgotpassword()
    },
    changePassword(Password, code) {
        let options = {
            method: 'POST',
            url: ajx.resetPassword,
            headers: { 'Content-Type': 'application/json' },
            body: { Password, code },
            json: true
        }

        return requestPromise(options)

    },
    logocheckout() {
        const _v = document.getElementById('logo-min')
        if (!_v.classList.contains('zzk')) {
            _v.classList.add('zzk')
        }
    },
    alterPassword(e, _) {
        e.preventDefault()
        let options = {
            method: 'POST',
            url: 'https://chef.mybukka.com/api/v1/bukka/user/changePassword/' + storage.getState().user.user.uid,
            headers: { 'Content-Type': 'application/json' },
            body: { ..._ },
            json: true
        }

        return requestPromise(options)

    },
    sendMessage(name, number) {
        const message = `Hello ${name},You have a new order. Please visit https://chef.mybukka.com to accept order(s)`,
            to = "234" + number.substring(1, 11),
            from = 'Bukka',
            apikey = ajx.apikey,
            username = ajx.username
        to.trim()

        africaistalking(username, message, to, apikey, from)
            .catch((err) => console.log(err))

    },
    async onRefresh() {
        try {
            if (storage.getState().address.Located) {
                const latLng = {
                    lng: storage.getState().address.lng,
                    lat: storage.getState().address.lat
                }

                await this.chefResult(latLng)
                if (storage.getState().chef.currentCuisine) {
                    const cui = storage.getState().chef.currentCuisine
                    const allcui = Object.keys(storage.getState().chef.chefAndCuisine)
                    if (allcui.includes(cui)) {
                        this.updatechefbycuisine(cui)
                    }
                }
            }
        } catch (err) {
            console.error("whoops!!", err)
        }
    }
}
