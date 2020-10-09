const fetch = require('node-fetch');
const FormData = require('form-data');

const webService = 'https://webservice.tsoft.com.tr/rest1';
const authorization = { token: '9s4oou0dstml2sj04mquvp1mnm' }; // Token expires

const customer = JSON.stringify([
  {
    Email: 'abc@cde.com',
    Password: '123456'
  }
]);

const createCustomer = JSON.stringify(	  [
  {
      "OrderCode": "SC1111",
      "CustomerCode": "T32",
      "CustomerId": "32",
      "Currency": "TL",
      "PaymentTypeId": "-2",
      "SubPaymentTypeId": "",
      "OrderStatusId": "5",
      "InvoiceAddressId": "",
      "InvoiceTitle": "İş Adresim",
      "InvoiceName": "Kübra K.",
      "InvoiceIdentityNumber": "",
      "InvoiceTaxOffice": "",
      "InvoiceTaxNumber": "12324445",
      "InvoiceMobile": "5364922333",
      "InvoiceOtherPhone": "",
      "InvoiceCountry": "Türkiye",
      "InvoiceCity": "İstanbul",
      "InvoiceTown": "Zeytinburnu",
      "InvoiceDistrict": "Zeytinburnu",
      "InvoiceAddress": "Cirpici Mah. Seyitnizam Caddesi. No:30/1A",
      "InvoiceZipcode": "34025",
      "DeliveryAddressId": "",
      "DeliveryTitle": "İş adresim",
      "DeliveryName": "Kübra K.",
      "DeliveryMobile": "5364922333",
      "DeliveryOtherPhone": "",
      "DeliveryCountry": "Türkiye",
      "DeliveryCity": "İstanbul",
      "DeliveryTown": "Zeytinburnu",
      "DeliveryDistrict": "Zeytinburnu",
      "DeliveryAddress": "Cirpici Mah. Seyitnizam Caddesi. No:30/1A",
      "DeliveryZipcode": "34025",
      "OrderTotalPrice": "250",
      "CargoCode": "3",
      "OrderDate": "1429855185",
      "Products": [
          {
              "ProductCode": "T625",
              "VariantType1": "",
              "VariantType2": "",
              "SubProductCode": "",
              "Quantity": "1"
          }
      ]
  }
]);

const address = JSON.stringify([ { "customer_id": 32, "title": "İş Adresim", "type": 0, "country_code": "TR", "city_code": "34", "town_code": "950", "address": "Cirpici Mah. Seyitnizam Caddesi. No:30/1A", "address_id": 0, "also_invoice": 1, "company_name": "", "district": "Zeytinburnu", "name": "Dharmvijay Patel", "invoice_type": 0, "mobile_phone": "905555555555", "nationality": 28102654020, "identity_number": "28102654020", "other_phone": "", "tax_number": "66666666666", "tax_office": "", "zip": "34025" } ]);

module.exports = {
  request({ path, method = 'get', body }) {
    // const form = this.jsonToFormData(body);
    // const form = "token=la0s9agpbtomi8i82rl45atf6m&data=%5B%0A++%7B%0A++++++%22OrderCode%22%3A+%22SC1111%22%2C%0A++++++%22CustomerCode%22%3A+%22T32%22%2C%0A++++++%22CustomerId%22%3A+%2232%22%2C%0A++++++%22Currency%22%3A+%22TL%22%2C%0A++++++%22PaymentTypeId%22%3A+%22-2%22%2C%0A++++++%22SubPaymentTypeId%22%3A+%22%22%2C%0A++++++%22OrderStatusId%22%3A+%225%22%2C%0A++++++%22InvoiceAddressId%22%3A+%22%22%2C%0A++++++%22InvoiceTitle%22%3A+%22%C4%B0%C5%9F+Adresim%22%2C%0A++++++%22InvoiceName%22%3A+%22K%C3%BCbra+K.%22%2C%0A++++++%22InvoiceIdentityNumber%22%3A+%22%22%2C%0A++++++%22InvoiceTaxOffice%22%3A+%22%22%2C%0A++++++%22InvoiceTaxNumber%22%3A+%2212324445%22%2C%0A++++++%22InvoiceMobile%22%3A+%225364922333%22%2C%0A++++++%22InvoiceOtherPhone%22%3A+%22%22%2C%0A++++++%22InvoiceCountry%22%3A+%22T%C3%BCrkiye%22%2C%0A++++++%22InvoiceCity%22%3A+%22%C4%B0stanbul%22%2C%0A++++++%22InvoiceTown%22%3A+%22Zeytinburnu%22%2C%0A++++++%22InvoiceDistrict%22%3A+%22Zeytinburnu%22%2C%0A++++++%22InvoiceAddress%22%3A+%22Cirpici+Mah.+Seyitnizam+Caddesi.+No%3A30%2F1A%22%2C%0A++++++%22InvoiceZipcode%22%3A+%2234025%22%2C%0A++++++%22DeliveryAddressId%22%3A+%22%22%2C%0A++++++%22DeliveryTitle%22%3A+%22%C4%B0%C5%9F+adresim%22%2C%0A++++++%22DeliveryName%22%3A+%22K%C3%BCbra+K.%22%2C%0A++++++%22DeliveryMobile%22%3A+%225364922333%22%2C%0A++++++%22DeliveryOtherPhone%22%3A+%22%22%2C%0A++++++%22DeliveryCountry%22%3A+%22T%C3%BCrkiye%22%2C%0A++++++%22DeliveryCity%22%3A+%22%C4%B0stanbul%22%2C%0A++++++%22DeliveryTown%22%3A+%22Zeytinburnu%22%2C%0A++++++%22DeliveryDistrict%22%3A+%22Zeytinburnu%22%2C%0A++++++%22DeliveryAddress%22%3A+%22Cirpici+Mah.+Seyitnizam+Caddesi.+No%3A30%2F1A%22%2C%0A++++++%22DeliveryZipcode%22%3A+%2234025%22%2C%0A++++++%22OrderTotalPrice%22%3A+%22250%22%2C%0A++++++%22CargoCode%22%3A+%223%22%2C%0A++++++%22OrderDate%22%3A+%221429855185%22%2C%0A++++++%22Products%22%3A+%5B%0A++++++++++%7B%0A++++++++++++++%22ProductCode%22%3A+%22T625%22%2C%0A++++++++++++++%22VariantType1%22%3A+%22%22%2C%0A++++++++++++++%22VariantType2%22%3A+%22%22%2C%0A++++++++++++++%22SubProductCode%22%3A+%22%22%2C%0A++++++++++++++%22Quantity%22%3A+%221%22%0A++++++++++%7D%0A++++++%5D%0A++%7D%0A%5D"
    const form = `token=${authorization.token}&data=`+createCustomer
    return fetch(path, {
      method,
      body: form,
      headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      redirect: 'follow'
    })
    .then( res => {

      return res.json();
    });
  },
  list() {
    const body = {
      ...authorization,
      OrderDateTimeStart: '',
      OrderDateTimeEnd: '',
      UpdateDateTimeStart: '',
      UpdateDateTimeEnd: '',
      OrderCode: '',
      OrderStatusId: '',
      IsTransferred: '',
      Archive: '',
      FetchProductData: 'false',
      FetchCustomerData: 'true',
      FetchInvoiceAddress: 'true',
      FetchDeliveryAddress: 'false',
      FetchCampaignData: 'false',
      FetchOrderContract: 'false',
      FetchDeleteds: 'false',
      start: '',
      limit: '',
      columns: '',
      f: '',
      orderby: ''
    };
    return this.request({
      path: `${webService}/order/get`,
      method: 'post',
      body,
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  get() {
    const body = {
      ...authorization,
      Archive: '',
      start: '',
      limit: '',
      columns: '',
      f: '',
      orderby: ''
    };
    const orderId = 2;
    return this.request({
      path: `${webService}/order2/getOrderDetailsByOrderId/${orderId}`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  // NOTE : Create method is not ready for production
  create() {
    const body = {
      ...authorization,
      data: JSON.stringify(createCustomer)
    };
    return this.request({
      path: `${webService}/order2/createOrders`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });

  },
  setTransferredStatus() {
    const body = {
      ...authorization,
      data: JSON.stringify()
    };
    return this.request({
      path: `${webService}/order2/setTransferredStatus`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  updateOrderStatusAsCargoReady() {
    const body = {
      ...authorization,
      data: JSON.stringify([{ OrderCode: 'TS06033' }]),
      Archive: '' // Send 1 for archived members
    };
    return this.request({
      path: `${webService}/order2/updateOrderStatusAsCargoReady`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  updateOrderStatusAsDelivered() {
    const body = {
      ...authorization,
      data: JSON.stringify([{ OrderCode: 'TS06033' }]),
      Archive: '' // Send 1 for archived members
    };
    return this.request({
      path: `${webService}/order2/updateOrderStatusAsDelivered`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  updateOrderStatusAsSentToCargo() {
    const body = {
      ...authorization,
      data: JSON.stringify([
        { OrderCode: 'TS06033', CargoCode: 'T1', CargoTrackingCode: 'ER34342' }
      ])
    };
    return this.request({
      path: `${webService}/order2/updateOrderStatusAsSentToCargo`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  updateOrderStatusAsCancelled() {
    const body = {
      ...authorization,
      data: JSON.stringify([{ OrderCode: 'TS06033' }]),
      Archive: '' // Send 1 for archived members
    };
    return this.request({
      path: `${webService}/order2/updateOrderStatusAsCancelled`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  updateInvoiceDetails() {
    const body = {
      ...authorization,
      data: JSON.stringify([
        {
          OrderCode: 'TS06033',
          InvoiceDate: '2015-10-12T07:09:00Z',
          InvoiceNumber: '1111',
          WaybillNumber: '2222',
          IsInvoiced: '1'
        }
      ])
    };
    return this.request({
      path: `${webService}/order2/updateInvoiceDetails`,
      method: 'POST',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  delete() {
    const body = {
      ...authorization,
      data: JSON.stringify([{ OrderId: '2' }])
    };
    return this.request({
      path: `${webService}/order2/deleteOrders`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getCurrencyList() {
    const body = {
      ...authorization
    };
    return this.request({
      path: `${webService}/product/getCurrencyList`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getPaymentTypeList() {
    const body = {
      ...authorization
    };
    return this.request({
      path: `${webService}/order2/getPaymentTypeList`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getOrderStatusList() {
    const body = {
      ...authorization
    };
    return this.request({
      path: `${webService}/order2/getOrderStatusList`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getCargoCompanyList() {
    const body = {
      ...authorization
    };
    return this.request({
      path: `${webService}/order2/getCargoCompanyList`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getProducts() {
    const body = {
      ...authorization,
      limit: '',
      start: '',
      columns: '',
      f: '',
      orderby: '',
      FetchDiscountedPrice: 'false',
      FetchAllCategories: 'false',
      FetchPriceWithComma: 'false',
      FetchMultipleDiscount: 'false'
    };
    return this.request({
      path: `${webService}/product/getProducts`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getCustomers() {
    const body = {
      ...authorization,
      FetchAvatar: 'false',
      start: '',
      limit: '',
      columns: '',
      f: '',
      orderby: '',
      Archive: '',
      SecretKey: ''
    };
    return this.request({
      path: `${webService}/customer/getCustomers`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  addCustomers() {
    const body = {
      ...authorization,
      data: customer,
      IsPasswordEncrypted: 'false'
    };
    return this.request({
      path: `${webService}/customer/addCustomers`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  addAddress() {
    const body = {
      ...authorization,
      data: address
    };
    return this.request({
      path: `${webService}/customer/address`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },
  getAddress() {
    const body = {
      ...authorization,
      customer_id: 32
    };
    const addressId = 3;
    return this.request({
      path: `${webService}/customer/address/${addressId}`,
      method: 'post',
      body
    }).catch(err => {
      throw new Error(err.message, err.code);
    });
  },


  buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  },
  jsonToFormData(data) {
    const formData = new FormData();
    this.buildFormData(formData, data);
    console.log(formData)
    return formData;
  }
};
